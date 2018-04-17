import { Meteor } from 'meteor/meteor';
import { Members } from '../imports/api/members';
import { Rooms } from '../imports/api/rooms';

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
});
