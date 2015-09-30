/**
 * Service for making API calls and managing data via actions/stores based resp
 * related to widgets
 *
 * @author Sean Teare
 * @since 2015-09-29
 */

 // TODO - Make these vanilla objects instead of constructors

import widgetStore from '../stores/widgetStore';
import widgetActions from '../actions/widgetActions';
import superagent from 'superagent';
import clonedeep from 'lodash.clonedeep';
import { BASE_URL } from '../constants';

/**
 * Get all widgets and set our app data with the response
 */
var fetchWidgets = (callback) => {
  callback = callback || () => {};
  superagent
    .get(BASE_URL + '/widgets')
    .end((err, res) => {
      widgetActions.setWidgets(res.body);

      return callback(res.body);
    });
}

/**
 * Create a widget on the server
 */
var insertWidget =  (widget, callback) => {
  callback = callback || () => {};
  if (!widget) {
    return callback(new Error('No widget available to insert'));
  }

  superagent
    .post(BASE_URL + '/widgets')
    .send(widget)
    .end((err, res) => {
      fetchWidgets();
      callback(err, res);
    });
};

/**
 * Update widget on the server
 */
var updateWidget = (widget, callback) => {
  callback = callback || () => {};

  if (!widget) {
    return callback(new Error('No widget available to update'));
  }

  if (!widget.id) {
    return callback(new Error('no widgetid to be updated'));
  }

  var payload = clonedeep(widget);
  delete(payload.id);

  superagent
    .put(BASE_URL + '/widgets/' + widget.id)
    .send(payload)
    .end((err, res) => {
      fetchWidgets();
      callback(err, res);
    });
};

/**
 * Smartly update or create a widget on the server based on if id is in payload
 */
var upsertWidget = (widget, callback) => {
  callback = callback || () => {};

  if (!widget) {
    return callback(new Error('No Widget Available to upsert'));
  }
  if (widget.id) {
    return updateWidget(widget, callback)
  }

  insertWidget(widget, callback);
}

export default {

  fetchWidgets: fetchWidgets ,

  upsertWidget: upsertWidget,

  insertWidget: insertWidget,

  updateWidget: updateWidget
};
