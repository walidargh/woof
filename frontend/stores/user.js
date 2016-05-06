var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var UserConstants = require('../constants/UserConstants');

var UserStore = new Store(AppDispatcher);
var myStorage = localStorage;
var _currentUser =  JSON.parse(myStorage.getItem("currentUser"));
var _authErrors = [];

UserStore.currentUser = function () {
		debugger
		return _currentUser;
};

UserStore.errors = function () {
	return _authErrors;
};

var login = function(user) {
	debugger
	_currentUser = user;
	_authErrors = [];
	myStorage.setItem("currentUser", JSON.stringify(user));
	UserStore.__emitChange();
};

var logout = function () {
	_currentUser = null;
	_authErrors = [];
	debugger
	myStorage.removeItem("currentUser");
	UserStore.__emitChange();
};

var setErrors = function (error) {
	_authErrors = error;
	UserStore.__emitChange();
};


UserStore.__onDispatch = function (payload) {
	debugger
	switch(payload.actionType) {
		case UserConstants.LOGIN:
			login(payload.user);
		break;
		case UserConstants.LOGOUT:
			logout();
		break;
		case UserConstants.ERROR:
			setErrors(payload.error);
		break;
	}
};

module.exports = UserStore;

window.UserStore = UserStore;
// TODO: Figure out how to properly return currentUser (i.e. use jquery extend)
// TODO: FIgure out how error messages come in and how they are formatted (i.e. [].slice)
// TODO: Remove auth errors from here and move them to their own store, add a form errors component to my forms

//TODO: make methods private, remove 
	// - user store
	// - business store`
//TODO: 
