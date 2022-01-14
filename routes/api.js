const express = require('express');
const router = express.Router();
__path = process.cwd();
const fs = require('fs');
const { getBuffer } = require('../lib/function')
const { readFileTxt, readFileJson } = require('../lib/function');
const { mp4, Mp3 } = require('../lib/youtube');
const { cekKey, checkLimit, resetLimit } = require('../database/db'); 
const { youtubePlay, youtubeMp4, youtubeMp3, igdownloader, twitterdownloader } = require('../controllers/yt');
const { cakLontong, bijak, quotes, fakta, ptl, motivasi, indonesia, malaysia, thailand, vietnam, korea, japan, naruto, china, tiktok, asupan, geayubi, ukhty, rikagusriani, anony, hijaber, joker, harley, cecan, santuy, bocil, tebakjenaka, tebaklirik, ppcouple, tebakchara, tebakbendera, tebakkabupaten, tebakkimia, tebakkata, tebakkalimat, susunkata, tekateki, dadu, asahotak, truth, dare, tebaktebakan, family100 } = require('../controllers/randomtext');
const { pinterest } = require('../scraper/index');
const { mediafireDl, pinterestdl, scdl, sfiledl } = require('../scraper/index');
const { stickerDl } = require('../scraper/stickerpack');
const { dl } = require('../scraper/aiovideodl');
const { spotifydl } = require('../scraper/spotify');
const { pixivDownload } = require('../scraper/pixiv');
const { igStory, igStalk } = require('../scraper/igdl');
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
    const limit = await checkLimit(apikey);
    res.send({status: 200, apikey: apikey, limit: limit});
});

router.get('/pinterest', async (req, res) => {
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
    const result = await pinterest(query);
    res.send({status: 200, result: result});
});

router.get('/igstory', async (req, res) => {
    const username = req.query.username;
    const apikey = req.query.apikey;
   if (query === undefined || apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter username & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    result = await igStory(username);
    res.send({status: 200, result: result});
});

router.get('/igstalk', async (req, res) => {
    const username = req.query.username;
    const apikey = req.query.apikey;
   if (query === undefined || apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter username & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    const result = await igStalk(username);
    res.send({status: 200, result: result});
});

router.get('/pindl', async(req, res) => {
	var link = req.query.link;
	   apikey = req.query.apikey;
	   if (link === undefined || apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter link & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
	var hasil = await pinterestdl(link)
	try {
		res.json(hasil)
	} catch(err) {
		console.log(err)
		res.json({ message: 'Ups, error' })
	}
})
router.get('/scdl', async(req, res) => {
	var link = req.query.link;
apikey = req.query.apikey;
	   if (link === undefined || apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter link & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
	var hasil = await scdl(link)
	try {
		res.json(hasil)
	} catch(err) {
		console.log(err)
		res.json({ message: 'Ups, error' })
	}
})
router.get('/spotifydl', async(req, res) => {
	var link = req.query.link;
apikey = req.query.apikey;
	   if (link === undefined || apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter link & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
	var hasil = await spotifydl.downloadTrack(link)
	try {
		await fs.writeFileSync(__path +'/tmp/audio.mp3', hasil)
   		await res.sendFile(__path +'/tmp/audio.mp3')
	} catch(err) {
		console.log(err)
		res.json({ message: 'Ups, error' })
	}
})
router.get('/spotify', async(req, res) => {
	var link = req.query.link;
apikey = req.query.apikey;
	   if (link === undefined || apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter link & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
	var hasil = await spotifydl.getTrack(link)
	try {
		res.json({ info: hasil, dl_lnk: `https://tyz-api.herokuapp.com/downloader/spotifydl?link=${link}` })
	} catch(err) {
		console.log(err)
		res.json({ message: 'Ups, error' })
	}
})
router.get('/stickerpack', async(req, res) => {
	var link = req.query.link;
apikey = req.query.apikey;
	   if (link === undefined || apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter link & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
	var hasil = await stickerDl(link)
	try {
		res.json(hasil)
	} catch(err) {
		console.log(err)
		res.json({ message: 'Ups, error' })
	}
})

router.get('/sfiledl', async(req, res) => {

	var link = req.query.link;
apikey = req.query.apikey;
	   if (link === undefined || apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter link & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
	var hasil = await sfiledl(link)
	try {
		res.json(hasil)
	} catch(err) {
		console.log(err)
		res.json({ message: 'Ups, error' })
	}
})

router.get('/pixiv', async(req, res) => {
	var id = req.query.id,
	   ext = req.query.ext,
  apikey = req.query.apikey;
	   if (id === undefined || ext === undefined || apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter id,ext & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
	var hasil = await pixivDownload(id, ext)
	try {
		var data = await getBuffer(hasil)
		await fs.writeFileSync(__path +'/tmp/image.jpg', data)
   		await res.sendFile(__path +'/tmp/image.jpg')
	} catch(err) {
		console.log(err)
		res.json({ message: 'Ups, error' })
	}
})
router.get('/fbdl', async(req, res) => {
	var link = req.query.link;
apikey = req.query.apikey;
	   if (link === undefined || apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter link & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
	var hasil = await dl(link)
	try {
		res.json(hasil)
	} catch(err) {
		console.log(err)
		res.json({ message: 'Ups, error' })
	}
})
router.get('/likeedl', async(req, res) => {
	var link = req.query.link;
	   apikey = req.query.apikey;
	   if (link === undefined || apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter link & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
	var hasil = await dl(link)
	try {
		res.json(hasil)
	} catch(err) {
		console.log(err)
		res.json({ message: 'Ups, error' })
	}
})

router.get('/tiktok', tIk);

router.get('/mediafire', mDo);

router.get('/tebakgambar', tgContr);

router.get('/ytplay', youtubePlay);

router.get('/ytmp4', youtubeMp4);

router.get('/ytmp3', youtubeMp3);

router.get('/caklontong', cakLontong);

router.get('/quotes', quotes);

router.get('/fakta', fakta);

router.get('/bijak', bijak);

router.get('/ptl', ptl);

router.get('/motivasi', motivasi);

router.get('/oxy/:tema', photoOxy);

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

router.get('/asupan/asupan', asupan);

router.get('/asupan/ukhty', ukhty);

router.get('/asupan/cecan', cecan);

router.get('/asupan/harley', harley);

router.get('/asupan/hijaber', hijaber);

router.get('/asupan/anony', anony);

router.get('/asupan/joker', joker);

router.get('/igdl', igdownloader);

router.get('/twitter', twitterdownloader);

router.get('/game/tebakbendera', tebakbendera);

router.get('/game/tebaklirik', tebaklirik);

router.get('/game/tebakchara', tebakchara);

router.get('/game/tebakjenaka', tebakjenaka);

router.get('/game/tekateki', tekateki);

router.get('/game/tebakkabupaten', tebakkabupaten);

router.get('/game/tebakkata', tebakkata);

router.get('/game/tebakkimia', tebakkimia);

router.get('/game/tebaktebakan', tebaktebakan);

router.get('/game/tebakkalimat', tebakkalimat);

router.get('/game/asahotak', asahotak);

router.get('/game/dadu', dadu);

router.get('/game/truth', truth);

router.get('/game/dare', dare);

router.get('/game/family100', family100);

router.get('/game/susunkata', susunkata);

router.get('/ppcouple', ppcouple);

module.exports = router;
