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


Template.Pizzaday.events({
  "click .confirm": function (event){
    

    let a = Groups.find({_id:"e9sc7ogDp8pwY2uSX","user.id":"Sa8hFhaMHYxFzDmkd"});
    let b = a.fetch();

    console.log(b);
    /*Meteor.call('pizzaDay.user.confirm', thisGroupeId, thisUser,function(error, result){
        if(error){
          console.log(error.reason);
          return;
        }
        if (result){
          if (result === 11)  {
            // If user is not in the groupe - adding it to the groupe            
            console.log("result" +result);
          }
        }
    });*/

    
    /*Userlist.update({_id: thisUser._id},{ 
      $set: { confirm: true }
    });*/
  },
  /*
  "click .order": function (event) { 
    var thisUser = Userlist.findOne({id: Meteor.userId()});               
    Userlist.update({_id: thisUser._id},{ 
      $push:{
              order: this.dish,
              price: this.price
            }
    });
    Groups.update({ _id: Session.get("idgroupe") },{ 
      $push:{
              totalOrder: {
                            totalorder: this.dish,
                            totalprice: this.price
                          }
            }
    });
  },
  
  "click .complete": function (event){
    var thisgroupe = Groups.findOne({_id:Session.get("idgroupe")});
    var thisUser = Userlist.findOne({id: Meteor.userId()});
    var AdminId = thisgroupe.creator;
    var AdminEmail = Userlist.findOne({id: AdminId }).email;
    var UserEmail = thisUser.email;
    var arr = thisUser.price;          
      var array_elements = thisUser.order;                   ///////////////////////////////////
      var friendlyOrder = new Array();                                                        //
      array_elements.sort();                                                                  //
      var current = null;                                                                     //
      var cnt = 0;                                                                            //
      for (var i = array_elements.length -1 ;  i >= 0; i--) {                                 //
        if (array_elements[i] != current) {                                                   //
          if (cnt > 0) {                                                                      //  
                   friendlyOrder.push(current + ' : ' + cnt);                                 //
                                                                                              //
          }                             ////////////////////////////////////////////////////////
          current = array_elements[i];  //// Here I forming user friendly list from array///////
          cnt = 1;                      ////////////////////////////////////////////////////////
        } else {                                                                              //
          cnt++;                                                                              //
        }                                                                                     //
      }                                                                                       //
      if (cnt > 0) {                                                                          //
        friendlyOrder.push(current + ' : ' + cnt);                                            //  
      }   //////////////////////////////////////////////////////////////////////////////////////

    var count = 0;
    for(var i = 0; i < arr.length; i++){
        count = count + parseFloat(arr[i]);
    };
    var EmalText = "You order this:\n" + friendlyOrder + "\n You should give to admin: " + count +" $ \n" + thisgroupe.emailTextConfirmOrder;
    Userlist.update({_id: thisUser._id},{ 
      $set: { complete: true }
    });

    Meteor.call('sendEmail',
            UserEmail,
            AdminEmail,            
            "Your Pizzaday order",
            EmalText);
  }*/
}); 

    