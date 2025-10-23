// Helper is also a package!
const ipLocation = require("iplocation");

async function location(ip) {
    let locationFromIp = await ipLocation(ip)
    return locationFromIp.region
};

module.exports = location;