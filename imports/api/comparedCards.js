import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const ComparedCards = new Mongo.Collection('comparedCards');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('comparedCards', function comparedCardsPublication() {
    return ComparedCards.find();
  });
}


Meteor.methods({
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

