import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

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


    