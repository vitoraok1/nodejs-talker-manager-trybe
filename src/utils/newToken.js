const crypto = require('crypto');

const newToken = () => crypto.randomBytes(8).toString('hex');

module.exports = newToken;