Tasks= new Mongo.Collection('tasks');

Meteor.methods({
  createTask: function(text) {
    if (!Meteor.userId()) throw new Meteor.Error('not-authorized');

    Tasks.insert({
      text: text,
      createdAt: new Date(),
      userId: Meteor.user()._id
    });
  },
  deleteTask: function(taskId) {
    // TODO Check the user
      Tasks.remove(taskId);
  }
});


if (Meteor.isClient) {
  // counter starts at 0
    Session.setDefault('counter', 0);

    Template.ToDoList.helpers({
    counter: function () {
      return Session.get('counter');
    }
    });

    Template.ToDoList.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
    });

    Template.ToDoList.rendered = function() {
    this.$('.datepicker').datepicker();
    }
    
    
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
