import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';


import './room.html';

Template.room.helpers({
  creater() {
    return Meteor.users.findOne(this.owner).username;
  },
  isWaitingCompetitor() {
    return this.participant === null;
  },
  isPlaying() {
    return this.participant !== null;
  },
  participant() {
    if(this.participant !== null) {
      return Meteor.users.find();
    }
  }
});

Template.room.events({
  'click .room'() {
    console.log(this._id);
    Meteor.call('room.updateParticipant', this._id, Meteor.userId());
    Router.go('/rooms/' + this._id);
  }
});



