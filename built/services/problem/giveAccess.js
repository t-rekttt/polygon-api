"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const requestPolygon_1 = require("../init-requester/requestPolygon");
async function giveAccess(problemId, userName) {
    while (true) {
        try {
            const { requestPolygon } = await requestPolygon_1.makeRequestPolygon;

            const continueEditRequest = await requestPolygon('edit-start', { params: { problemId } });

            let session = new URL(continueEditRequest.headers.location).searchParams.get('session');

            const formData = {
                submitted: 'true',
                users_added: userName,
                type: 'Write',
                session
            };

            const response = await requestPolygon('access', { formData, params: { action: 'add' } });

            return {
                success: response.headers.location.indexOf('access') !== -1
            };
        } catch (err) {
            console.log(err);
        }
    }
}
exports.giveAccess = giveAccess;
