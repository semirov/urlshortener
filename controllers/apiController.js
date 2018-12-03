let shortid = require("shortid");
let urlModel = require('../models/urlModel');
let rp = require('request-promise');

async function generateCutUrl(req, res, next) {
    let url = req.query.url;
    try {
        let urlValud = await urlIsValid(url);
        if (urlValud) {
            let urlDocument = new urlModel({fullUrl: testHttpPrefix(url)});
            console.log(urlDocument);
            genereateCutLink();
            res.send({ testURL: urlValud, url: url });
        } else {
            return next('INVALID_URL');
        }
        
    } catch (e) {
        console.log(e);
        next('ERROR_IN_GENERATE_CUT_URL');
    }
}



async function genereateCutLink() {
    let newSequenceElem = shortid.generate();
    let count = await urlModel.countDocuments({cutUrl: newSequenceElem});
    console.log(count);
    if (count === 0) {
        return newSequenceElem;
    } else {
        return await genereateCutLink();
    }
}


async function urlIsValid(url) {
    if (url === undefined) { return false; }
    let options = { method: 'GET', uri: testHttpPrefix(url), resolveWithFullResponse: true };
    try {
        let res = await rp(options);
        let statusCode = res.statusCode;
        if (statusCode < 200 || statusCode > 299) {
            return false;
        }
        return true;
    } catch (error) {
        return false;
    }

}

function testHttpPrefix(url) {
    if (url.indexOf("http://") == 0 || url.indexOf("https://") == 0) {
        return url;
    } else {
        return `http://${url}`;
    }
}


module.exports.generateCutUrl = generateCutUrl;