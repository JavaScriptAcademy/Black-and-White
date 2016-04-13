import { Rooms } from '../api/rooms.js';


Meteor.methods({
  'game.updateParticipant'(roomId, participantId) {
    Rooms.update({_id: roomId}, {$set: {participant: participantId}});
  },
  'game.getAllCards'(roomId) {
    let cards1 = getCards();
    let cards2 = getCards();
    Rooms.update({_id: roomId}, {$set: {ownerCards: cards1}});
    Rooms.update({_id: roomId}, {$set: {participantCards: cards2}});
  },
  'game.removeAllCards'(roomId) {
    Rooms.update({_id: roomId}, {$set: {ownerCards: []}});
    Rooms.update({_id: roomId}, {$set: {participantCards: []}});
  },
  'game.clearScores'(roomId) {
    Rooms.update({_id: roomId}, {$set: {ownerScore: 0}});
    Rooms.update({_id: roomId}, {$set: {participantScore: 0}});
  },
  'game.inGame'(roomId) {
    Rooms.update({_id: roomId}, {$set: {status: 'inGame'}});
  },
  'game.beforeGame'(roomId) {
    Rooms.update({_id: roomId}, {$set: {status: 'beforeGame'}});
  },
  'game.afterGame'(roomId) {
    Rooms.update({_id: roomId}, {$set: {status: 'afterGame'}});
  },
  'game.clearRound'(roomId) {
    Rooms.update({_id: roomId}, {$set: {round: 1}});
  },
  'game.clearOrder'(roomId) {
    Rooms.update({_id: roomId}, {$set: {ownerOrder: []}});
    Rooms.update({_id: roomId}, {$set: {participantOrder: []}});
  },
  'game.pickNext'(roomId) {
    let owner = Meteor.users.findOne(Rooms.findOne(roomId).owner).username;
    let participant = Meteor.users.findOne(Rooms.findOne(roomId).participant).username;
    let random = Math.random();
    Rooms.update({_id: roomId}, {$set: {nextFirstHand: random > 0.5 ? owner : participant}});
  },
  'game.updateNext'(userid, cardObj) {
    let username = Meteor.users.findOne(userid).username;
    Rooms.update({_id: cardObj.roomid}, {$set: {nextFirstHand: username}});
  },
  'game.clearComparedCards'(roomId) {
    Rooms.update({_id: roomId}, {$set: {comparedCards: []}});
  },
  'game.addComparedCards'(roomId, cardObj) {
    let comparedCards = Rooms.findOne(cardObj.roomid).comparedCards;
    comparedCards.push(cardObj);
    Rooms.update({_id: roomId}, {$set: {comparedCards: comparedCards}});
  },
  'game.increaseRound'(roomId) {
    Rooms.update({_id: roomId}, {$inc: {round: 1}});
  },
  'game.updateOwnerScore'(roomId) {
    Rooms.update({_id: roomId}, {$inc: {ownerScore: 1}});
  },
  'game.updateParticipantScore'(roomId) {
    Rooms.update({_id: roomId}, {$inc: {participantScore: 1}});
  },
  'game.clearParticipant'(roomId) {
    Rooms.update({_id: roomId}, {$set: {participant: null}});
  },
  'game.updateOwner'(roomId, newOwner) {
    Rooms.update({_id: roomId}, {$set: {owner: newOwner}});
  },
});

function getCards() {
  let cards = [1,2,3,4,5,6,7,8,9];
  shuffle(cards);
  return cards;
}

function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i -= 1) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}