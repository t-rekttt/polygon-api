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
            headers: {
              'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.88 Safari/537.36'
            },
            baseUrl: 'https://polygon.codeforces.com/',
            json: true,
            simple: false,
            resolveWithFullResponse: true,
            followRedirect: false,
            jar: true,
            proxy: 'http://localhost:8888',
            strictSSL: false
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
            login,
            password,
            submit: 'Login',
            submitted: 'true',
            fp: 'a92fdda7ac4f88ec7f7a8b28231cdd04'
        };
        const { statusCode, headers } = await this.request('login', { method: 'POST', formData, qs: { ccid } });
        if (statusCode !== 302) {
            logger.logger('Invalid credentials!', { error: true });
            return process.exit(1);
        }
        return this;
    }

    async requestUnofficial(methodName = '', options = { formData: {}, qs: {} }, retries = 5, currentRetry = 1) {
        if (currentRetry > retries) throw new Error('Retries limit exceeded');

        try {
            if (options.method.toUpperCase().trim() === 'POST' && (!options.formData || !options.formData.session)) options.formData = { ...options.formData, session: await this.getSessionId(options.formData.problemId) };
            else if (!options.qs || !options.qs.session) options.qs = { ...options.qs, session: await this.getSessionId(options.qs.problemId) };

            options.formData = this.filterFormData({ ...options.formData });

            options.qs = { ...options.qs, ccid: this.ccid };
            return this.request(methodName, options);
        } catch (err) {
            console.log(err);
            return this.requestUnofficial(methodName, options, retries, ++currentRetry);
        }
    }

    async requestOfficial(methodName, options = { formData: {} }, retries = 5, currentRetry = 1) {
        if (currentRetry > retries) throw new Error('Retries limit exceeded');

        try {
            let formData = {
                apiKey: this.API_KEY,
                time: Math.round(new Date().getTime() / 1000).toString(),
                ...options.formData
            };

            options.formData = this.filterFormData(options.formData);

            formData.apiSig = this.makeApiSig(methodName, this.makeQueryString(formData), this.API_SECRET);
            return this.request(`api/${methodName}`, { ...options, method: 'POST', formData });
        } catch (err) {
            return this.requestOfficial(methodName, options, retries, ++currentRetry);
        }
    }

    async getSessionId(problemId, retries = 5, currentRetry = 1) {
        if (currentRetry > retries) throw new Error('Retries limit exceeded');

        try {
            const continueEditRequest = await this.request('edit-start', { method: 'POST', formData: { problemId }, qs: { ccid: this.ccid } });

            return new URL(continueEditRequest.headers.location).searchParams.get('session');
        } catch (err) {
            return this.getSessionId(problemId, retries, ++currentRetry)
        }
    }

    makeQueryString(query = {}) {
        return Object.keys(query).sort().reduce((curr, key) => curr + `&${key}=${query[key]}`, '').slice(1);
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

    filterFormData(formData) {
        return Object.keys(formData).reduce((curr, k) => {
            if (formData[k]) curr[k] = formData[k];

            return curr;
        }, {});
    }
}

module.exports = PolygonRequester;