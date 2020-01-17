"use strict";
const request = require('request-promise');
const logger = require('./logger');
const crypto = require('crypto');

class PolygonRequester {
    constructor(username, password, API_KEY, API_SECRET) {
        this.API_KEY = API_KEY;
        this.API_SECRET = API_SECRET;
        this.username = username;
        this.password = password;

        this.request = request.defaults({
            baseUrl: 'https://polygon.codeforces.com/',
            json: true,
            simple: false,
            resolveWithFullResponse: true,
            followRedirect: false,
            jar: true,
            // proxy: 'http://localhost:8888',
            // strictSSL: false
        });
    }

    async init() {
        return await this.login(this.username, this.password);
    }

    async login(login, password) {
        logger.logger('Login to Codeforces Polygon...');
        let r = await this.request('login');
        const { ccid } = this.extractCCID(r.body);
        if (!ccid)
            return false;
        this.ccid = ccid;
        const formData = {
            ccid,
            login,
            password,
            submit: 'Login',
            submitted: 'true',
            fp: 'a92fdda7ac4f88ec7f7a8b28231cdd04'
        };
        const { statusCode } = await this.request('login', { method: 'POST', formData });
        if (statusCode !== 302) {
            logger.logger('Invalid credentials!', { error: true });
            return process.exit(1);
        }
        return this;
    }

    async requestUnofficial(methodName = '', options) {
        return this.request(methodName, options);
    }

    async requestOfficial(methodName, options = { formData: {}, method: 'POST' }) {
        let formData = {
            apiKey: this.API_KEY,
            time: Math.round(new Date().getTime() / 1000).toString(),
            ...options.formData
        };
        console.log(this.makeQueryString(formData));
        console.log(formData);
        formData['apiSig'] = this.makeApiSig(methodName, this.makeQueryString(formData), this.API_SECRET);
        return this.request(`api/${methodName}`, { ...options, formData });
    }

    makeQueryString(query = {}) {
        return Object.keys(query).sort().reduce((curr, key) => curr + `&${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`, '').slice(1);
    }

    makeApiSig(methodName, query, secret) {
        const rand = Math.random()
            .toString(36)
            .substring(2, 8);
        return (rand +
            crypto
                .createHash('sha512')
                .update(`${rand}/${methodName}?${query}#${secret}`, 'utf8')
                .digest('hex'));
    }

    extractCCID(text) {
        const match = text.match(/name="ccid" content="(.*?)"/);
        return { ccid: match ? match[1] : null };
    }
}

module.exports = PolygonRequester;