/**
 * Store for retrieving data about widgets and emitting change events
 *
 * @author Sean Teare
 * @since 2015-09-29
 */

import EventEmitter from 'events';
import * as constants from '../constants';
import dispatcher from '../dispatcher';

const widgets = Symbol();

const WIDGETS_CHANGE = 'WIDGETS_CHANGE';

class WidgetStore extends EventEmitter {
  constructor() {
    super();
    this[widgets] = [];
  }

  emitChange() {
    this.emit(WIDGETS_CHANGE);
  }

  addChangeListener(callback) {
    this.on(WIDGETS_CHANGE, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(WIDGETS_CHANGE, callback);
  }

  getWidgets() {
    return this[widgets];
  }

  setWidgets(w) {
    this[widgets] = w;
  }

  resetWidgets() {
    this[widgets] = [];
  }

}

const widgetStoreInstance = new WidgetStore();

widgetStoreInstance.dispatchToken = dispatcher.register(payload => {
  const action = payload.action;
  const data = payload.data || {};

  switch (action) {
    case constants.SET_WIDGETS:
      widgetStoreInstance.setWidgets(data.widgets);
      widgetStoreInstance.emitChange();
      break;
    case constants.ADD_WIDGET:
      widgetStoreInstance.widgets.push(data.widget);
      widgetStoreInstance.emitChange();
      break;
    case constants.RESET_WIDGETS:
      widgetStoreInstance.widgets = [];
      widgetStoreInstance.emitChange();
      break;
    default:
      break;
  }

  return true;
});

export default widgetStoreInstance;
