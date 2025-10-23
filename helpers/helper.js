const ipLocation = require("iplocation");

function location(ip) {
    let locationFromIp = ipLocation(ip)
    return locationFromIp.region.name
};

module.exports = location;