import { Groups } from '../api/collection.js';


import '../ui/templates/ApplicationLayout.html';
import '../ui/templates/welcome.html';
import '../ui/templates/home.html';
import '../ui/templates/navbar.html';
import '../ui/templates/createNewGroupe.html';
import '../ui/templates/listOfGroups.html';
import '../ui/templates/groupe.html';
import '../ui/templates/adminInfoPanel.html';
import '../ui/templates/userPanel.html';
import '../ui/templates/adminControlPanel.html';
import '../ui/templates/addEvent.html';
import '../ui/templates/listOfUsers.html';





Meteor.subscribe('groups');


// Configuring router
Router.configure({
  layoutTemplate: 'ApplicationLayout'
});

// Landing page
Router.route('/', function () {
  this.render('welcome', {
    to:"main"
  });
});

//home page
Router.route('/home', function () {
  this.render('navbar', {
    to:"navbar"
  });
  this.render('home', {
    to:"main"
  });
});

//Groupe page
Router.route('/groups/:_id', function () {
  this.render('navbar', {
    to:"navbar"
  });
  this.render('groupe', {
    to:"main", 
    data:function(){
      // Set current group id into Session. I made it to be able to get group id  further.
      Session.set("idgroupe", this.params._id);

      return Groups.findOne({_id:this.params._id});
    }
  });
});