const express = require('express');
const router = express.Router();
const { limitAdd, isLimit } = require('../database/db');
const { cekKey, checkLimit, resetLimit } = require('../database/db'); 
const { cekKey } = require('../database/db'); 
const { youtubePlay, youtubeMp4, youtubeMp3, igdownloader, twitterdownloader } = require('../controllers/yt');
const { cakLontong, bijak, quotes, fakta, ptl, motivasi, indonesia, malaysia, thailand, vietnam, korea, japan, naruto, china, tiktok, asupan, geayubi, ukhty, rikagusriani, anony, hijaber, joker, harley, cecan, santuy, bocil, tebakjenaka, tebaklirik, ppcouple, tebakchara, tebakbendera, tebakkabupaten, tebakkimia, tebakkata, tebakkalimat, susunkata, tekateki, dadu, asahotak, truth, dare, tebaktebakan, family100, storyanime, quotenime, loli, milf, husbu, aesthetic,  cosplay, shota, waifu, wallml, nekonime, ahegao, panties, gangbang, yuri, tentacles, zettairyouiki, thighs, sfwneko, pussy, nsfwneko, orgy, masturbation, manga, jahy, hentai, hentaigift, glasses, foot, femdom, cum, ero, cuckold, blowjob, ass, bdsm } = require('../controllers/randomtext');
const { pinterest } = require('../scraper/index');
const { pRomantic } = require('../controllers/photooxy');
const { artinama, ramalanJodoh } = require('../scraper/primbon');
const { merdekaNews } = require('../scraper/merdekanews');
const { stickerDl } = require('../scraper/stickerpack');
const { stickerSearch } = require('../scraper/stickerpack');
const { happymodSearch } = require('../scraper/happymod');
const { mediafireDl, pinterestdl, scdl, sfiledl } = require('../scraper/index');
const { dl } = require('../scraper/aiovideodl');
const zipi = require('../scraper/zippy');
const { igStory } = require('../scraper/igdl');
const { photoOxy } = require('../controllers/oxy');
const { tgContr } = require('../controllers/tebakgambar');
const { mDo } = require('../controllers/media');
const { tIk } = require('../controllers/tik');

router.get('/checkkey', async (req, res) => {
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
    res.send({status: 200, apikey: apikey, response: 'Active'});
});

router.get('/merdeka', async(req, res) {
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
 const result = await merdekaNews();
 limitAdd(apikey);
 res.json({ result })
})

router.get('/meme', async (req, res) {
     const apikey = req.query.apikey;
        if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter link & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
     const fetch = require('node-fetch');
     const subReddits = ["dankmeme", "meme", "memes"];
     const random = Math.floor(Math.random() * subReddits.length)
     const body = await fetch('https://www.reddit.com/r/' + subReddits[random] + '/random/.json')
     body = await body.json()
     const a = body[0]
     const title = a.data.children[0].data.title
     const url = 'https://reddit.com'+a.data.children[0].data.permalink
     const link = a.data.children[0].data.url_overridden_by_dest
     const ups = a.data.children[0].data.ups
     const comments = a.data.children[0].data.num_comments
     const sub = a.data.children[0].data.subreddit_name_prefixed
     const preview = a.data.children[0].data.preview
     limitAdd(apikey);
     return res.json({
         status: true,
         title: title, 
         url: url, 
         image: link, 
         ups: ups, 
         comments: comments 
    });
 })

router.get('/photooxy/romantic', async(req, res) {
  const text = req.query.text;
	const apikey = req.query.apikey;
   if (text === undefined || apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter link & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    const hasil = await pRomantic(text);
    limitAdd(apikey);
		res.json(hasil);
});
    
router.get('/artinama', async(req, res) {
	const nama = req.query.nama;
	const apikey = req.query.apikey;
   if (nama === undefined || apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter link & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
	const hasil = await artinama(nama);
	limitAdd(apikey);
	try {
		res.json(hasil)
	} catch(err) {
		console.log(err)
		res.json({ message: 'Ups, error' })
	}
})

router.get('/ramalanjodoh', async(req, res) {
	const nama = req.query.nama;
  const pasangan = req.query.pasangan;
  const apikey = req.query.apikey;
	   if (nama === undefined || pasangan === undefined || apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter link & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
	const hasil = await ramalanJodoh(nama, pasangan);
	limitAdd(apikey);
	try {
		res.json(hasil)
	} catch(err) {
		console.log(err)
		res.json({ message: 'Ups, error' })
	}
})

router.get('/pinterest', async (req, res) {
    const query = req.query.query;
    const apikey = req.query.apikey;
   if (query === undefined || apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter query & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
   let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
    const result = await pinterest(query);
    limitAdd(apikey);
    res.send({status: 200, result: result});
});

router.get('/happymod', async(req, res) {
	const query = req.query.query;
const apikey = req.query.apikey;
	if (query === undefined || apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter query & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
	const result = await happymodSearch(query);
limitAdd(apikey);
	res.json({ result })
})

router.get('/sticker', async(req, res) {
	const query = req.query.query;
const apikey = req.query.apikey;
	if (query === undefined || apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter query & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
	const result = await stickerSearch(query);
	limitAdd(apikey);
	res.json({ result })
})

router.get('/pindl', async(req, res) {
	const link = req.query.link;
  const apikey = req.query.apikey;
   if (link === undefined || apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter link & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'your limit is 0, reset every morning'});
	const hasil = await pinterestdl(link);
limitAdd(apikey);
	try {
		res.json(hasil)
	} catch(err) {
		console.log(err)
		res.json({ message: 'Ups, error' })
	}
})

router.get('/ytplay', youtubePlay);

router.get('/ytmp4', youtubeMp4);

router.get('/ytmp3', youtubeMp3);

router.get('/caklontong', cakLontong);

router.get('/quotes', quotes);

router.get('/fakta', fakta);

router.get('/bijak', bijak);

router.get('/ptl', ptl);

router.get('/motivasi', motivasi);

router.get('/cecan/indonesia', indonesia);

router.get('/cecan/malaysia', malaysia);

router.get('/cecan/korea', korea);

router.get('/cecan/thailand', thailand);

router.get('/cecan/jepang', japan);

router.get('/cecan/vietnam', vietnam);

router.get('/asupan/tiktok', tiktok);

router.get('/cecan/china', china);

router.get('/naruto', naruto);

router.get('/asupan/gheayubi', geayubi);

router.get('/asupan/santuy', santuy);

router.get('/asupan/bocil', bocil);

router.get('/asupan/rikagusriani', rikagusriani);

router.get('/asupan/ukhty', ukhty);

router.get('/asupan/cecan', cecan);

router.get('/asupan/harley', harley);

router.get('/asupan/hijaber', hijaber);

router.get('/asupan/anony', anony);

router.get('/asupan/joker', joker);

router.get('/igdl', igdownloader);

router.get('/twitter', twitterdownloader);

module.exports = router;