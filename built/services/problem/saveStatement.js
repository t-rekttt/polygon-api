"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const requester = require("../init-requester");
async function saveStatement(problemId, { lang, encoding, name, legend, input, output, notes, tutorial } = { lang: 'vietnamese' }) {
    let polygonRequester = await requester;

    const formData = JSON.parse(JSON.stringify({
        problemId,
        lang,
        encoding,
        name,
        legend,
        input,
        output,
        notes,
        tutorial
    }));
    const { body } = await polygonRequester.requestOfficial('problem.saveStatement', { formData });
    return body && body.status === 'OK';
}
exports.saveStatement = saveStatement;
