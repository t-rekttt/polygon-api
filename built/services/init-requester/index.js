let PolygonRequester = require("../../utils/requester");
const { USERNAME, PASSWORD, API_KEY, API_SECRET } = require("../../configs/account");

let requester = new PolygonRequester(USERNAME, PASSWORD, API_KEY, API_SECRET);

module.exports = requester.init();