import { Meteor } from 'meteor/meteor';
import { Groups } from '../imports/api/collection.js';
import { ListOfUsers } from '../imports/api/collection.js';

import '../imports/api/methods.js';


Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.publish('groups', function groupsPublication(){
		return Groups.find();
});

Meteor.publish('users', function usersPublication(){
		return ListOfUsers.find();
});
// Here I fix difference between acconts-google and accounts-ui ways of saving username.
Accounts.onCreateUser(function(options, user) {
  
  if (options.username) {     
    ListOfUsers.insert({
      id: user._id,    
      username: options.username,
      email: options.email,
    });
  };
  if (!options.username) {
    ListOfUsers.insert({
      id: user._id,    
      username: user.services.google.name,
      email: user.services.google.email,      
    });
  };
  
  if (options.profile)
    user.profile = options.profile;
  return user;
}); 