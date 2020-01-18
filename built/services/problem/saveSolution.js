"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const requester = require("../init-requester");
async function saveSolution(problemId, { checkExisting, name, file, sourceType, tag }) {
    let polygonRequester = await requester;

    while (true) {
        try {
            const formData = JSON.parse(JSON.stringify({
                problemId,
                checkExisting,
                name,
                file,
                sourceType,
                tag
            }));
            const { body } = await polygonRequester.requestOfficial('problem.saveSolution', { formData });
            return body && body.status === 'OK';
        } catch (err) {
            console.log(err);
        }
    }
}
exports.saveSolution = saveSolution;
