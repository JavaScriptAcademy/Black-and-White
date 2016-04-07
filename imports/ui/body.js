import { Template } from 'meteor/templating';
import { Cards } from '../api/cards.js';
import { Meteor } from 'meteor/meteor';
import { ComparedCards } from '../api/comparedCards.js';
import { Session } from 'meteor/session';

export const Rooms = new Mongo.Collection('rooms');

import './body.html';
import './room.js';


Template.body.onCreated(function bodyOnCreated() {
  Meteor.subscribe('cards');
  Meteor.subscribe('comparedCards');
  Meteor.subscribe('rooms');
});

Template.body.helpers({
  rooms: function()　{
    return Rooms.find();
  }
})

Template.body.events({
  'click .newRoom'() {

    // Meteor.call();
  }
});





///test


