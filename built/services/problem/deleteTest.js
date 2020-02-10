const requester = require("../init-requester");
Object.defineProperty(exports, "__esModule", { value: true });
async function deleteTest(problemId, { testSet, index, session = null }) {
    let polygonRequester = await requester;

    const formData = {
        problemId,
        session,
        testset: testSet,
        index
    };

    const { headers } = await polygonRequester.requestUnofficial('tests', { method: 'POST', formData, qs: { action: 'delete' } });

    return (headers.location && headers.location.includes('session'));
}
exports.deleteTest = deleteTest;
