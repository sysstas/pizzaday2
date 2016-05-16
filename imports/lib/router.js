// first level
import '../ui/templates/ApplicationLayout.html';
import '../ui/templates/welcome.html';

// second level
import '../ui/templates/home/home.html';
import '../ui/templates/navbar/navbar.html';

// third level
import '../ui/templates/home/commonInterface/uiControls.html';
import '../ui/templates/home/commonInterface/listGroups.html';


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