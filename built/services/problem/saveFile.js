"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const requester = require("../init-requester");
async function saveFile(problemId, { checkExisting, type, name, file, sourceType }) {
    let polygonRequester = await requester;

    const formData = JSON.parse(JSON.stringify({
        problemId,
        checkExisting,
        type,
        name,
        file,
        sourceType
    }));
    const { body } = await polygonRequester.requestUnofficial('problem.saveFile', { formData });
    return body && body.status === 'OK';
}
exports.saveFile = saveFile;
