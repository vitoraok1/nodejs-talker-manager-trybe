const crypto = require('crypto');

// how to generate a random token using crypto reference: https://quickref.me/generate-a-random-string-using-node-crypto-module.html
const newToken = () => crypto.randomBytes(8).toString('hex');

module.exports = newToken;