// first level


// second level


// third level


Template.listGroupe.helpers({
  groupeNames:function(){      
    return Groups.find({});
  },
  myGroupe:function(){
    var isInGroupe = false;
   if ( Meteor.userId() == this.creator ) {
      return true;
    }
    else{
      for (var i = this.user.length - 1; i >= 0; i--) 
              {
                 if (this.user[i] == Meteor.userId()) {
                  return true;
                 }
                 else 
                  return false;   
              };
    }
  },
  isAdmin:function(){    
    if ( Meteor.userId() == this.creator ) {
      return true;
    }
    else return false;
  } 
});