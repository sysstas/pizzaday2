// first level
import '../ui/templates/ApplicationLayout.html';
import '../ui/templates/welcome.html';

// second level
import '../ui/templates/home/home.html';
import '../ui/templates/navbar/navbar.html';

// third level
import '../ui/templates/home/commonInterface/uiControls.html';
import '../ui/templates/home/commonInterface/listOfGroups.html';

// fourth level


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
      return Groups.findOne({_id:this.params._id});
    }
  });
});