import { Rooms } from '../api/rooms.js';
import { Session } from 'meteor/session';
import './game.html';
import './card.js';



Template.game.events({
  'click .get-cards'() {
    Meteor.call('game.getAllCards', this._id);
  },
  'click .restart'() {
    Meteor.call('game.removeAllCards', this._id);
  },
  'click .start'() {
    Meteor.call('game.getAllCards', this._id);
    Meteor.call('game.clearScores', this._id);
    Meteor.call('game.inGame', this._id);
    Meteor.call('game.clearRound', this._id);
    Meteor.call('game.clearOrder', this._id);
    Meteor.call('game.pickNext', this._id);
    Meteor.call('game.clearComparedCards', this._id);
  },
  'click .quit-room'() {
    if(Rooms.findOne(this._id).participant === Meteor.userId()){
      Meteor.call('game.clearParticipant', this._id);
    } else if(Rooms.findOne(this._id).participant !== null){
      Meteor.call('game.updateOwner', this._id, Rooms.findOne(this._id).participant);
      Meteor.call('game.clearParticipant', this._id);
    } else {
      Meteor.call('rooms.remove', this._id);
    }
    Meteor.call('game.beforeGame', this._id);
    Router.go('/');
  }
});


Template.game.helpers({
  competitorCards() {
    let array = Rooms.findOne(this._id).participantCards;
    let userid = Rooms.findOne(this._id).participant;
    return createCardObj(array, userid, this._id);
  },
  myCards() {
    let array = Rooms.findOne(this._id).ownerCards;
    let userid = Rooms.findOne(this._id).owner;
    return createCardObj(array, userid, this._id);
  },
  submittedCards() {
    return Rooms.findOne(this._id).comparedCards;
  },
  beforeGame() {
    return Rooms.findOne(this._id).status === 'beforeGame';
  },
  inGame() {
    return Rooms.findOne(this._id).status === 'inGame';
  },
  afterGame() {
    return Rooms.findOne(this._id).status === 'afterGame';
  },
  ownerName() {
    return Meteor.users.findOne(Rooms.findOne(this._id).owner).username;
  },
  participantName() {
    return Meteor.users.findOne(Rooms.findOne(this._id).participant).username;
  },
  ownerScore() {
    return Rooms.findOne(this._id).ownerScore;
  },
  participantScore() {
    return Rooms.findOne(this._id).participantScore;
  },
  round() {
    return Rooms.findOne(this._id).round;
  },
  turn() {
    return Rooms.findOne(this._id).nextFirstHand;
  },
  equalScore() {
    return Rooms.findOne(this._id).ownerScore === Rooms.findOne(this._id).participantScore;
  },
  winner() {
    let winner = Rooms.findOne(this._id).ownerScore > Rooms.findOne(this._id).participantScore
     ? Rooms.findOne(this._id).owner : Rooms.findOne(this._id).participant;
    return Meteor.users.findOne(winner).username;
  },
  ownerCardsRecord() {
    let array = Rooms.findOne(this._id).ownerOrder;
    let userid = Rooms.findOne(this._id).owner;
    return createCardObj(array, userid, this._id);
  },
  participantCardsRecord() {
    let array = Rooms.findOne(this._id).participantOrder;
    let userid = Rooms.findOne(this._id).participant;
    return createCardObj(array, userid, this._id);
  },
  waitingParticipant() {
    return Rooms.findOne(this._id).participant === null;
  }
});

function createCardObj(array, userid, roomid) {
  return array.map(function(num) {
    let obj = {};
      obj.num = num;
      obj.userid = userid;
      obj.roomid = roomid;
      return obj;
  });
}


// Session.set('gameStatus', 'beforeGame');

// Template.game.helpers({
//   myName() {
//     return Meteor.user().username;
//   },
//   competitorName() {
//     if(Cards.findOne({'owner' : {$ne:Meteor.userId()}})){
//       return Cards.findOne({'owner' : {$ne:Meteor.userId()}}).username;
//     }
//   },
//   myScore() {
//     return Session.get('userScore');
//   },
//   competitorScore() {
//     return Session.get('competitorScore');
//   },
//   beforeGame() {
//     return Session.get('gameStatus') === 'beforeGame';
//   },
//   inGame() {
//     return Session.get('gameStatus') === 'inGame';
//   },
//   afterGame() {
//     return Session.get('gameStatus') === 'afterGame';
//   },
//   userHasNoCards() {
//     return Cards.findOne({'owner' : Meteor.userId()}) === undefined;
//   },
//   competitorHasNoCards() {
//     return Cards.findOne({'owner' : {$ne:Meteor.userId()}}) === undefined;
//   },
//   myCards() {
//     return Cards.find({'owner' : Meteor.userId()});
//   },
//   competitorCards() {
//     return Cards.find({'owner' : {$ne:Meteor.userId()}});
//   },
//   submittedCards() {
//     if (ComparedCards.find({}).count() === 2 && !Session.get('updated')) {
//       updateScore();
//     }
//     if(ComparedCards.find({}).count() !== 2){
//       Session.set('updated', false);
//     }
//     return ComparedCards.find({});
//   },
//   firstHand() {
//     return Session.get('nextFistHand');
//   },
//   roundNumber() {
//     return Session.get('round');
//   },
//   winner() {
//     return Session.get('winner');
//   }
// });



// function updateScore() {
//   var usersArray = ComparedCards.find({}).fetch();
//   var user = usersArray[0].owner === Meteor.userId() ? usersArray[0] : usersArray[1];
//   var competitor = usersArray[0].owner === Meteor.userId() ? usersArray[1] : usersArray[0];
//   if(user.number > competitor.number) {
//     var newUserScore = Session.get('userScore') + 1;
//     Session.set('userScore', newUserScore);
//     Session.set('nextFistHand', user.username);
//   }
//   if(user.number < competitor.number){
//     var newCompetitorScore = Session.get('competitorScore') + 1;
//     Session.set('competitorScore', newCompetitorScore);
//     Session.set('nextFistHand', competitor.username);
//   }
//   Session.set('updated', true);
//   Session.set('round', Session.get('round') + 1);
//   if(Session.get('round') === 10){
//     Session.set('gameStatus', 'afterGame');
//     if(Session.get('competitorScore') === Session.get('userScore')){
//       Session.set('winner', user.username + ' ' + competitor.username);
//     } else {
//       Session.set('winner', Session.get('userScore') > Session.get('competitorScore') ? user.username : competitor.username);
//     }
//   }
// }

// function pickFirstHand() {
//   Meteor.call('firstHand', function(err, response) {
//     Session.set('nextFistHand', response);
//   });
// }