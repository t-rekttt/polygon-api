const requester = require("../init-requester");
Object.defineProperty(exports, "__esModule", { value: true });
async function giveAccess(problemId, { userName, permission = 'Read', session }) {
    let polygonRequester = await requester;

    const formData = {
        problemId,
        submitted: 'true',
        users_added: userName,
        type: permission,
        session
    };

    const response = await polygonRequester.requestUnofficial('access', { method: 'POST', formData, qs: { action: 'add' } });

    return (response.headers.location && response.headers.location.includes('access'));
}
exports.giveAccess = giveAccess;
