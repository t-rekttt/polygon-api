const requester = require("../init-requester");
Object.defineProperty(exports, "__esModule", { value: true });
async function commitChanges(problemId, { message = `Commited by VOJBOT at ${new Date()}`, session }) {
    let polygonRequester = await requester;

    while (true) {
        try {
            const formData = {
                submitted: 'true',
                message,
                allContests: 'true',
                session
            };

            const { headers } = await polygonRequester.requestUnofficial('edit-commit', { method: 'POST', formData, qs: { action: 'add' } });

            return (headers.location && headers.location.includes('generalInfo'));
        } catch (err) {
            console.log(err);
        }
    }
}
exports.commitChanges = commitChanges;
