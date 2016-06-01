import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Groups } from '../../api/collection.js';
import { ListOfUsers } from '../../api/collection.js';


Meteor.subscribe('groups');
Meteor.subscribe('users');


Template.listOfGroups.helpers({
  groups:function(){ 
     return Groups.find({});
  }  
});


Template.listOfUsers.helpers({  
  user:function(){
    return ListOfUsers.find();
  },
});


Template.adminControlPanel.helpers({
	isAdmin:function(){ 
		let self = this;   
    return isAdmin.call(self);
  },

  usersInGroupe:function(){  
    return this.user;
  },
});





///////////////////// Helper Functions ////////////////////////

var isAdmin = function(){    
							  if ( Meteor.userId() == this.creator ) {							  	
							    return true;
							  }
							  else return false
							};

