const ipLocation = require('iplocation');

async function getRegion(ip, timeoutMs = 2000) {
  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject(new Error('timeout')), timeoutMs)
  );

  try {
    const data = await Promise.race([ipLocation(ip), timeout]);

    const region =
      typeof data.region === 'string'
        ? data.region
        : data.region && typeof data.region.name === 'string'
        ? data.region.name
        : null;

    return region || data.city || data.country || 'Unknown Location';
  } catch (err) {
    if (err.message === 'timeout') {
      console.warn(`IP lookup timed out for ${ip}`);
    } else {
      console.error(`IP location error for ${ip}:`, err.message);
    }
    return 'Somewhere on Earth...';
  }
}

module.exports = getRegion;
