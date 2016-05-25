import { Meteor } from 'meteor/meteor';
import { Groups } from '../imports/api/collection.js';

import '../imports/api/methods.js';


Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.publish('groups', function groupsPublication(){
		return Groups.find();
});