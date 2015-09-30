/**
 * Store for retrieving data about users and emitting change events
 *
 * @author Sean Teare
 * @since 2015-09-29
 */
import EventEmitter from 'events';
import * as constants from '../constants';
import dispatcher from '../dispatcher';

var users = Symbol();

const USERS_CHANGE = 'USERS_CHANGE';

class UserStore extends EventEmitter {
  constructor () {
    super();
    this[users] = [];
  }

  emitChange () {
    this.emit(USERS_CHANGE);
  }

  addChangeListener (callback) {
    this.on(USERS_CHANGE, callback);
  }

  removeChangeListener (callback) {
    this.removeListener(USERS_CHANGE, callback);
  }

  resetUsers () {
    this[users] = [];
  }

  setUsers (usersArray) {
    this[users] = usersArray;
  }

  addUser (user) {
    this[users].push(user);
  }
  getUsers () {
    return this[users];
  }

}

var userStoreInstance = new UserStore();

userStoreInstance.dispatchToken = dispatcher.register(payload => {
  var action = payload.action;
  var data = payload.data || {};

  switch (action) {
    case constants.SET_USERS:
      //userStoreInstance.users = data.users;
      userStoreInstance.setUsers(data.users);
      userStoreInstance.emitChange();
      break;
    case constants.ADD_USER:
      userStoreInstance.addUser(data.user);
      userStoreInstance.emitChange();
      break;
    case constants.RESET_USER:
      userStoreInstance.resetUser();
      userStoreInstance.emitChange();
      break;
  }

  return true;
});

export default userStoreInstance;
