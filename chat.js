ChatList = new Mongo.Collection('chat');
UserList = new Mongo.Collection('chatusers');

if (Meteor.isClient) {
	var scroll = function () {
		var element = document.getElementById("text");
		element.scrollTop = element.scrollHeight;
	}

	setInterval(function () {
		scroll();
	}, 100);

	//Helpers
	Template.body.helpers({
		"msgList": function() {
			return ChatList.find().fetch();
		}
	});
	
	Template.usernames.helpers({
		"nameList": function() {
			return Meteor.users.find().fetch();
		}
	});

	//Events
	Template.body.events({
		"submit #msgForm": function (event, form) {
			event.preventDefault();
			var msg = form.find("#msgText").value;
			var sender = Meteor.user().username;
			var msgObj = {"sender": sender, "msg": msg};
			form.find("#msgText").value = "";
			console.log("Sent message: " + msgObj.msg);
			ChatList.insert(msgObj);
		}
	});

	Accounts.ui.config({
		passwordSignupFields: "USERNAME_ONLY"
	});
} 

if (Meteor.isServer) {
	
}