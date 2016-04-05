import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ComparedCards } from '../api/comparedCards.js';


import './card.html';

Template.card.helpers({
  isOwner() {
    return this.owner === Meteor.userId();
  }
});

//Meteor.call('comparedCards.test');



Template.card.events({
  'click .card'() {
    if(this.owner === Meteor.userId()){
      Meteor.call('cards.remove', this._id);
      Meteor.call('comparedCards.insert', this.number, this.color);
    }
  }
});
