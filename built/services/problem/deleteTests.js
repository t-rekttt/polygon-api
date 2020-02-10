const requester = require("../init-requester");
Object.defineProperty(exports, "__esModule", { value: true });
async function deleteTests(problemId, { testSet, indexs, session = null }) {
    let polygonRequester = await requester;

    const formData = {
        problemId,
        session
    };

    const { headers } = await polygonRequester.requestUnofficial('tests', {
        method: 'POST',
        formData,
        qs: { action: 'deleteTests', currentTestset: testSet, testIndex: indexs },
        useQuerystring: true
    });

    return (headers.location && headers.location.includes('session'));
}
exports.deleteTests = deleteTests;
