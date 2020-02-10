const requester = require("../init-requester");
Object.defineProperty(exports, "__esModule", { value: true });
async function getSessionId(problemId) {
    let polygonRequester = await requester;

    return polygonRequester.getSessionId(problemId);
}
exports.getSessionId = getSessionId;