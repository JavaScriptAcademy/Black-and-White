import './layout.html';

import './home.js';
import './game.js';

Template.ApplicationLayout.onCreated(function bodyOnCreated() {
  Meteor.subscribe('cards');
  Meteor.subscribe('comparedCards');
  Meteor.subscribe('rooms');
  Meteor.subscribe('users');
});
