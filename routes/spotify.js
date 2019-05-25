var express = require('express');
var router = express.Router();
var SpotifyWebApi = require('spotify-web-api-node');

router.get('/', function(req, res, next) {
    res.send('uhhh');
});

//set Spotify credentials
var scopes = ['user-read-private', 'user-read-email'],
  redirectUri = 'http://localhost:3000/spotify/spotredirect',
  clientId = '9585d762215c4ad58da6bacd3a893e27',
  clientSecret = '62138f36d74d45c3a057790deeb86592';

//Instantiate spotify
var spotAPI = new SpotifyWebApi({
  clientId: clientId,
  clientSecret: clientSecret,
  redirectUri: redirectUri
});

//create authURL
var authorizeURL = spotAPI.createAuthorizeURL(scopes);

//from the button
router.get('/spotlogin', function(req, res, next) {
  res.redirect(authorizeURL);
});

//redirect with client code
router.get('/spotredirect', function(req, res, next) {

    //Gets client code from url
    const code = req.query.code;
    
    spotAPI.authorizationCodeGrant(code).then(
        function(data) {console.log('The token expires in ' + data.body['expires_in']);
        console.log('The access token is ' + data.body['access_token']);
        console.log('The refresh token is ' + data.body['refresh_token']);
    
        // Set the access token on the API object to use it in later calls
        spotAPI.setAccessToken(data.body['access_token']);
        spotAPI.setRefreshToken(data.body['refresh_token']);
        },
        function(err) {
            console.log('There was an error...', err)
        }
    )
    .catch(err => {
        console.log(err);
    });

    res.redirect('./');

})



module.exports = router;