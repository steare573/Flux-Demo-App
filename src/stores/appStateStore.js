/**
 * Store for retrieving data about app and emitting change events
 *
 * @author Sean Teare
 * @since 2015-09-29
 */
import EventEmitter from 'events';
import * as constants from '../constants';
import dispatcher from '../dispatcher';

const appState = {
  activePane: '',
};
const ACTIVEPANE_CHANGE = 'ACTIVEPANE_CHANGE';

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

  get appState() {
    return appState;
  }

  get activePane() {
    return appState.activePane;
  }
}

const appStateInstance = new AppStore();

appStateInstance.dispatchToken = dispatcher.register(payload => {
  const action = payload.action;
  const data = payload.data || {};

  switch (action) {
    case constants.SET_ACTIVE_PANE:
      setActivePane(data.activePane);
      appStateInstance.emitActivePaneChange();
      break;
    default:
      break;
  }

  return true;
});

export default appStateInstance;
