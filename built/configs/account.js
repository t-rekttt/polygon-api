require('dotenv').config();

let { _USERNAME, PASSWORD, API_KEY, API_SECRET } = process.env;

module.exports = { USERNAME: _USERNAME, PASSWORD, API_KEY, API_SECRET };