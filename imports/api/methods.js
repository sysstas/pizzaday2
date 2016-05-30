import { Meteor } from 'meteor/meteor';
//import { Session } from 'meteor/session';
import { Mongo } from 'meteor/mongo';
import { Groups } from '../api/collection.js';




Meteor.methods({

	// Creating new groupe
	'groupe.createNew': function(groupName, creator){
		Groups.insert({ 
			groupName: groupName,
			creator: creator,
			eventDate: "",
			isEvent: false,
			eventStatus: "wating for event...",
			user: new Array(),
			menu: new Array(),
			totalOrder: new Array(),
			totalDISHES: new Array(),
			buyingStatus: false,
			emailTextConfirmOrder: " With love, your Pizzaday!! "
    	});
	},
	

	// Creating new Pizzaday event
	'pizzaDay.createNewEvent': function(eventDate, thisGroupeId){
		Groups.update({ _id: thisGroupeId },{ 
      $set: { 
              eventdate: eventDate,
              isevent: true,
              eventstatus: "Event announced"
            }
    });
	},



	
});