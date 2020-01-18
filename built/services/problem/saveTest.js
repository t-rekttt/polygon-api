"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const requester = require("../init-requester");
async function saveTest(problemId, { checkExisting, testset, testIndex, testInput, testGroup, testPoints, testDescription, testUseInStatements, testInputForStatements, testOutputForStatements, verifyInputOutputForStatements } = {}) {
    let polygonRequester = await requester;

    while (true) {
        try {
            const formData = JSON.parse(JSON.stringify({
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
            const { body } = await polygonRequester.requestOfficial('problem.saveTest', { formData });
            return body && body.status === 'OK';
        } catch (err) {
            console.log(err);
        }
    }
}
exports.saveTest = saveTest;
