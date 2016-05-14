import '../ui/templates/ApplicationLayout.html';
import '../ui/templates/welcome.html';
import '../ui/templates/home.html';
import '../ui/templates/navbar.html';


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