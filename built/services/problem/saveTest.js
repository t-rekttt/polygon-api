"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const requester = require("../init-requester");
async function saveTest(problemId, { checkExisting, testset, testIndex, testInput, testGroup, testPoints, testDescription, testUseInStatements, testInputForStatements, testOutputForStatements, verifyInputOutputForStatements } = {}) {
    let polygonRequester = await requester;

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
    return body;
}
exports.saveTest = saveTest;
