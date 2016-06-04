/**
 * Service for making API calls and managing data via actions/stores based resp
 * related to users
 *
 * @author Sean Teare
 * @since 2015-09-29
 */

// TODO - Make these vanilla objects instead of constructors
import userActions from '../actions/userActions';
import superagent from 'superagent';
import { BASE_URL } from '../constants';

export default {
  fetchUsers: (callback) => {
    const cb = callback || function anon() {};
    superagent
      .get(`${BASE_URL}/users`)
      .end((err, res) => {
        const r = res || {};
        userActions.setUsers(r.body);
        return cb(r.body);
      });
  },
};
