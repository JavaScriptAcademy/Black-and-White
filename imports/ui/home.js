import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Rooms } from '../api/rooms.js';




import './home.html';
import './room.js';
// import './card.js';




Template.home.helpers({
  rooms: function()　{
    return Rooms.find({'participant' : null});
  }
});

Template.home.events({
  'click .newRoom'() {

    Meteor.call('rooms.insert');
  }
});





///test


