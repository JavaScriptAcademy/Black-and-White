import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { ComparedCards } from '../api/comparedCards.js';

export const Cards = new Mongo.Collection('cards');


Meteor.methods({
  'cards.insertAll'() {
    for(var index = 1; index < 10; index++){
      Cards.insert({
        number: index,
        color: index%2 === 0 ? 'black' : 'white',
        owner: Meteor.userId(),
        username: Meteor.user().username,
      });
    }
  },
  'cards.remove'(cardId) {
    check(cardId, String);
    Cards.remove(cardId);
  },
  'cards.removeAll'() {
    Cards.remove({});
  },
  'comparedCards.insert'(number, color) {
    ComparedCards.insert({
      number: number,
      color: color,
      owner: Meteor.userId(),
      username: Meteor.user().username,
    });
  },
  'comparedCards.removeAll'() {
    ComparedCards.remove({});
  },
});