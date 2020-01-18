"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const requester = require("../init-requester");
async function setValidator(problemId, { validator }) {
    let polygonRequester = await requester;

    const formData = {
        problemId,
        validator
    };
    const { body } = await polygonRequester.requestOfficial('problem.setValidator', { formData });
    return body && body.status === 'OK';
}
exports.setValidator = setValidator;
