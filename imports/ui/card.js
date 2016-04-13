import { Rooms } from '../api/rooms.js';
import { Session } from 'meteor/session';



import './card.html';

Template.card.helpers({
  isOwner() {
    return this.userid === Meteor.userId() || Rooms.findOne(this.roomid).status === 'afterGame';
  },
  isEven() {
    return this.num%2 === 0;
  },
});

Template.card.events({
  'click .card'() {
    if(this.userid === Meteor.userId()
      && Rooms.findOne(this.roomid).nextFirstHand === Meteor.user().username){
      let cardObj = this;
      Meteor.call('cards.remove', this);
      Meteor.call('cards.addInHistory', this, function(error, result) {
        updateNextHand(cardObj);

      });
      updateComparedCards(cardObj);
    }
  }
});

function updateComparedCards(cardObj) {
  if(Rooms.findOne(cardObj.roomid).comparedCards.length === 2){
    Meteor.call('game.clearComparedCards', cardObj.roomid);
  }
  Meteor.call('game.addComparedCards', cardObj.roomid, cardObj, function(error, result) {
    updateRound(cardObj);
    updateScore(cardObj);
  });
}

function updateRound(cardObj) {
  let comparedCardsNum = Rooms.findOne(cardObj.roomid).comparedCards.length;
  if(comparedCardsNum === 2) {
    Meteor.call('game.increaseRound', cardObj.roomid, function() {
      if(Rooms.findOne(cardObj.roomid).round === 10){
        Meteor.call('game.afterGame', cardObj.roomid);
      }
    });
  }
}

function updateScore(cardObj) {
  let comparedCardsNum = Rooms.findOne(cardObj.roomid).comparedCards.length;
  if(comparedCardsNum === 2) {
    let comparedCardsOne = Rooms.findOne(cardObj.roomid).comparedCards[0];
    let comparedCardsTwo = Rooms.findOne(cardObj.roomid).comparedCards[1];
    if(comparedCardsOne.num !== comparedCardsTwo.num){
      let winner = comparedCardsOne.num > comparedCardsTwo.num
      ? comparedCardsOne.userid : comparedCardsTwo.userid;
      winner === Rooms.findOne(cardObj.roomid).owner
      ? Meteor.call('game.updateOwnerScore', cardObj.roomid)
      : Meteor.call('game.updateParticipantScore', cardObj.roomid)
    }

  }

}

function updateNextHand(cardObj) {
  let roomObj = Rooms.findOne(cardObj.roomid);
  let ownerOrder = Rooms.findOne(cardObj.roomid).ownerOrder;
  let participantOrder = Rooms.findOne(cardObj.roomid).participantOrder;
  let next = null;
  if(ownerOrder.length === participantOrder.length) {
    let length = ownerOrder.length-1;
    next = ownerOrder[length] > participantOrder[length]
    ? roomObj.owner : roomObj.participant;
  } else if(ownerOrder.length < participantOrder.length) {
    next = roomObj.owner;
  } else {
    next = roomObj.participant;
  }
  Meteor.call('game.updateNext', next, cardObj);
}
