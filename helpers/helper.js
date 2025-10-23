const ipLocation = require('iplocation');

async function getRegion(ip, timeoutMs = 2000) {
  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject(new Error('timeout')), timeoutMs)
  );

  try {
    const data = await Promise.race([ipLocation(ip), timeout]);
    return data.region || 'Unknown Location';
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
