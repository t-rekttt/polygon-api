"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const requester = require("../init-requester");
async function getProblemList() {
    let polygonRequester = await requester;
    const { body } = await polygonRequester.requestOfficial('problems.list');
    return body.status === 'OK'
        ? body.result
        : [];
}
exports.getProblemList = getProblemList;
