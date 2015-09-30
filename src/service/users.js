/**
 * Service for making API calls and managing data via actions/stores based resp
 * related to users
 *
 * @author Sean Teare
 * @since 2015-09-29
 */

// TODO - Make these vanilla objects instead of constructors

import userStore from '../stores/userStore';
import userActions from '../actions/userActions';
import superagent from 'superagent';
import { BASE_URL } from '../constants';

export default {
  fetchUsers: (callback) => {
    callback = callback || () => {};
    superagent
      .get(BASE_URL + '/users')
      .end((err, res) => {
        userActions.setUsers(res.body);
        return callback(res.body);
      });
  }
};
