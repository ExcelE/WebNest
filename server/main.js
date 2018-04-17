import { Meteor } from 'meteor/meteor';
import _ from 'lodash';
import faker from 'faker';
import { Members } from '../imports/api/members';
import { Rooms } from '../imports/api/rooms';
import './twitter.js';

Meteor.startup(() => {
  // code to run on server at startup
  Meteor.publish('rooms.vacantRooms', () => {
    return Rooms.find({
      available: true,
    });
  });

  Meteor.publish('rooms.allRooms', () => {
    return Rooms.find();
  });

  Meteor.publish('members.allMembers', () => {
    return Members.find();
  });

  const numberMembers = Members.find({}).count();
  console.log(numberMembers);
  if (!numberMembers) {
    _.times(20, () => {
      const firstName = faker.name.firstName();
      const lastName = faker.name.lastName();
      const member = faker.internet.userName();
      const city = faker.address.city();
      const state = faker.address.state();
      const dataFeed = "";

      Meteor.call('insertMember', {
        firstName,
        lastName,
        member,
        city,
        state,
        dataFeed,
        createdAt: new Date(),
      });
    });
  }

  const numberRooms = Rooms.find({}).count();
  console.log(numberRooms);
  if (!numberRooms) {
    _.times(25, (roomNumber) => {
      roomNumber++;
      const checkIn = faker.date.past();
      const checkOut = faker.date.future();

      Meteor.call('insertRoom', {
        roomNumber,
        checkIn,
        checkOut,
        tenantID: 'No one',
        available: true,
        needCleaning: true,
        createdAt: new Date(),
      });

      return roomNumber;
    });
  }
});
