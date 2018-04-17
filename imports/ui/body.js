import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Members } from '../api/members';
import { Rooms } from '../api/rooms';

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

Template.body.onCreated(function bodyOnCreated() {
  Meteor.subscribe('members.allMembers');
  Meteor.subscribe('rooms.allRooms');
});

Template.registerHelper('formatDate', function(date) {
  return moment(date).format('MMM Do YYYY');
});

Template.members.helpers({
  members() {
    return Members.find({});
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
