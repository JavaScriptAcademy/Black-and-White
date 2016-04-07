import { Meteor } from 'meteor/meteor';

import '../imports/api/cards.js';
import '../imports/api/comparedCards.js';
import '../imports/api/rooms.js';


Meteor.startup(() => {
  // code to run on server at startup



});

// Meteor.publish("userStatus", function() {
//   var users = Meteor.users.find({ "status.online": true });
//   // TODO - use math.rand to get a 0 or 1
//   // TODO - use this to assign "goesFirst" to either the 1st or 2nd user based on their index
//   return Meteor.users.find({ "status.online": true });
// });