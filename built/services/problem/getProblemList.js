"use strict";
const requester = require("../init-requester");
async function getProblemList() {
    let polygonRequester = await requester;
    const { body } = await polygonRequester.requestOfficial('problems.list');
    return body.status === 'OK'
        ? body.result.map((p) => {
            return {
                id: p.id,
                name: p.name,
                owner: p.owner,
                modified: p.modified
            };
        })
        : [];
}
module.exports = getProblemList;
