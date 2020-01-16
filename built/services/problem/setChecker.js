"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const requestAPI_1 = require("../init-requester/requestAPI");
async function setChecker(problemId, { checker }) {
    while (true) {
        try {
            const params = {
                problemId,
                checker
            };
            const { body } = await requestAPI_1.requestAPI('problem.setChecker', params);
            return body && body.status === 'OK';
        } catch (err) {
            console.log(err);
        }
    }
}
exports.setChecker = setChecker;
