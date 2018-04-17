import Twitter from 'twitter';
var twitter = new Twitter();

var consumerKey = 'vIbO8lT8ttpZJVS4cFK8keNes';
var consumerSecret = '83zV0Qpnh0ExgpmNDDqCD11a0rp8dzJwV6G08VjzXkAMFLlavZ';
var accessTokenKey = '967194641018884096-LQzeSkPbyoD5f8AH1ZNFcB0Sn4UAjSC';
var accessTokenSecret = 'Te73RIAls5jBTS3VuZfVd5NEmCJa23TgipsjNGlPZcNiE';

var client = new Twitter({
  consumer_key: consumerKey,
  consumer_secret: consumerSecret,
  access_token_key: accessTokenKey,
  access_token_secret: accessTokenSecret,
});

// client.post('statuses/update', {status: 'I Love Twitter'})
//   .then(function (tweet) {
//     console.log(tweet);
//   })
//   .catch(function (error) {
//     throw error;
// })
