import { Rooms } from '../api/rooms.js';

Meteor.methods({
  'cards.remove'(cardObj) {
    let roomObj = Rooms.findOne(cardObj.roomid);
    if(roomObj.owner === cardObj.userid){
      let index = roomObj.ownerCards.indexOf(cardObj.num);
      roomObj.ownerCards.splice(index, 1);
      let array = roomObj.ownerCards;
      Rooms.update({_id: cardObj.roomid}, {$set: {ownerCards: array}});
    } else {
      let index = roomObj.participantCards.indexOf(cardObj.num);
      roomObj.participantCards.splice(index, 1);
      let array = roomObj.participantCards;
      Rooms.update({_id: cardObj.roomid}, {$set: {participantCards: array}});
    }
  },
  'cards.addInHistory'(cardObj) {
    let roomObj = Rooms.findOne(cardObj.roomid);
    if(roomObj.owner === cardObj.userid){
      roomObj.ownerOrder.push(cardObj.num);
      Rooms.update({_id: cardObj.roomid}, {$set: {ownerOrder: roomObj.ownerOrder}});
    } else {
      roomObj.participantOrder.push(cardObj.num);
      Rooms.update({_id: cardObj.roomid}, {$set: {participantOrder: roomObj.participantOrder}});
    }
  }
});
