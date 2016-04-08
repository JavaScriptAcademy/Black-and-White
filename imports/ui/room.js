import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './room.html';

Template.room.helper({
  creater() {
    return Meteor.users.find(this.owner).username;
  }
});

