const axios = require("axios")
const cheerio = require("cheerio")
const express = require('express');
const secure = require('ssl-express-www');
const morgan = require('morgan')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
var app = express();
app.use(secure)
app.use(morgan('dev'));
app.use(express.static('client'));
app.set("json spaces",2)
__path = process.cwd()
const session = require('express-session');
const cookieParser = require('cookie-parser');
const expressLayout = require('express-ejs-layouts');
const passport = require('passport');
const flash = require('connect-flash');
const schedule = require('node-schedule');
const MemoryStore = require('memorystore')(session);
const rateLimit = require("express-rate-limit");

const apiRouters = require('./routes/api');
const userRouters = require('./routes/users');
const premiumRouters = require('./routes/premium');

const { isAuthenticated } = require('./lib/auth');
const { connectMongoDb } = require('./database/connect');
const { getApikey, resetLimit } = require('./database/db');
const { port } = require('./lib/settings');
const { ignoreFavicon } = require('./lib/function');
var downloader = require('./server/downloader.js');
var search = require('./server/search.js');
var anime = require('./server/anime.js');
var randomimg = require('./server/randomimage.js');
var nsfw = require('./server/nsfw.js');
var photooxy = require('./server/photooxy.js');
var otakudesu = require('./server/otakudesu.js');
var games = require('./server/games.js');
var primbon = require('./server/primbon.js');
var convert = require('./server/convert.js');
var other = require('./server/other.js');
const { ExpiredTime, getTotalReq, getTodayReq, getVisitor, getTotalUser, addRequest, addVisitor } = require('./database/premium');

const PORT = process.env.PORT || port;

connectMongoDb();

app.set('trust proxy', 1);

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, 
  max: 5000, 
  message: 'Oops too many requests'
});
app.use(limiter);

app.set('view engine', 'ejs');
app.use(expressLayout);
app.use(express.static('public'));

app.use(ignoreFavicon)

app.use(session({
  secret: 'secret',  
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 86400000 },
  store: new MemoryStore({
    checkPeriod: 86400000 // prune expired entries every 24h
  }),
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());
require('./lib/config')(passport);

app.use(flash());

app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
})

app.use(function(req, res, next) {
  getTotalUser()
  addRequest();
  next();
})

app.get('/', (req, res) => {
  addVisitor()
  res.render('index', {
    layout: 'layouts/main'
  });
});

app.get('/docs', isAuthenticated, async (req, res) => { 
  addVisitor()
  let { apikey, username, limit } = req.user
  let total = await getTotalReq()
  let today = await getTodayReq()
  let visitor = await getVisitor()
  let userTotal = await getTotalUser()
  res.render('docs', {
    limit: limit,
    total: total,
    today,
    visitor,
    userTotal,
    username: username,
    apikey: apikey,
    layout: 'layouts/main'
  });
});

app.get('/price', (req, res) => {
  let getUser = req.user
  if (!getUser) var username = 'User'
  else var username = getUser.username
  res.render('price', {
    username,
    layout: 'layouts/main'
  })
})

app.use('/api', apiRouters);
app.use('/users', userRouters);
app.use('/premium', premiumRouters);
app.use('/downloader', downloader);
app.use('/search', search);
app.use('/anime', anime);
app.use('/randomimg', randomimg);
app.use('/nsfw', nsfw);
app.use('/photooxy', photooxy);
app.use('/otakudesu', otakudesu);
app.use('/games', games);
app.use('/primbon', primbon);
app.use('/converter', convert);
app.use('/other', other);

app.set('json spaces', 4);

app.use(function (req, res, next) {
  if (res.statusCode == '200') {
    res.render('notfound', {
      layout: 'layouts/main'
    });
  }
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
  schedule.scheduleJob('* * * * *', () => { 
    ExpiredTime()
  });
});