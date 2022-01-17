const express = require('express');
const router = express.Router();
__path = process.cwd();
const fs = require('fs');
const { fetch } = require('node-fetch');
const { getBuffer } = require('../lib/function');
const { readFileTxt, readFileJson } = require('../lib/function');
const { mp4, Mp3 } = require('../lib/youtube');
const { limitAdd, isLimit } = require('../database/db');
const { readFileJson } = require('../lib/function');
const { cekKey, checkLimit, resetLimit } = require('../database/db'); 
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
    const apikey = req.query.apikey;;
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

router.get('/merdeka', async(req, res) => {
  const apikey = req.query.apikey;;
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

/*
router.get("/qrcode", (req, res) => {
 const qr = require('qr-image');
 const text = req.query.text;
 const apikey = req.query.apikey;;
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
 const img = qr.image(text,{size :13});
 limitAdd(apikey);
 res.writeHead(200, {'Content-Type': 'image/png'});
 img.pipe(res);
});
*/

router.get('/meme', async (req, res) => {
     const apikey = req.query.apikey;;
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

router.get('/photooxy/romantic', async(req, res) => {
  const text = req.query.text;
	const apikey = req.query.apikey;;
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
    
router.get('/artinama', async(req, res) => {
	const nama = req.query.nama;
	const apikey = req.query.apikey;;
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

router.get('/ramalanjodoh', async(req, res) => {
	const nama = req.query.nama;
  const pasangan = req.query.pasangan;
  const apikey = req.query.apikey;;
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

router.get('/pinterest', async (req, res) => {
    const query = req.query.query;
    const apikey = req.query.apikey;;
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

router.get('/happymod', async(req, res) => {
	const query = req.query.query;
const apikey = req.query.apikey;;
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
router.get('/sticker', async(req, res) => {
	const query = req.query.query;
const apikey = req.query.apikey;;
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

router.get('/pindl', async(req, res) => {
	const link = req.query.link;
  const apikey = req.query.apikey;;
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
router.get('/scdl', async(req, res) => {
	const link = req.query.link;
const apikey = req.query.apikey;;
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
	const hasil = await scdl(link);
limitAdd(apikey);
	try {
		res.json(hasil)
	} catch(err) {
		console.log(err)
		res.json({ message: 'Ups, error' })
	}
})
router.get('/sfiledl', async(req, res) => {
	const link = req.query.link;
const apikey = req.query.apikey;;
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
	const hasil = await sfiledl(link);
limitAdd(apikey);
try {
		res.json(hasil)
	} catch(err) {
		console.log(err)
		res.json({ message: 'Ups, error' })
	}
})

router.get('/igStory', async(req, res) => {
		const username = req.query.username;
  const apikey = req.query.apikey;;
   if (username === undefined || apikey === undefined) return res.status(404).send({
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
	const hasil = await igStory(username);
limitAdd(apikey);
	try {
		res.json(hasil)
	} catch(err) {
		console.log(err)
		res.json({ message: 'Ups, error' })
	}
})
router.get('/mediafireDl', async(req, res) => {
		const link = req.query.link;
  const apikey = req.query.apikey;;
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
	const hasil = await mediafireDl(link);
limitAdd(apikey);
	try {
		res.json(hasil)
	} catch(err) {
		console.log(err)
		res.json({ message: 'Ups, error' })
	}
})
router.get('/zippyShare', async(req, res) => {
		const link = req.query.link;
  const apikey = req.query.apikey;;
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
	const hasil = await zipi.zippy(link);
limitAdd(apikey);
	try {
		res.json(hasil)
	} catch(err) {
		console.log(err)
		res.json({ message: 'Ups, error' })
	}
})

router.get('/likeedl', async(req, res) => {
	const link = req.query.link;
  const apikey = req.query.apikey;;
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
	const hasil = await dl(link);
limitAdd(apikey);
	try {
		res.json(hasil)
	} catch(err) {
		console.log(err)
		res.json({ message: 'Ups, error' })
	}
})

router.get('/stickerpack', async(req, res) => {
		const link = req.query.link;
  const apikey = req.query.apikey;;
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
	const hasil = await stickerDl(link);
  limitAdd(apikey);
	try {
		res.json(hasil)
	} catch(err) {
		console.log(err)
		res.json({ message: 'Ups, error' })
	}
})

router.get('/wallpaper/keneki', async (req, res) => {
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
  readFileJson('/lib/keneki.json')
.then(result => {
        limitAdd(apikey);
        res.status(200).send({
            status: 200, 
            result: result
        });     
    }).catch(error => {
        console.log(error);
        res.status(500).send({status: 500, message: 'Internal Server Error'});
    });
}

router.get('/wallpaper/megumin', async (req, res) => {
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
  readFileJson('/lib/megumin.json')
.then(result => {
        limitAdd(apikey);
        res.status(200).send({
            status: 200, 
            result: result
        });
    }).catch(error => {
        console.log(error);
        res.status(500).send({status: 500, message: 'Internal Server Error'});
    });
}

router.get('/wallpaper/yotsuba', async (req, res) => {
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
  readFileJson('/lib/yotsuba.json')
.then(result => {
        limitAdd(apikey);
        res.status(200).send({
            status: 200, 
            result: result
        });
    }).catch(error => {
        console.log(error);
        res.status(500).send({status: 500, message: 'Internal Server Error'});
    });
}

router.get('/wallpaper/shinomiya', async (req, res) => {
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
  readFileJson('/lib/shinomiya.json')
.then(result => {
        limitAdd(apikey);
        res.status(200).send({
            status: 200, 
            result: result
        });
    }).catch(error => {
        console.log(error);
        res.status(500).send({status: 500, message: 'Internal Server Error'});
    });
}

router.get('/wallpaper/yumeko', async (req, res) => {
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
  readFileJson('/lib/yumeko.json')
  .then(result => {
        limitAdd(apikey);
        res.status(200).send({
            status: 200, 
            result: result
        });
    }).catch(error => {
        console.log(error);
        res.status(500).send({status: 500, message: 'Internal Server Error'});
    });
}

router.get('/wallpaper/tejina', async (req, res) => {
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
  readFileJson('/lib/tejina.json')
  .then(result => {
        limitAdd(apikey);
        res.status(200).send({
            status: 200, 
            result: result
        });
    }).catch(error => {
        console.log(error);
        res.status(500).send({status: 500, message: 'Internal Server Error'});
    });
}

router.get('/wallpaper/chiho', async (req, res) => {
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
  readFileJson('/lib/chiho.json')
  .then(result => {
        limitAdd(apikey);
        res.status(200).send({
            status: 200, 
            result: result
        });
    }).catch(error => {
        console.log(error);
        res.status(500).send({status: 500, message: 'Internal Server Error'});
    });
}

router.get('/wallpaper/cyberspace', async (req, res) => {
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
  readFileJson('/lib/CyberSpace.json')
  .then(result => {
        limitAdd(apikey);
        res.status(200).send({
            status: 200, 
            result: result
        });
    }).catch(error => {
        console.log(error);
        res.status(500).send({status: 500, message: 'Internal Server Error'});
    });
}

router.get('/wallpaper/gaming', async (req, res) => {
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
  readFileJson('/lib/GameWallp.json')
  .then(result => {
        limitAdd(apikey);
        res.status(200).send({
            status: 200, 
            result: result
        });
    }).catch(error => {
        console.log(error);
        res.status(500).send({status: 500, message: 'Internal Server Error'});
    });
}

router.get('/wallpaper/islami', async (req, res) => {
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
  readFileJson('/lib/Islamic.json')
  .then(result => {
        limitAdd(apikey);
        res.status(200).send({
            status: 200, 
            result: result
        });
    }).catch(error => {
        console.log(error);
        res.status(500).send({status: 500, message: 'Internal Server Error'});
    });
}

router.get('/wallpaper/programing', async (req, res) => {
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
  readFileJson('/lib/Programming.json')
  .then(result => {
        limitAdd(apikey);
        res.status(200).send({
            status: 200, 
            result: result
        });
    }).catch(error => {
        console.log(error);
        res.status(500).send({status: 500, message: 'Internal Server Error'});
    });
}

router.get('/wallpaper/teknologi', async (req, res) => {
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
  readFileJson('/lib/Technology.json')
  .then(result => {
        limitAdd(apikey);
        res.status(200).send({
            status: 200, 
            result: result
        });
    }).catch(error => {
        console.log(error);
        res.status(500).send({status: 500, message: 'Internal Server Error'});
    });
}

router.get('/wallpaper/mountain', async (req, res) => {
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
  readFileJson('/lib/Mountain.json')
.then(result => {
        limitAdd(apikey);
        res.status(200).send({
            status: 200, 
            result: result
        });
    }).catch(error => {
        console.log(error);
        res.status(500).send({status: 500, message: 'Internal Server Error'});
    });
}

router.get('/wallpaper/tatasurya', async (req, res) => {
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
  readFileJson('/lib/tatasurya.json')
  .then(result => {
        limitAdd(apikey);
        res.status(200).send({
            status: 200, 
            result: result
        });
    }).catch(error => {
        console.log(error);
        res.status(500).send({status: 500, message: 'Internal Server Error'});
    });
}

router.get('/wallpaper/kartun', async (req, res) => {
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
  readFileJson('/lib/kartun.json')
  .then(result => {
        limitAdd(apikey);
        res.status(200).send({
            status: 200, 
            result: result
        });
    }).catch(error => {
        console.log(error);
        res.status(500).send({status: 500, message: 'Internal Server Error'});
    });
}

router.get('/wallpaper/pentol', async (req, res) => {
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
  readFileJson('/lib/pentol.json')
  .then(result => {
        limitAdd(apikey);
        res.status(200).send({
            status: 200, 
            result: result
        });
    }).catch(error => {
        console.log(error);
        res.status(500).send({status: 500, message: 'Internal Server Error'});
    });
}

router.get('/wallpaper/katakata', async (req, res) => {
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
  readFileJson('/lib/katakata.json')
  .then(result => {
        limitAdd(apikey);
        res.status(200).send({
            status: 200, 
            result: result
        });
    }).catch(error => {
        console.log(error);
        res.status(500).send({status: 500, message: 'Internal Server Error'});
    });
}

router.get('/wallpaper/toukachan', async (req, res) => {
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
  readFileJson('/lib/toukachan.json')
  .then(result => {
        limitAdd(apikey);
        res.status(200).send({
            status: 200, 
            result: result
        });
    }).catch(error => {
        console.log(error);
        res.status(500).send({status: 500, message: 'Internal Server Error'});
    });
}

router.get('/wallpaper/akira', async (req, res) => {
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
  readFileJson('/lib/akira.json')
  .then(result => {
        limitAdd(apikey);
        res.status(200).send({
            status: 200, 
            result: result
        });
    }).catch(error => {
        console.log(error);
        res.status(500).send({status: 500, message: 'Internal Server Error'});
    });
}

router.get('/wallpaper/itori', async (req, res) => {
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
  readFileJson('/lib/itori.json')
  .then(result => {
        limitAdd(apikey);
        res.status(200).send({
            status: 200, 
            result: result
        });
    }).catch(error => {
        console.log(error);
        res.status(500).send({status: 500, message: 'Internal Server Error'});
    });
}

router.get('/wallpaper/kurumi', async (req, res) => {
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
  readFileJson('/lib/kurumi.json')
  .then(result => {
        limitAdd(apikey);
        res.status(200).send({
            status: 200, 
            result: result
        });
    }).catch(error => {
        console.log(error);
        res.status(500).send({status: 500, message: 'Internal Server Error'});
    });
}

router.get('/wallpaper/miku', async (req, res) => {
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
  readFileJson('/lib/miku.json')
  .then(result => {
        limitAdd(apikey);
        res.status(200).send({
            status: 200, 
            result: result
        });
    }).catch(error => {
        console.log(error);
        res.status(500).send({status: 500, message: 'Internal Server Error'});
    });
}

router.get('/wallpaper/pokemon', async (req, res) => {
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
  readFileJson('/lib/pokemon.json')
  .then(result => {
        limitAdd(apikey);
        res.status(200).send({
            status: 200, 
            result: result
        });
    }).catch(error => {
        console.log(error);
        res.status(500).send({status: 500, message: 'Internal Server Error'});
    });
}

router.get('/wallpaper/ryujin', async (req, res) => {
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
  readFileJson('/lib/ryujin.json')
  .then(result => {
        limitAdd(apikey);
        res.status(200).send({
            status: 200, 
            result: result
        });
    }).catch(error => {
        console.log(error);
        res.status(500).send({status: 500, message: 'Internal Server Error'});
    });
}

router.get('/wallpaper/rose', async (req, res) => {
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
  readFileJson('/lib/rose.json')
  .then(result => {
        limitAdd(apikey);
        res.status(200).send({
            status: 200, 
            result: result
        });
    }).catch(error => {
        console.log(error);
        res.status(500).send({status: 500, message: 'Internal Server Error'});
    });
}

router.get('/wallpaper/kaori', async (req, res) => {
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
  readFileJson('/lib/kaori.json')
  .then(result => {
        limitAdd(apikey);
        res.status(200).send({
            status: 200, 
            result: result
        });
    }).catch(error => {
        console.log(error);
        res.status(500).send({status: 500, message: 'Internal Server Error'});
    });
}

router.get('/wallpaper/shizuka', async (req, res) => {
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
  readFileJson('/lib/shizuka.json')
  .then(result => {
        limitAdd(apikey);
        res.status(200).send({
            status: 200, 
            result: result
        });
    }).catch(error => {
        console.log(error);
        res.status(500).send({status: 500, message: 'Internal Server Error'});
    });
}

router.get('/wallpaper/kaga', async (req, res) => {
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
  readFileJson('/lib/kaga.json')
  .then(result => {
        limitAdd(apikey);
        res.status(200).send({
            status: 200, 
            result: result
        });
    }).catch(error => {
        console.log(error);
        res.status(500).send({status: 500, message: 'Internal Server Error'});
    });
}

router.get('/wallpaper/kotori', async (req, res) => {
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
  readFileJson('/lib/kotori.json')
  .then(result => {
        limitAdd(apikey);
        res.status(200).send({
            status: 200, 
            result: result
        });
    }).catch(error => {
        console.log(error);
        res.status(500).send({status: 500, message: 'Internal Server Error'});
    });
}

router.get('/wallpaper/mikasa', async (req, res) => {
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
  readFileJson('/lib/mikasa.json')
  .then(result => {
        limitAdd(apikey);
        res.status(200).send({
            status: 200, 
            result: result
        });
    }).catch(error => {
        console.log(error);
        res.status(500).send({status: 500, message: 'Internal Server Error'});
    });
}

router.get('/wallpaper/akiyama', async (req, res) => {
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
  readFileJson('/lib/akiyama.json')
  .then(result => {
        limitAdd(apikey);
        res.status(200).send({
            status: 200, 
            result: result
        });
    }).catch(error => {
        console.log(error);
        res.status(500).send({status: 500, message: 'Internal Server Error'});
    });
}

router.get('/wallpaper/gremory', async (req, res) => {
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
  readFileJson('/lib/gremory.json')
  .then(result => {
        limitAdd(apikey);
        res.status(200).send({
            status: 200, 
            result: result
        });
    }).catch(error => {
        console.log(error);
        res.status(500).send({status: 500, message: 'Internal Server Error'});
    });
}

router.get('/wallpaper/isuzu', async (req, res) => {
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
  readFileJson('/lib/isuzu.json')
  .then(result => {
        limitAdd(apikey);
        res.status(200).send({
            status: 200, 
            result: result
        });
    }).catch(error => {
        console.log(error);
        res.status(500).send({status: 500, message: 'Internal Server Error'});
    });
}

router.get('/random/cosplay', async (req, res) => {
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
  readFileJson('/lib/cosplay.json')
  .then(result => {
        limitAdd(apikey);
        res.status(200).send({
            status: 200, 
            result: result
        });
    }).catch(error => {
        console.log(error);
        res.status(500).send({status: 500, message: 'Internal Server Error'});
    });
}

router.get('/wallpaper/shina', async (req, res) => {
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
  readFileJson('/lib/shina.json')
  .then(result => {
        limitAdd(apikey);
        res.status(200).send({
            status: 200, 
            result: result
        });
    }).catch(error => {
        console.log(error);
        res.status(500).send({status: 500, message: 'Internal Server Error'});
    });
}

router.get('/wallpaper/kagura', async (req, res) => {
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
  readFileJson('/lib/kagura.json')
  .then(result => {
        limitAdd(apikey);
        res.status(200).send({
            status: 200, 
            result: result
        });
    }).catch(error => {
        console.log(error);
        res.status(500).send({status: 500, message: 'Internal Server Error'});
    });
}

router.get('/wallpaper/shinka', async (req, res) => {
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
  readFileJson('/lib/shinka.json')
  .then(result => {
        limitAdd(apikey);
        res.status(200).send({
            status: 200, 
            result: result
        });
    }).catch(error => {
        console.log(error);
        res.status(500).send({status: 500, message: 'Internal Server Error'});
    });
}

router.get('/wallpaper/eba', async (req, res) => {
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
  readFileJson('/lib/eba.json')
  .then(result => {
        limitAdd(apikey);
        res.status(200).send({
            status: 200, 
            result: result
        });
    }).catch(error => {
        console.log(error);
        res.status(500).send({status: 500, message: 'Internal Server Error'});
    });
}

router.get('/wallpaper/deidara', async (req, res) => {
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
  readFileJson('/lib/deidara.json')
  .then(result => {
        limitAdd(apikey);
        res.status(200).send({
            status: 200, 
            result: result
        });
    }).catch(error => {
        console.log(error);
        res.status(500).send({status: 500, message: 'Internal Server Error'});
    });
}

router.get('/wallpaper/trans', async (req, res) => {
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
  readFileJson('/lib/trans.json')
  .then(result => {
        limitAdd(apikey);
        res.status(200).send({
            status: 200, 
            result: result
        });
    }).catch(error => {
        console.log(error);
        res.status(500).send({status: 500, message: 'Internal Server Error'});
    });
}

router.get('/wallpaper/jeni', async (req, res) => {
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
  readFileJson('/lib/jeni.json')
  .then(result => {
        limitAdd(apikey);
        res.status(200).send({
            status: 200, 
            result: result
        });
    }).catch(error => {
        console.log(error);
        res.status(500).send({status: 500, message: 'Internal Server Error'});
    });
}

router.get('/wallpaper/jiso', async (req, res) => {
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
  readFileJson('/lib/jiso.json')
  .then(result => {
        limitAdd(apikey);
        res.status(200).send({
            status: 200, 
            result: result
        });
    }).catch(error => {
        console.log(error);
        res.status(500).send({status: 500, message: 'Internal Server Error'});
    });
}

router.get('/wallpaper/satanic', async (req, res) => {
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
  readFileJson('/lib/satanic.json')
  .then(result => {
        limitAdd(apikey);
        res.status(200).send({
            status: 200, 
            result: result
        });
    }).catch(error => {
        console.log(error);
        res.status(500).send({status: 500, message: 'Internal Server Error'});
    });
}

router.get('/wallpaper/cecan2', async (req, res) => {
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
  readFileJson('/lib/cecan2.json')
  .then(result => {
        limitAdd(apikey);
        res.status(200).send({
            status: 200, 
            result: result
        });
    }).catch(error => {
        console.log(error);
        res.status(500).send({status: 500, message: 'Internal Server Error'});
    });
}

router.get('/wallpaper/cogan2', async (req, res) => {
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
  readFileJson('/lib/cogan2.json')
  .then(result => {
        limitAdd(apikey);
        res.status(200).send({
            status: 200, 
            result: result
        });
    }).catch(error => {
        console.log(error);
        res.status(500).send({status: 500, message: 'Internal Server Error'});
    });
}

router.get('/wallpaper/itachi', async (req, res) => {
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
  readFileJson('/lib/itachi.json')
  .then(result => {
        limitAdd(apikey);
        res.status(200).send({
            status: 200, 
            result: result
        });
    }).catch(error => {
        console.log(error);
        res.status(500).send({status: 500, message: 'Internal Server Error'});
    });
}

router.get('/wallpaper/madara', async (req, res) => {
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
  readFileJson('/lib/madara.json')
  .then(result => {
        limitAdd(apikey);
        res.status(200).send({
            status: 200, 
            result: result
        });
    }).catch(error => {
        console.log(error);
        res.status(500).send({status: 500, message: 'Internal Server Error'});
    });
}

router.get('/wallpaper/yuki', async (req, res) => {
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
  readFileJson('/lib/yuki.json')
  .then(result => {
        limitAdd(apikey);
        res.status(200).send({
            status: 200, 
            result: result
        });
    }).catch(error => {
        console.log(error);
        res.status(500).send({status: 500, message: 'Internal Server Error'});
    });
}

router.get('/wallpaper/asuna', async (req, res) => {
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
  readFileJson('/lib/asuna.json')
  .then(result => {
        limitAdd(apikey);
        res.status(200).send({
            status: 200, 
            result: result
        });
    }).catch(error => {
        console.log(error);
        res.status(500).send({status: 500, message: 'Internal Server Error'});
    });
}

router.get('/wallpaper/ayuzawa', async (req, res) => {
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
  readFileJson('/lib/ayuzawa.json')
  .then(result => {
        limitAdd(apikey);
        res.status(200).send({
            status: 200, 
            result: result
        });
    }).catch(error => {
        console.log(error);
        res.status(500).send({status: 500, message: 'Internal Server Error'});
    });
}

router.get('/wallpaper/chitoge', async (req, res) => {
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
  readFileJson('/lib/chitoge.json')
  .then(result => {
        limitAdd(apikey);
        res.status(200).send({
            status: 200, 
            result: result
        });
    }).catch(error => {
        console.log(error);
        res.status(500).send({status: 500, message: 'Internal Server Error'});
    });
}

router.get('/wallpaper/emilia', async (req, res) => {
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
  readFileJson('/lib/emilia.json')
  .then(result => {
        limitAdd(apikey);
        res.status(200).send({
            status: 200, 
            result: result
        });
    }).catch(error => {
        console.log(error);
        res.status(500).send({status: 500, message: 'Internal Server Error'});
    });
}

router.get('/wallpaper/hestia', async (req, res) => {
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
  readFileJson('/lib/hestia.json')
  .then(result => {
        limitAdd(apikey);
        res.status(200).send({
            status: 200, 
            result: result
        });
    }).catch(error => {
        console.log(error);
        res.status(500).send({status: 500, message: 'Internal Server Error'});
    });
}
router.get('/wallpaper/inori', async (req, res) => {
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
  readFileJson('/lib/inori.json')
  .then(result => {
        limitAdd(apikey);
        res.status(200).send({
            status: 200, 
            result: result
        });
    }).catch(error => {
        console.log(error);
        res.status(500).send({status: 500, message: 'Internal Server Error'});
    });
}

router.get('/wallpaper/elaina', async (req, res) => {
        const apikey = req.query.apikey;;
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
readFileJson('/lib/elaina.json'))
.then(result => {
        limitAdd(apikey);
        res.status(200).send({
            status: 200, 
            result: result
        });
    }).catch(error => {
        console.log(error);
        res.status(500).send({status: 500, message: 'Internal Server Error'});
    });
}


router.get('/wallpaper/loli', async (req, res) => {
        const apikey = req.query.apikey;;
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
readFileJson('/lib/loli.json'))
.then(result => {
        limitAdd(apikey);
        res.status(200).send({
            status: 200, 
            result: result
        });
    }).catch(error => {
        console.log(error);
        res.status(500).send({status: 500, message: 'Internal Server Error'});
    });
}


router.get('/wallpaper/yuri', async (req, res) => {
        const apikey = req.query.apikey;;
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
readFileJson('/lib/yuri.json'))
.then(result => {
        limitAdd(apikey);
        res.status(200).send({
            status: 200, 
            result: result
        });
    }).catch(error => {
        console.log(error);
        res.status(500).send({status: 500, message: 'Internal Server Error'});
    });
}


router.get('/wallpaper/cecan', async (req, res) => {
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
  readFileJson('/lib/cecan.json')
  .then(result => {
        limitAdd(apikey);
        res.status(200).send({
            status: 200, 
            result: result
        });
    }).catch(error => {
        console.log(error);
        res.status(500).send({status: 500, message: 'Internal Server Error'});
    });
}


router.get('/wallpaper/aesthetic', async (req, res) => {
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
  readFileJson('/lib/aesthetic.json')
  .then(result => {
        limitAdd(apikey);
        res.status(200).send({
            status: 200, 
            result: result
        });
    }).catch(error => {
        console.log(error);
        res.status(500).send({status: 500, message: 'Internal Server Error'});
    });
}


router.get('/wallpaper/justina', async (req, res) => {
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
  readFileJson('/lib/justina.json')
  .then(result => {
        limitAdd(apikey);
        res.status(200).send({
            status: 200, 
            result: result
        });
    }).catch(error => {
        console.log(error);
        res.status(500).send({status: 500, message: 'Internal Server Error'});
    });
}


router.get('/wallpaper/sagiri', async (req, res) => {
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
  readFileJson('/lib/sagiri.json')
  .then(result => {
        limitAdd(apikey);
        res.status(200).send({
            status: 200, 
            result: result
        });
    }).catch(error => {
        console.log(error);
        res.status(500).send({status: 500, message: 'Internal Server Error'});
    });
}

router.get('/wallpaper/hinata', async (req, res) => {
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
  readFileJson('/lib/hinata.json')
  .then(result => {
        limitAdd(apikey);
        res.status(200).send({
            status: 200, 
            result: result
        });
    }).catch(error => {
        console.log(error);
        res.status(500).send({status: 500, message: 'Internal Server Error'});
    });
}

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

router.get('/anime/shota', shota);

router.get('/anime/aesthetic', aesthetic);

router.get('/anime/cosplay', cosplay);

router.get('/anime/storyanime', storyanime);

router.get('/anime/wallml', wallml);

router.get('/anime/waifu', waifu);

router.get('/anime/quotenime', quotenime);

router.get('/anime/husbu', husbu);

router.get('/anime/nekonime', nekonime);

router.get('/anime/milf', milf);

router.get('/anime/loli', loli);

router.get('/nsfw/ahegao', ahegao);

router.get('/nsfw/ass', ass);

router.get('/nsfw/bdsm', bdsm);

router.get('/nsfw/blowjob', blowjob);

router.get('/nsfw/gangbang', gangbang);

router.get('/nsfw/cum', cum);

router.get('/nsfw/ero', ero);

router.get('/nsfw/cuckold', cuckold);

router.get('/nsfw/masturbation', masturbation);

router.get('/nsfw/femdom', femdom);

router.get('/nsfw/foot', foot);

router.get('/nsfw/glasses', glasses);

router.get('/nsfw/hentai', hentai);

router.get('/nsfw/hentaigift', hentaigift);

router.get('/nsfw/jahy', jahy);

router.get('/nsfw/manga', manga);

router.get('/nsfw/orgy', orgy);

router.get('/nsfw/nsfwneko', nsfwneko);

router.get('/nsfw/sfwneko', sfwneko);

router.get('/nsfw/panties', panties);

router.get('/nsfw/pussy', pussy);

router.get('/nsfw/thighs', thighs);

router.get('/nsfw/yuri', yuri);

router.get('/nsfw/zettairyouiki', zettairyouiki);

router.get('/nsfw/tentacles', tentacles);

module.exports = router;
