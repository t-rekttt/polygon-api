const requester = require("../init-requester");
Object.defineProperty(exports, "__esModule", { value: true });
async function deleteTestSet(problemId, { testSet, session = null }) {
    let polygonRequester = await requester;

    const formData = {
        problemId,
        session,
        currentTestset: testSet
    };

    const { headers } = await polygonRequester.requestUnofficial('tests', { method: 'POST', formData, qs: { action: 'deleteTestset' } });

    return (headers.location && headers.location.includes('session'));
}
exports.deleteTestSet = deleteTestSet;
