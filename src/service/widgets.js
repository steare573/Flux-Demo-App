/**
 * Service for making API calls and managing data via actions/stores based resp
 * related to widgets
 *
 * @author Sean Teare
 * @since 2015-09-29
 */

 // TODO - Make these vanilla objects instead of constructors

import widgetActions from '../actions/widgetActions';
import superagent from 'superagent';
import clonedeep from 'lodash.clonedeep';
import { BASE_URL } from '../constants';

/**
 * Get all widgets and set our app data with the response
 */
const fetchWidgets = (callback) => {
  const cb = callback || function noop() {};
  superagent
    .get(`${BASE_URL}/widgets`)
    .end((err, res) => {
      widgetActions.setWidgets(res.body);

      return cb(res.body);
    });
};

/**
 * Create a widget on the server
 */
const insertWidget = (widget, callback) => {
  const cb = callback || function noop() {};
  if (!widget) {
    return cb(new Error('No widget available to insert'));
  }

  return superagent
    .post(`${BASE_URL}/widgets`)
    .send(widget)
    .end((err, res) => {
      fetchWidgets();
      cb(err, res);
    });
};

/**
 * Update widget on the server
 */
const updateWidget = (widget, callback) => {
  const cb = callback || function noop() {};

  if (!widget) {
    return cb(new Error('No widget available to update'));
  }

  if (!widget.id) {
    return cb(new Error('no widgetid to be updated'));
  }

  const payload = clonedeep(widget);
  delete(payload.id);

  return superagent
    .put(`${BASE_URL}/widgets/${widget.id}`)
    .send(payload)
    .end((err, res) => {
      fetchWidgets();
      cb(err, res);
    });
};

/**
 * Smartly update or create a widget on the server based on if id is in payload
 */
const upsertWidget = (widget, callback) => {
  const cb = callback || function noop() {};

  if (!widget) {
    return callback(new Error('No Widget Available to upsert'));
  }
  if (widget.id) {
    return updateWidget(widget, cb);
  }

  return insertWidget(widget, cb);
};

export default {

  fetchWidgets,

  upsertWidget,

  insertWidget,

  updateWidget,
};
