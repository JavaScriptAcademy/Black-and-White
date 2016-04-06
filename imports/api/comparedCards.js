import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const ComparedCards = new Mongo.Collection('comparedCards');


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

