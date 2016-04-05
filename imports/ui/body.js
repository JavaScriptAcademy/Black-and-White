import { Template } from 'meteor/templating';
import { Cards } from '../api/cards.js';
import { Meteor } from 'meteor/meteor';
import { ComparedCards } from '../api/comparedCards.js';



import './body.html';
import './card.js';

var noCards = true;

Template.body.events({
  'click .get-cards'() {
    Meteor.call('cards.insertAll');
    noCards = false;
    console.log(noCards);

  },
  'click .restart'() {
    Meteor.call('cards.removeAll');
    noCards = true;
  },
});



// console.log(Meteor.userId());
// console.log(Meteor.user().username);

Template.body.helpers({
  myCards() {
    return Cards.find({'owner' : Meteor.userId()});
  },
  competitorCards() {
    return Cards.find({'owner' : {$ne:Meteor.userId()}});
  },
  hideGetCardsButton() {
    return noCards;
  },
  submittedCards() {
    return ComparedCards.find({});
  }
});

console.log(ComparedCards.count());

