const { cekKey, limitAdd, isLimit } = require('../database/db');
const { readFileTxt, readFileJson } = require('../lib/function');


async function cakLontong(req, res) {
    const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    readFileJson('./lib/data/caklontong.json').then(result => {
        limitAdd(apikey);
        res.status(200).send({
            status: 200, 
            question: result.quiz, 
            answer: result.answer, 
            detail: result.detail
        });
    }).catch(error => {
        console.log(error);
        res.status(500).send({status: 500, message: 'Internal Server Error'});
    });
}

async function tebaklirik(req, res) {
    const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    readFileJson('./lib/data/tebaklirik.json').then(result => {
        limitAdd(apikey);
        res.status(200).send({
            status: 200, 
            question: result.result.question, 
            jawaban: result.result.answer
        });
    }).catch(error => {
        console.log(error);
        res.status(500).send({status: 500, message: 'Internal Server Error'});
    });
}

async function tebakjenaka(req, res) {
    const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    readFileJson('./lib/data/tebakjenaka.json').then(result => {
        limitAdd(apikey);
        res.status(200).send({
            status: 200, 
            soal: result.result.pertanyaan, 
            jawaban: result.result.jawaban
        });
    }).catch(error => {
        console.log(error);
        res.status(500).send({status: 500, message: 'Internal Server Error'});
    });
}

async function tebakbendera(req, res) {
    const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    readFileJson('./lib/data/tebakbendera.json').then(result => {
        limitAdd(apikey);
        res.status(200).send({
            status: 200, 
            bendera: result.result.bendera, 
            Nama: result.result.nama
        });
    }).catch(error => {
        console.log(error);
        res.status(500).send({status: 500, message: 'Internal Server Error'});
    });
}

async function tebakchara(req, res) {
    const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    readFileJson('./lib/data/tebakchara.json').then(result => {
        limitAdd(apikey);
        res.status(200).send({
            status: 200, 
            name: result.result.name, 
            image: result.result.image,
            desc: result.result.desc
        });
    }).catch(error => {
        console.log(error);
        res.status(500).send({status: 500, message: 'Internal Server Error'});
    });
}

async function ppcouple(req, res) {
    const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    readFileJson('./lib/data/ppcouple.json').then(result => {
        limitAdd(apikey);
        res.status(200).send({
            status: 200, 
            male: result.male, 
            female: result.female
        });
    }).catch(error => {
        console.log(error);
        res.status(500).send({status: 500, message: 'Internal Server Error'});
    });
}

async function quotes(req, res) {
    const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    readFileJson('./lib/data/quotes.json').then(result => {
        limitAdd(apikey);
        res.status(200).send({
            status: 200, 
            quotes: result.quotes, 
            author: result.author
        });
    }).catch(error => {
        console.log(error);
        res.status(500).send({status: 500, message: 'Internal Server Error'});
    });
}

async function fakta(req, res) {
    const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    readFileTxt('./lib/data/fakta.txt').then(result => {
        limitAdd(apikey);
        res.status(200).send({status: 200, result: result});
    }).catch(error => {
        console.log(error);
        res.status(500).send({status: 500, message: 'Internal Server Error'});
    });
}

async function bijak(req, res) {
    const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey)
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    readFileTxt('./lib/data/bijak.txt').then(result => {
        limitAdd(apikey);
        res.status(200).send({status: 200, result: result});
    }).catch(error => {
        console.log(error);
        res.status(500).send({status: 500, message: 'Internal Server Error'});
    });
}

async function ptl(req, res) {
    const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    readFileTxt('./lib/data/ptl.txt').then(result => {
        limitAdd(apikey);
        res.status(200).send({status: 200, result: result});
    }).catch(error => {
        console.log(error);
        res.status(500).send({status: 500, message: 'Internal Server Error'});
    });
}

