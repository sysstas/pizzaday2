import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Groups } from '../../api/collection.js';




// first level


// second level
Meteor.subscribe('groups');

// third level


Template.listOfGroups.helpers({
  groups:function(){      
    
     return Groups.find({});
  }  
});
