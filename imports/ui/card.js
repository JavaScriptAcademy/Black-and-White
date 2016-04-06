import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ComparedCards } from '../api/comparedCards.js';


import './card.html';

Template.card.helpers({
  isOwner() {
    return this.owner === Meteor.userId();
  },
  isEven() {
    return this.number%2 === 0;
  }
});

//Meteor.call('comparedCards.test');
// console.log(ComparedCards.find({}));


Template.card.events({
  'click .card'() {
    if(this.owner === Meteor.userId()){
      Meteor.call('cards.remove', this._id);
      if(ComparedCards.find({}).count() === 1){
        Meteor.setTimeout(function() {
          Meteor.call('comparedCards.removeAll');
        }, 1000);

      }
      Meteor.call('comparedCards.insert', this.number, this.color);

    }
  }
});
