import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Rooms = new Mongo.Collection('rooms');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('rooms', function roomsPublication() {
    return Rooms.find();
  });
}

Meteor.methods({
  'rooms.insert'() {
    Rooms.insert({
      owner: Meteor.userId(),
      participant: null,

    });
  },
  'rooms.remove'(roomId) {
    Rooms.remove(roomId);
  },

});