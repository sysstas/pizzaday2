import { Meteor } from 'meteor/meteor';

import '../imports/lib/router.js';
import '../imports/api/methods.js';




Template.welcome.events({
  "click .hiClass": function(event) {
    

    Meteor.call('first');
    
    
  }
});