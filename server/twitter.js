var Twitter = require('twit');
var config = require('./modules/twitterConfig.js');

export const clientTweet = new Twitter(config);

// var tweet = 'Good Morning!';

// clientTweet.post('statuses/update', {status: tweet})
//   .then(function (tweet) {
//     console.log(tweet);
//   })
//   .catch(function (error) {
//     throw error;
// });
