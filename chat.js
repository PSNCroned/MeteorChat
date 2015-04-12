ChatList = new Mongo.Collection('chat');
UserList = new Mongo.Collection('chatusers');


if (Meteor.isClient) {
	Template.body.helpers({
		"msgList": function() {
			return [{"msg": "test"},{"msg": "test"},{"msg": "test"}];
		}
	});
	
	Template.usernames.helpers({
		"nameList": function() {
			return Meteor.users.find().fetch();
		}
	});
} 

if (Meteor.isServer) {
	
}