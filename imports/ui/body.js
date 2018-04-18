import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Members } from '../api/members';
import { Rooms } from '../api/rooms';
import { UploadHistory } from  '../api/uploadHist';

import './body.html';
import './members.html';
import './rooms.html';
import './navigation.html';
import './emptyRooms.html';
import './main.html';
import './body.css';
import './email.html';


AutoForm.setDefaultTemplate('materialize');

window.Members = Members;
window.Rooms = Rooms;

// character counter for twitter
$(document).ready(function() {
  $('input#input_text, textarea#textarea2').characterCounter();
});

Template.body.onCreated(function bodyOnCreated() {
  Meteor.subscribe('members.allMembers');
  Meteor.subscribe('rooms.allRooms');
});

Template.registerHelper('formatDate', function(date) {
  return moment(date).format('MMM Do YYYY');
});

Template.tweetField.events({
  'submit form': function(event){
    event.preventDefault();
    var tweet = event.target.textarea2.value;
    Meteor.call('uploadTweet', tweet);
    event.target.textarea2.value = "";
    return false;
  }
})

Template.members.helpers({
  members() {
    return Members.find({});
  },
  tweets() {
    return UploadHistory.find({});
  },
});

Template.rooms.helpers({
  rooms() {
    return Rooms.find({});
  },
});

Template.emptyRooms.helpers({
  emptyRooms() {
    return Rooms.find({
      available: true,
    });
  },
});

Template.tweet.helpers({
  uploadedBy() {
    return this._id;
  },
  
  returnTweet(id) {
    const tweet = UploadHistory.findOne({ id: JSON.stringify(id) });
    return `${tweet.content}`;
  },

  postedOn(id) {
    const tweet = UploadHistory.findOne({ id: JSON.stringify(id) });
    return `${tweet.createdAt}`;
  }
})

Template.room.helpers({
  makeUniqueID() {
    return this._id;
  },
  returnName(tenantID) {
    const member = Members.findOne({ _id: tenantID });
    return `${member.firstName} ${member.lastName}`;
  },
});

Template.emptyRoom.helpers({
  makeUniqueID() {
    return this._id;
  },
  returnName(tenantID) {
    const member = Members.findOne({ _id: tenantID });
    return `${member.firstName} ${member.lastName}`;
  },
});

Template.members.onRendered(function() {
  $('#modal1').modal();
});

Template.members.onRendered(function() {
  $('#modal2').modal();
});

Template.rooms.onRendered(function() {
  $('.collapsible').collapsible();
});

/*
  Routes
*/

Router.route('/', function () {
  this.layout('layout');
  this.render('main');
});

Router.route('/email', function () {
  this.layout('layout');
  this.render('email');
});

Router.route('/emptyRooms', function () {
  this.layout('layout');
  this.render('emptyRooms');
});
