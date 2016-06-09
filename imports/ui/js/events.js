import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Mongo } from 'meteor/mongo';
import { Groups } from '../../api/collection.js';



Template.createNewGroupe.events({
  "submit .createNewGroupe": function(event) {
    event.preventDefault();

    let groupName = event.target.text.value;
    let creator = Meteor.userId();
    
    Meteor.call('groupe.createNew', groupName, creator);
    
    // Clear form
    event.target.text.value = "";  
  }
});


Template.addEvent.events({ 
//// Adding new event //// 
  "submit .addEvent-form":function(event){
    event.preventDefault();
    let eventDate = event.target.eventDate.value;
    let thisGroupeId = Session.get("idgroupe");
        
    
    Meteor.call('pizzaDay.createNewEvent', eventDate, thisGroupeId);
    
    // Clear form
    event.target.eventDate.value = "";
  }
});  


Template.adminControlPanel.events({
  // Changing event status to "Buying" 
	"click .setBuyingStatus": function () {		
		let thisGroupeId = Session.get("idgroupe");
		Meteor.call('pizzaDay.changeStatusToBuying', thisGroupeId); 
	},

  // End of event 
  "click .setEventEnd": function () {
  	let thisGroupeId = Session.get("idgroupe");
	 Meteor.call('pizzaDay.endEvent', thisGroupeId);
	},

  // Remove user from groupe
  "click .removeUser":function () {
    let thisGroupeId = Session.get("idgroupe");             
    Meteor.call('groupe.user.remove', thisGroupeId, this.id);
  },
});


Template.listOfUsers.events({
  "click .addToGroupe": function () {    
    var thisGroupeId = Session.get("idgroupe");
    var  userId = this.id; 
    /// Searching if user in the groupe
    Meteor.call('groupe.user.isIn', thisGroupeId, userId, function(error, result){
        if(error){
          console.log(error.reason);
          return;
        }
        if (result){
          if (result === 11)  {
            // If user is not in the groupe - adding it to the groupe            
            Meteor.call('groupe.user.addNew', thisGroupeId, userId);
          }
        }          
      }
    );
  },  
});


Template.addDishToMenu.events({
  "click .js-toggle-form":function(event){
    $("#addDishToMenu").toggle('slow');
  }, 

  "submit .js-form":function(event){
    
    event.preventDefault();
    
    let thisGroupeId = Session.get("idgroupe");
    let dishname = event.target.dishname.value;
    let price = event.target.price.value;         
    
    Meteor.call('menu.dish.add', thisGroupeId, dishname, price);

    event.target.dishname.value = '';
    event.target.price.value = '';

    $("#addDishToMenu").toggle('hide');  
    return false;
  }
});


Template.listOfGroups.events({
  "click .removeGroupe": function () {    
    var thisGroupeId = Session.get("idgroupe");    
    Meteor.call('groupe.remove', this._id); 
  },  
}); 


Template.Pizzaday.events({
  "click .confirm": function (){
    let thisGroupeId = Session.get("idgroupe");
    let thisUser = Meteor.userId();
    
    Meteor.call('pizzaDay.user.confirm', thisGroupeId, thisUser);
  },

  "click .orderDish": function () { 
    let thisGroupeId = Session.get("idgroupe");
    let thisUser = Meteor.userId();
    let self = this;

    Meteor.call('pizzaDay.user.orderDish', thisGroupeId, thisUser, self);    
  },

}); 

    