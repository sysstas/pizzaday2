import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';


// first level


// second level


// third level
Template.uiControls.events({
  "submit .createNewGroupe": function(event) {
    event.preventDefault();

    let groupName = event.target.text.value;
    let creator = Meteor.userId();
    
    Meteor.call('groupe.createNew', groupName, creator);
    
    // Clear form
    event.target.text.value = "";  
  }
});