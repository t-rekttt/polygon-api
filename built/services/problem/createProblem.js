"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const requester = require("../init-requester");
async function createProblem(problemName) {
    let polygonRequester = await requester;


    const formData = {
        name: problemName.toLowerCase(),
        submit: 'Create',
        submitted: 'true'
    };

    const response = await polygonRequester.requestUnofficial('cp', { formData });

    return {
        success: response.headers.location.indexOf('/problems') !== -1
    };
}
exports.createProblem = createProblem;
