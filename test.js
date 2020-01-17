let getProblemList = require('./built/services/problem/getProblemList');

(async() => {
    console.log(await getProblemList());
})();