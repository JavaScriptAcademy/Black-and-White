import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Rooms } from '../api/rooms.js';




import './home.html';
import './room.js';
// import './card.js';




Template.home.helpers({
  waitingRooms: function()　{
    return Rooms.find({'participant' : null});
  },
  playingRooms: function() {
    return Rooms.find({'participant' : {$ne: null}});
  }
});

Template.home.events({
  'click .newRoom'() {
    Meteor.call('rooms.insert');
    let roomId = Rooms.findOne({'owner' : Meteor.userId()})._id;
    Router.go('/rooms/' + roomId);
  }
});





///test


