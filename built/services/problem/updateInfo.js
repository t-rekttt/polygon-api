"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const requester = require("../init-requester");
async function updateInfo(problemId, { inputFile, outputFile, interactive, timeLimit, memoryLimit } = {}) {
    let polygonRequester = await requester;

    const formData = JSON.parse(JSON.stringify({
        inputFile,
        outputFile,
        interactive,
        timeLimit,
        memoryLimit,
        problemId
    }));
    const { body } = await polygonRequester.requestOfficial('problem.updateInfo', { formData });
    return body && body.status === 'OK';
}
exports.updateInfo = updateInfo;