async function motivasi(req, res) {
    const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    readFileTxt('./lib/data/motivasi.txt').then(result => {
        limitAdd(apikey);
        res.status(200).send({status: 200, result: result.replace(/"/g, '')});
    }).catch(error => {
        console.log(error);
        res.status(500).send({status: 500, message: 'Internal Server Error'});
    });
}

async function tiktok(req, res) {
    const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    readFileTxt('./lib/data/tiktok.txt').then(result => {
limitAdd(apikey);
        res.status(200).send({status: 200, result: result.replace(/"/g, '')});
    }).catch(error => {
        console.log(error);
        res.status(500).send({status: 500, message: 'Internal Server Error'});
    });
}

async function china(req, res) {
    const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    readFileTxt('./lib/data/china.txt').then(result => {
limitAdd(apikey);
        res.status(200).send({status: 200, result: result.replace(/"/g, '')});
    }).catch(error => {
        console.log(error);
        res.status(500).send({status: 500, message: 'Internal Server Error'});
    });
}

async function naruto(req, res) {
    const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    readFileTxt('./lib/data/naruto.txt').then(result => {
limitAdd(apikey);
        res.status(200).send({status: 200, result: result.replace(/"/g, '')});
    }).catch(error => {
        console.log(error);
        res.status(500).send({status: 500, message: 'Internal Server Error'});
    });
}

async function indonesia(req, res) {
    const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    readFileTxt('./lib/data/indonesia.txt').then(result => {
limitAdd(apikey);
        res.status(200).send({status: 200, result: result.replace(/"/g, '')});
    }).catch(error => {
        console.log(error);
        res.status(500).send({status: 500, message: 'Internal Server Error'});
    });
}

async function malaysia(req, res) {
    const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    readFileTxt('./lib/data/malaysia.txt').then(result => {
limitAdd(apikey);
        res.status(200).send({status: 200, result: result.replace(/"/g, '')});
    }).catch(error => {
        console.log(error);
        res.status(500).send({status: 500, message: 'Internal Server Error'});
    });
}

async function korea(req, res) {
    const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    readFileTxt('./lib/data/korea.txt').then(result => {
limitAdd(apikey);
        res.status(200).send({status: 200, result: result.replace(/"/g, '')});
    }).catch(error => {
        console.log(error);
        res.status(500).send({status: 500, message: 'Internal Server Error'});
    });
}

async function japan(req, res) {
    const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    readFileTxt('./lib/data/japan.txt').then(result => {
limitAdd(apikey);
        res.status(200).send({status: 200, result: result.replace(/"/g, '')});
    }).catch(error => {
        console.log(error);
        res.status(500).send({status: 500, message: 'Internal Server Error'});
    });
}

async function thailand(req, res) {
    const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    readFileTxt('./lib/data/thailand.txt').then(result => {
limitAdd(apikey);
        res.status(200).send({status: 200, result: result.replace(/"/g, '')});
    }).catch(error => {
        console.log(error);
        res.status(500).send({status: 500, message: 'Internal Server Error'});
    });
}

async function vietnam(req, res) {
    const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    readFileTxt('./lib/data/vietnam.txt').then(result => {
limitAdd(apikey);
        res.status(200).send({status: 200, result: result.replace(/"/g, '')});
    }).catch(error => {
        console.log(error);
        res.status(500).send({status: 500, message: 'Internal Server Error'});
    });
}

async function asupan(req, res) {
    const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    readFileJson('./lib/data/asupan.js').then(result => {
limitAdd(apikey);
        res.status(200).send({
            status: 200, 
            result : result.result
        });
    }).catch(error => {
        console.log(error);
        res.status(500).send({status: 500, message: 'Internal Server Error'});
    });
}

async function geayubi(req, res) {
    const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    readFileJson('./lib/data/geayubi.json').then(result => {
limitAdd(apikey);
        res.status(200).send({
            status: 200, 
            result : result.url
        });
    }).catch(error => {
        console.log(error);
        res.status(500).send({status: 500, message: 'Internal Server Error'});
    });
}

async function ukhty(req, res) {
    const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    readFileJson('./lib/data/ukhty.json').then(result => {
limitAdd(apikey);
        res.status(200).send({
            status: 200, 
            result : result.url
        });
    }).catch(error => {
        console.log(error);
        res.status(500).send({status: 500, message: 'Internal Server Error'});
    });
}

async function anony(req, res) {
    const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    readFileJson('./lib/data/anony.json').then(result => {
limitAdd(apikey);
        res.status(200).send({
            status: 200, 
            result : result.url
        });
    }).catch(error => {
        console.log(error);
        res.status(500).send({status: 500, message: 'Internal Server Error'});
    });
}

async function hijaber(req, res) {
    const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    readFileJson('./lib/data/hijaber.json').then(result => {
limitAdd(apikey);
        res.status(200).send({
            status: 200, 
            result : result.url
        });
    }).catch(error => {
        console.log(error);
        res.status(500).send({status: 500, message: 'Internal Server Error'});
    });
}

async function santuy(req, res) {
    const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    readFileJson('./lib/data/santuy.json').then(result => {
limitAdd(apikey);
        res.status(200).send({
            status: 200, 
            result : result.url
        });
    }).catch(error => {
        console.log(error);
        res.status(500).send({status: 500, message: 'Internal Server Error'});
    });
}

async function harley(req, res) {
    const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    readFileJson('./lib/data/harley.json').then(result => {
limitAdd(apikey);
        res.status(200).send({
            status: 200, 
            result : result.url
        });
    }).catch(error => {
        console.log(error);
        res.status(500).send({status: 500, message: 'Internal Server Error'});
    });
}

async function rikagusriani(req, res) {
    const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    readFileJson('./lib/data/rikagusriani.json').then(result => {
limitAdd(apikey);
        res.status(200).send({
            status: 200, 
            result : result.url
        });
    }).catch(error => {
        console.log(error);
        res.status(500).send({status: 500, message: 'Internal Server Error'});
    });
}

async function bocil(req, res) {
    const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    readFileJson('./lib/data/bocil.json').then(result => {
limitAdd(apikey);
        res.status(200).send({
            status: 200, 
            result : result.url
        });
    }).catch(error => {
        console.log(error);
        res.status(500).send({status: 500, message: 'Internal Server Error'});
    });
}

async function joker(req, res) {
    const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    readFileJson('./lib/data/joker.json').then(result => {
limitAdd(apikey);
        res.status(200).send({
            status: 200, 
            result : result.url
        });
    }).catch(error => {
        console.log(error);
        res.status(500).send({status: 500, message: 'Internal Server Error'});
    });
}

async function cecan(req, res) {
    const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    readFileJson('./lib/data/cecan.json').then(result => {
limitAdd(apikey);
        res.status(200).send({
            status: 200, 
            result : result.url
        });
    }).catch(error => {
        console.log(error);
        res.status(500).send({status: 500, message: 'Internal Server Error'});
    });
}

async function tebakkabupaten(req, res) {
    const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    readFileJson('./lib/data/tebakkabupaten.json').then(result => {
        limitAdd(apikey);
        res.status(200).send({
            status: 200, 
            Kab: result.title, 
            Logo: result.url
        });
    }).catch(error => {
        console.log(error);
        res.status(500).send({status: 500, message: 'Internal Server Error'});
    });
}

async function tebakkata(req, res) {
    const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    readFileJson('./lib/data/tebakkata.json').then(result => {
        limitAdd(apikey);
        res.status(200).send({
            status: 200, 
            soal: result.soal, 
            jawaban: result.jawaban
        });
    }).catch(error => {
        console.log(error);
        res.status(500).send({status: 500, message: 'Internal Server Error'});
    });
}

async function tebakkimia(req, res) {
    const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    readFileJson('./lib/data/tebakkimia.json').then(result => {
        limitAdd(apikey);
        res.status(200).send({
            status: 200, 
            unsur: result.unsur, 
            lambang: result.lambang
        });
    }).catch(error => {
        console.log(error);
        res.status(500).send({status: 500, message: 'Internal Server Error'});
    });
}

async function tebakkalimat(req, res) {
    const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    readFileJson('./lib/data/tebakkalimat.json').then(result => {
        limitAdd(apikey);
        res.status(200).send({
            status: 200, 
            soal: result.soal, 
            jawaban: result.jawaban
        });
    }).catch(error => {
        console.log(error);
        res.status(500).send({status: 500, message: 'Internal Server Error'});
    });
}

async function susunkata(req, res) {
    const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    readFileJson('./lib/data/susunkata.json').then(result => {
        limitAdd(apikey);
        res.status(200).send({
            status: 200, 
            soal: result.soal, 
            tipe: result.tipe
            jawaban: result.jawaban
        });
    }).catch(error => {
        console.log(error);
        res.status(500).send({status: 500, message: 'Internal Server Error'});
    });
}

async function tekateki(req, res) {
    const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    readFileJson('./lib/data/tekateki.json').then(result => {
        limitAdd(apikey);
        res.status(200).send({
            status: 200, 
            soal: result.soal, 
            jawaban: result.jawaban
        });
    }).catch(error => {
        console.log(error);
        res.status(500).send({status: 500, message: 'Internal Server Error'});
    });
}

module.exports = {cakLontong, quotes, bijak, fakta, ptl, motivasi, naruto, indonesia, vietnam, thailand, malaysia, korea, japan, china, tiktok, asupan, geayubi, santuy, bocil, rikagusriani, harley, cecan, ukhty, anony, hijaber, joker, tebakchara, tebakjenaka, tebaklirik, tebakbendera, ppcouple, tebakkabupaten, tebakkimia, tebakkata };