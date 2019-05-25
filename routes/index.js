var express = require('express');
var router = express.Router();
var SpotifyWebApi = require('spotify-web-api-node');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Lets do Spotify', h1: 'StreamVert', greeting: 'Welcome to StreamVert' });
});





module.exports = router;
