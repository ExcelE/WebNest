import { Meteor } from 'meteor/meteor';
import { Members } from '../imports/api/members';
import { Rooms } from '../imports/api/rooms';

var Twitter = require('twit');
var config = require('./modules/twitterConfig.js');

export const clientTweet = new Twitter(config);

Meteor.methods({
  insertMember: (member) => {
    Members.insert(member);
  },

  insertRoom: (room) => {
    Rooms.insert(room);
  },

  updateRoom: (room) => {
    const { checkIn, checkOut, tenantID, available, needCleaning } = room.modifier.$set;
    Rooms.update(room._id, { $set: { checkIn, checkOut, tenantID, available, needCleaning }});
  },

  uploadTweet: (tweet) => {
    clientTweet.post('statuses/update', {status: tweet})
    .then(function (tweet) {
      console.log(tweet);
    })
    .catch(function (error) {
      throw error;
  });
  }
});
