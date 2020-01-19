const requester = require("../init-requester");
Object.defineProperty(exports, "__esModule", { value: true });
async function giveAccess(problemId, userName, permission = 'Read') {
    let polygonRequester = await requester;

    while (true) {
        try {
            const continueEditRequest = await polygonRequester.requestUnofficial('edit-start', { method: 'POST', formData: { problemId } });

            let session = new URL(continueEditRequest.headers.location).searchParams.get('session');

            const formData = {
                submitted: 'true',
                users_added: userName,
                type: permission,
                session
            };

            const response = await polygonRequester.requestUnofficial('access', { method: 'POST', formData, qs: { action: 'add' } });

            return {
                success: response.headers.location && response.headers.location.indexOf('access') !== -1
            };
        } catch (err) {
            console.log(err);
        }
    }
}
exports.giveAccess = giveAccess;
