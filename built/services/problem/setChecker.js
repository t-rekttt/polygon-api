"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const requester = require("../init-requester");
async function setChecker(problemId, { checker }) {
    let polygonRequester = await requester;

    while (true) {
        try {
            const formData = {
                problemId,
                checker
            };
            const { body } = await polygonRequester.requestOfficial('problem.setChecker', formData);
            return body && body.status === 'OK';
        } catch (err) {
            console.log(err);
        }
    }
}
exports.setChecker = setChecker;
