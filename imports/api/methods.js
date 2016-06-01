import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Groups } from '../api/collection.js';
import { ListOfUsers } from '../api/collection.js';



Meteor.methods({

	
	// Creating new Pizzaday event
	'pizzaDay.createNewEvent': function(eventDate, thisGroupeId){
		Groups.update({ _id: thisGroupeId },{ 
      $set: { 
              eventDate: eventDate,
              isEvent: true,
              eventStatus: "Event announced"
            }
    });
	},


	// Changing Event status to "Buying"
	'pizzaDay.changeStatusToBuying': function(thisGroupeId){
		Groups.update({ _id: thisGroupeId },{  
	      $set: { 
	              eventStatus: "Buying food...",         
	              buyingStatus: true
	            }
	   });
	},

	/// Finishing the event
	'pizzaDay.endEvent': function(thisGroupeId){
		Groups.update({ _id: thisGroupeId },{ 
	    $set: { 
	            eventStatus: "wating for event...",
	            isEvent: false,
	            totalOrder: [],
	            totalDISHES: [],
	            buyingStatus: false
	          }
	  });	
	},


	// Creating new groupe
	'groupe.createNew': function(groupName, creator){
		Groups.insert({ 
			groupName: groupName,
			creator: creator,
			eventDate: "",
			isEvent: false,
			eventStatus: "wating for event...",
			// add admin to userslist instantly
			user: new Array({
												"id": creator,
					    					"order": [],
										    "price": [],
										    "confirm": false,
										    "complete": false,
										    "emailText": ""
											}),
			menu: new Array(),
			totalOrder: new Array(),
			totalDISHES: new Array(),
			buyingStatus: false,
			emailTextConfirmOrder: " With love, your Pizzaday!! "
    	});
	},


	///// checking if is user in the groupe
	'groupe.user.isIn':function(thisGroupeId, userId){
		let thisGroupe = Groups.findOne({ _id: thisGroupeId});

		for (var i = thisGroupe.user.length - 1; i >= 0; i--){
      if (thisGroupe.user[i].id === userId){
        return;
      }
    }
    // returning a number but not "false" because of Merteor issues
    return 11;
  },

		
	/// Adding user to the groupe
  'groupe.user.addNew':function(thisGroupeId, userId){  	
  	//// Adding user id to this groupe                     
    let userInfo =	{
				    					"id": userId,
				    					"order": [],
									    "price": [],
									    "confirm": false,
									    "complete": false,
									    "emailText": ""
			    					};
    Groups.update({ _id: thisGroupeId},{ 
      $push:{ 
            	user: userInfo 
            }
    });   
  },
		


	
});