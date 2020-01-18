"use strict";
// Not complete
// Notes: Can not upload image to Polygon
Object.defineProperty(exports, "__esModule", { value: true });
const requester = require("../init-requester");
async function saveStatementResource(problemId, { checkExisting, name, file }) {
    let polygonRequester = await requester;

    let formData = JSON.parse(JSON.stringify({
        problemId,
        checkExisting,
        name
    }));
    formData = Object.assign(Object.assign({}, formData), { file });
    const { body } = await polygonRequester.requestOfficial('problem.saveStatementResource', { formData });
    console.log(body);
    return body && body.status === 'OK';
}
exports.saveStatementResource = saveStatementResource;
