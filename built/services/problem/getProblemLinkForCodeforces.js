"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const requester = require("../init-requester");
const _ = require('lodash');

async function getProblemLinkForCodeforces(problemId, { session } = {}) {
    let polygonRequester = await requester;

    const { body } = await polygonRequester.requestUnofficial('generalInfo', { method: 'GET', qs: { session, problemId } });

    let matches = /https:\/\/polygon.codeforces.com\/.+/.exec(body);

    return matches && matches[0];
}
exports.getProblemLinkForCodeforces = getProblemLinkForCodeforces;
