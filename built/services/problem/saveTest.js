"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const requestAPI_1 = require("../init-requester/requestAPI");
async function saveTest(problemId, { checkExisting, testset, testIndex, testInput, testGroup, testPoints, testDescription, testUseInStatements, testInputForStatements, testOutputForStatements, verifyInputOutputForStatements } = {}) {
    while (true) {
        try {
            const params = JSON.parse(JSON.stringify({
                problemId,
                checkExisting,
                testset,
                testIndex,
                testInput,
                testGroup,
                testPoints,
                testDescription,
                testUseInStatements,
                testInputForStatements,
                testOutputForStatements,
                verifyInputOutputForStatements
            }));
            const { body } = await requestAPI_1.requestAPI('problem.saveTest', params);
            return body && body.status === 'OK';
        } catch (err) {
            console.log(err);
        }
    }
}
exports.saveTest = saveTest;
