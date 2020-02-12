const requester = require("../init-requester");
Object.defineProperty(exports, "__esModule", { value: true });
async function commitChanges(problemId, { message = `Commited by VOJBOT at ${new Date()}`, session = null, sendEmail = false } = {}) {
    let polygonRequester = await requester;

    const formData = {
        submitted: 'true',
        message,
        allContests: 'true',
        session,
        problemId,
        minorChanges: sendEmail ? 'off' : 'on'
    };

    const { headers } = await polygonRequester.requestUnofficial('edit-commit', { method: 'POST', formData, qs: { action: 'add' } });

    return (headers.location && headers.location.includes('generalInfo'));
}
exports.commitChanges = commitChanges;
