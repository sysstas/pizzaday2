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
  /*user:function(){

    let freeUsers = [];
    let allUsers =  ListOfUsers.find();
    let thisGroupeId = Session.get("idgroupe");

    for (var i = allUsers.length - 1; i >= 0; i--) {
      Meteor.call('groupe.user.isIn', thisGroupeId, allUsers[i].id, function(error, result){
        if(error){
          console.log(error.reason);
          return;
        }
        if (result){
          if (result === 11)  {
            // If user is not in the groupe - adding it to the groupe            
            freeUsers.push(allUsers[i]);
          }
        }
      });
      
    }


    return  freeUsers;
  }*/
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
    var Users = new Array();
    if (this.user) {
      for (var i = this.user.length - 1; i >= 0; i--) {
      Users[i] = ListOfUsers.findOne({id: this.user[i].id}).username;
      };
    };    
    return Users;
  },
});





///////////////////// Helper Functions ////////////////////////

var isAdmin = function(){    
							  if ( Meteor.userId() == this.creator ) {							  	
							    return true;
							  }
							  else return false
							};

