ChatList = new Mongo.Collection('chat');
UserList = new Mongo.Collection('chatusers');

if (Meteor.isClient) {
	var scroll = function () {
		var element = document.getElementById("text");
		element.scrollTop = element.scrollHeight;
	}

	setInterval(function () {
		scroll();
		var userList = UserList.find().fetch();
		var timesFailed = 0;
		for (var i = 0; i < userList.length; i++) {
			if (userList[i].username != Meteor.user().username) {
				timesFailed++;
			}
		}
		if (timesFailed == userList.length) {
			var userObj = {"username": Meteor.user().username}
			UserList.insert(userObj);
		}
	}, 100);

	window.onbeforeunload = function (e) {
		Meteor.call("removeUser", Meteor.user().username);
	}

	//Helpers
	Template.body.helpers({
		"msgList": function() {
			return ChatList.find().fetch();
		}
	});
	
	Template.usernames.helpers({
		"nameList": function() {
			return UserList.find().fetch();
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
			ChatList.insert(msgObj);
			console.log("Sent message: " + msgObj.msg);
		}
	});

	Accounts.ui.config({
		passwordSignupFields: "USERNAME_ONLY"
	});
} 

if (Meteor.isServer) {
	Meteor.methods({
		"removeUser": function (name) {
			UserList.remove({ "username": { $eq: name } });
		}
	});
}