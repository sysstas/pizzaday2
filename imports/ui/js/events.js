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
	"click .setBuyingStatus": function () { 
		//// Changing event status to "Buying" 
		let thisGroupeId = Session.get("idgroupe");
		
		Meteor.call('pizzaDay.changeStatusToBuying', thisGroupeId); 
	},

  "click .setEventEnd": function () {
  	//// End of event ////  
  	let thisGroupeId = Session.get("idgroupe");            
	  
	  Meteor.call('pizzaDay.endEvent', thisGroupeId);
	  
	  /*var Users = Groups.findOne({ _id: Session.get("idgroupe") }).user;               
	  for (var i = Users.length - 1; i >= 0; i--) {
	    var id =Userlist.findOne({id: Users[i]})._id;
	    
	    Userlist.update({_id: id},{   //// Set Event stats to empty ////   
	      $set: { 
	            confirm: false, 
	            complete: false,
	            order: [],
	            price: []
	          }
	    });
	  };    */
	},

    
    /*var totalArray = Groups.findOne({_id:Session.get("idgroupe")}).totalOrder; ///////////////
    var array_elements = new Array();                                                       //
    for (var i = totalArray.length - 1; i >= 0; i--) {                                      //
      array_elements[i] = totalArray[i].totalorder                                          //
    };                                                                                      //
    array_elements.sort();                                                                  //
    var current = null;                                                                     //
    var cnt = 0;                                                                            //
    for (var i = array_elements.length -1 ;  i >= 0; i--) {                                 //
      if (array_elements[i] != current) {                                                   //
        if (cnt > 0) {                                                                      //
          Groups.update({ _id: Session.get("idgroupe") },{                                  //
            $push: { totalDISHES: current + ' : ' + cnt}                                    //
          });                                                                               //
        }                             ////////////////////////////////////////////////////////
        current = array_elements[i];  //// Here I forming user friendly list from array///////
        cnt = 1;                      ////////////////////////////////////////////////////////
      } else {                                                                              //
        cnt++;                                                                              //
      }                                                                                     //
    }                                                                                       //
    if (cnt > 0) {                                                                          //
      Groups.update({ _id: Session.get("idgroupe") },{                                      //
        $push: { totalDISHES: current + ' : ' + cnt}                                        //          
      });                                                                                   //  
    }   //////////////////////////////////////////////////////////////////////////////////////
  },*/
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


    