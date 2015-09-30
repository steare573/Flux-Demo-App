/**
 * Store for retrieving data about app and emitting change events
 *
 * @author Sean Teare
 * @since 2015-09-29
 */
import EventEmitter from 'events';
import * as constants from '../constants';
import dispatcher from '../dispatcher';

var appState = {};
const ACTIVEPANE_CHANGE = 'ACTIVEPANE_CHANGE';
function reset () {
  appState = {};
}

function setActivePane(activePane) {
  appState.activePane = activePane;
}

class AppStore extends EventEmitter {

  emitActivePaneChange() {
    this.emit(ACTIVEPANE_CHANGE);
  }

  addActivePaneChangeListener(callback) {
    this.on(ACTIVEPANE_CHANGE, callback);
  }

  removeActivePaneChangeListener(callback) {
    this.removeListener(ACTIVEPANE_CHANGE, callback);
  }

  get appState () {
    return appState;
  }

  get activePane() {
    return appState.activePane;
  }
}

let appStateInstance = new AppStore();

appStateInstance.dispatchToken = dispatcher.register(payload => {
  var action = payload.action;
  var data = payload.data || {};

  switch (action) {
    case constants.SET_ACTIVE_PANE:
      console.log('setting active pane', data.activePane);
      setActivePane(data.activePane);
      appStateInstance.emitActivePaneChange();
      break;
  }

  return true;
});

export default appStateInstance;
