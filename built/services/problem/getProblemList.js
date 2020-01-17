"use strict";
const requester = require("../init-requester");
async function getProblemList() {
    let polygonRequester = await requester;
    const { body } = await polygonRequester.requestOfficial('problems.list');
    return body.status === 'OK'
        ? body.result
        : [];
}
module.exports = getProblemList;
