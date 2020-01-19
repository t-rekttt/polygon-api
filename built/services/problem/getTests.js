"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const requester = require("../init-requester");
async function getTests(problemId, { testset }) {
  let polygonRequester = await requester;

  const formData = JSON.parse(JSON.stringify({
    problemId,
    testset
  }));
  const { body } = await polygonRequester.requestOfficial('problem.tests', { formData });
  return body.status === 'OK'
    ? body.result
    : [];
}
exports.getTests = getTests;
