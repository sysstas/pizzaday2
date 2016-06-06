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


Template.userPanel.helpers({
  menu:function(){       
    return  Groups.findOne({ _id: Session.get("idgroupe") }).menu; 
  },
});
  
  
Template.Pizzaday.helpers({  
  menu:function(){       
    return  Groups.findOne({ _id: Session.get("idgroupe") }).menu; 
  },
  orders:function(){
    return Userlist.findOne({id: Meteor.userId()}).order; 
  }, 
  total:function(){
    var arr = Userlist.findOne({id: Meteor.userId()}).price
    var count = 0;
    for(var i = 0; i < arr.length; i++){
        count = count + parseFloat(arr[i]);
    };
    return count;
  },
  confirm: function(){    
    return Userlist.findOne({id: Meteor.userId()}).confirm;    
  },  
  complete: function(){    
    return Userlist.findOne({id: Meteor.userId()}).complete;    
  },
  buyingStatus: function(){
    return  Groups.findOne({ _id: Session.get("idgroupe") }).buyingStatus;
  }
});




///////////////////// Helper Functions ////////////////////////

var isAdmin = function(){    
							  if ( Meteor.userId() == this.creator ) {							  	
							    return true;
							  }
							  else return false
							};

