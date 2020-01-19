"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const requester = require("../init-requester");
async function saveStatementResource(problemId, { checkExisting, name, file }) {
    let polygonRequester = await requester;

    let formData = JSON.parse(JSON.stringify({
        problemId,
        checkExisting,
        name,
        file
    }));

    const { body } = await polygonRequester.requestOfficial('problem.saveStatementResource', { formData });
    return body && body.status === 'OK';
}
exports.saveStatementResource = saveStatementResource;
