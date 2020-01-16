"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const requestAPI_1 = require("../init-requester/requestAPI");
async function saveSolution(problemId, { checkExisting, name, file, sourceType, tag }) {
    while (true) {
        try {
            const params = JSON.parse(JSON.stringify({
                problemId,
                checkExisting,
                name,
                file,
                sourceType,
                tag
            }));
            const { body } = await requestAPI_1.requestAPI('problem.saveSolution', params);
            return body && body.status === 'OK';
        } catch (err) {
            console.log(err);
        }
    }
}
exports.saveSolution = saveSolution;
