const requester = require("../init-requester");
const cheerio = require('cheerio');
const { deleteTests } = require('./deleteTests');

Object.defineProperty(exports, "__esModule", { value: true });
async function deleteAllTests(problemId, { session = null, testSet } = {}) {
    let polygonRequester = await requester;

    const formData = {
        session,
        problemId
    };

    let { body } = await polygonRequester.requestUnofficial('tests', { method: 'POST', formData });

    let $ = cheerio.load(body);

    let testElems = $('#testsTable > tbody > tr');

    let indexs = testElems.map((i, elem) => {
       elem = $(elem);

       return elem.find('.draggableCell').text().trim();
    }).get();

    return await deleteTests(problemId, { indexs, testSet, session });
}
exports.deleteAllTests = deleteAllTests;
