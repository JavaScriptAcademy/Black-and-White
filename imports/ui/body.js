import { Template } from 'meteor/templating';
import { Cards } from '../api/cards.js';
import { Meteor } from 'meteor/meteor';
import { ComparedCards } from '../api/comparedCards.js';
import { Session } from 'meteor/session';

import './body.html';
import './card.js';

Template.body.onCreated(function bodyOnCreated() {
  Meteor.subscribe('cards');
  Meteor.subscribe('comparedCards');
});


Template.body.events({
  'click .get-cards'() {
    Meteor.call('cards.insertAll');
    Session.set('gameStatus', 'beforeGame');
  },
  'click .restart'() {
    Meteor.call('cards.removeAll');
    Session.set('gameStatus', 'beforeGame');
  },
  'click .reset-middle'() {
    Meteor.call('comparedCards.removeAll');
  },
  'click .start'() {
    gameStart();
    pickFirstHand();
  },
});

Session.set('gameStatus', 'beforeGame');

Template.body.helpers({
  myName() {
    return Meteor.user().username;
  },
  competitorName() {
    if(Cards.findOne({'owner' : {$ne:Meteor.userId()}})){
      return Cards.findOne({'owner' : {$ne:Meteor.userId()}}).username;
    }
  },
  myScore() {
    return Session.get('userScore');
  },
  competitorScore() {
    return Session.get('competitorScore');
  },
  beforeGame() {
    return Session.get('gameStatus') === 'beforeGame';
  },
  inGame() {
    return Session.get('gameStatus') === 'inGame';
  },
  afterGame() {
    return Session.get('gameStatus') === 'afterGame';
  },
  userHasNoCards() {
    return Cards.findOne({'owner' : Meteor.userId()}) === undefined;
  },
  competitorHasNoCards() {
    return Cards.findOne({'owner' : {$ne:Meteor.userId()}}) === undefined;
  },
  myCards() {
    return Cards.find({'owner' : Meteor.userId()});
  },
  competitorCards() {
    return Cards.find({'owner' : {$ne:Meteor.userId()}});
  },
  submittedCards() {
    if (ComparedCards.find({}).count() === 2 && !Session.get('updated')) {
      updateScore();
    }
    if(ComparedCards.find({}).count() !== 2){
      Session.set('updated', false);
    }
    return ComparedCards.find({});
  },
  firstHand() {
    return Session.get('nextFistHand');
  },
  roundNumber() {
    return Session.get('round');
  },
  winner() {
    return Session.get('winner');
  }
});

function gameStart() {
  Session.set('userScore', 0);
  Session.set('competitorScore', 0);
  Session.set('gameStatus', 'inGame');
  Session.set('round', 1);
}

function updateScore() {
  var usersArray = ComparedCards.find({}).fetch();
  var user = usersArray[0].owner === Meteor.userId() ? usersArray[0] : usersArray[1];
  var competitor = usersArray[0].owner === Meteor.userId() ? usersArray[1] : usersArray[0];
  if(user.number > competitor.number) {
    var newUserScore = Session.get('userScore') + 1;
    Session.set('userScore', newUserScore);
    Session.set('nextFistHand', user.username);
  }
  if(user.number < competitor.number){
    var newCompetitorScore = Session.get('competitorScore') + 1;
    Session.set('competitorScore', newCompetitorScore);
    Session.set('nextFistHand', competitor.username);
  }
  Session.set('updated', true);
  Session.set('round', Session.get('round') + 1);
  if(Session.get('round') === 10){
    Session.set('gameStatus', 'afterGame');
    if(Session.get('competitorScore') === Session.get('userScore')){
      Session.set('winner', user.username + ' ' + competitor.username);
    } else {
      Session.set('winner', Session.get('userScore') > Session.get('competitorScore') ? user.username : competitor.username);
    }
  }
}

function pickFirstHand() {
  Meteor.call('firstHand', function(err, response) {
    Session.set('nextFistHand', response);
  });
}


///test


