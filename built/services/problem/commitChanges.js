const requester = require("../init-requester");
Object.defineProperty(exports, "__esModule", { value: true });
async function commitChanges(problemId, message = `Commited by VOJBOT at ${new Date()}`) {
    let polygonRequester = await requester;

    while (true) {
        try {
            const continueEditRequest = await polygonRequester.requestUnofficial('edit-start', { method: 'POST', formData: { problemId } });

            let session = new URL(continueEditRequest.headers.location).searchParams.get('session');

            const formData = {
                submitted: 'true',
                message,
                allContests: 'true',
                session
            };

            const response = await polygonRequester.requestUnofficial('edit-commit', { method: 'POST', formData, qs: { action: 'add' } });

            if (!response.headers.location || response.headers.location.indexOf('generalInfo') === -1) return false;

            return true;
        } catch (err) {
            console.log(err);
        }
    }
}
exports.commitChanges = commitChanges;
