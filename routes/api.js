const express = require('express');
const router = express.Router();
const { limitAdd, isLimit } = require('../database/db');
const { cekKey, checkLimit, resetLimit } = require('../database/db'); 
const { cekKey } = require('../database/db'); 
const { youtubePlay, youtubeMp4, youtubeMp3, igdownloader, twitterdownloader } = require('../controllers/yt');
const { cakLontong, bijak, quotes, fakta, ptl, motivasi, indonesia, malaysia, thailand, vietnam, korea, japan, naruto, china, tiktok, asupan, geayubi, ukhty, rikagusriani, anony, hijaber, joker, harley, cecan, santuy, bocil, tebakjenaka, tebaklirik, ppcouple } = require('../controllers/randomtext');


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