import { Meteor } from 'meteor/meteor';
import { Groups } from '../imports/api/collection.js';
import { Userlist } from '../imports/api/collection.js';

import '../imports/api/methods.js';


Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.publish('groups', function groupsPublication(){
		return Groups.find();
});

Meteor.publish('users', function usersPublication(){
		return Userlist.find();
});
// Here I fix difference between acconts-google and accounts-ui ways of saving username.
Accounts.onCreateUser(function(options, user) {
  
  if (options.username) {     
    Userlist.insert({
    id: user._id,    
    username: options.username,
    groups: [],
    order: [],
    price: [],
    confirm: false,
    complete: false,
    email: options.email,
    emailText: ""
    });
  };
  if (!options.username) {
    Userlist.insert({
    id: user._id,    
    username: user.services.google.name,
    groups: [],
    order: [],
    price: [],
    confirm: false,
    complete: false,
    email: user.services.google.email,
    emailText: ""
    });
  };
  
  if (options.profile)
    user.profile = options.profile;
  return user;
}); 