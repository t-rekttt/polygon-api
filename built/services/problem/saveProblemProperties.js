"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const requester = require("../init-requester");
async function saveProblemProperties(problemId, { wellFormed, testPointsEnabled, inputFile, outputFile, timeLimit, memoryLimit, session } = {}) {
  let polygonRequester = await requester;

  let formData = JSON.parse(JSON.stringify({
    problemId,
    session,
    wellFormed: wellFormed ? 'on' : undefined,
    testPointsEnabled: testPointsEnabled ? 'on' : undefined,
    inputFile,
    outputFile,
    timeLimit,
    memoryLimit,
    Save: 'Save'
  }));
  const { headers } = await polygonRequester.requestUnofficial('generalInfo', { formData, method: 'POST', qs: { action: 'saveProperties' } });
  return (headers.location && headers.location.includes('generalInfo'));
}
exports.saveProblemProperties = saveProblemProperties;
