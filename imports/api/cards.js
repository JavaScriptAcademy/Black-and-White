import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { ComparedCards } from '../api/comparedCards.js';

export const Cards = new Mongo.Collection('cards');

var array = [1,2,3,4,5,6,7,8,9];
Meteor.methods({
  'cards.insertAll'() {
    shuffle(array);
    for(var index = 0; index < array.length; index++){
      Cards.insert({
        number: array[index],
        color: array[index]%2 === 0 ? 'black' : 'white',
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
  'firstHand'() {
    return getRandomUser();
  }
});

function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i -= 1) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}

function getRandomUser() {
  var num = Math.random();
  var users = Meteor.users.find().fetch();
  return num > 0.5 ? users[0].username : users[1].username;
}