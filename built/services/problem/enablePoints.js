"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const requester = require("../init-requester");
async function enablePoints(problemId, enable) {
    let polygonRequester = await requester;

    const formData = {
        problemId,
        enable
    };

    const { body } = await polygonRequester.requestOfficial('problem.enablePoints', { formData });
    return body && body.status === 'OK';
}
exports.enablePoints = enablePoints;
