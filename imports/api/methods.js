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


	'pizzaDay.user.confirm': function(thisGroupeId, thisUser){
		Groups.update(
			{ _id: thisGroupeId, "user.id":thisUser}, 
			{$set:{"user.$.confirm": true}}
		);
	},


	'pizzaDay.user.orderDish': function(thisGroupeId, thisUser, self){
		
    Groups.update({ _id: thisGroupeId, "user.id":thisUser},{ 
      $push:{
              "user.$.order": self.dish,
              "user.$.price": self.price
            }
		});

    Groups.update({ _id: thisGroupeId},{ 
      $push:{
              totalOrder: {
                            totalorder: self.dish,
                            totalprice: self.price
                          }
            }
    });
	},
		
		

	// Creating new groupe
	'groupe.createNew': function(groupName, creator){
		let user = ListOfUsers.findOne({"id": creator});
		Groups.insert({ 
			groupName: groupName,
			creator: creator,
			eventDate: "",
			isEvent: false,
			eventStatus: "wating for event...",
			// add admin to userslist instantly
			user: new Array({	
												"id": creator,
												"username": user.username,
												"email": user.email,
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

	'groupe.remove':function(self){
		Groups.remove(self);
		//Groups.update({ $pull:{_id: thisGroupeId}});
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
  	let user = ListOfUsers.findOne({"id": userId});                    
    let userInfo =	{
				    					"id": userId,
				    					"username": user.username,
											"email": user.email,
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

  // Remove user from groupe
  'groupe.user.remove':function(thisGroupeId, userId){  	
		Groups.update({ _id: thisGroupeId},{
				$pull:{
					user:{
						id: userId
					}
				}
			}
		);
  },

	
	// Add dish to menu of groupe
	'menu.dish.add':function( thisGroupeId, dishname, price){
		Groups.update({ _id: thisGroupeId },{
      $push:{
              menu: {
                     dish:dishname, 
                     price:price  
                    }
            }
    });  
	},
	
});