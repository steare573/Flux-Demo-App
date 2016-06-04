/**
 * Actions for changing user data
 *
 * @author Sean Teare
 * @since 2015-09-29
 */

import dispatcher from '../dispatcher';
import * as constants from '../constants';

export default {
  setUsers: (users) => {
    dispatcher.dispatchAction(
      constants.SET_USERS,
      {
        users,
      }
    );
  },

  addUser: (user) => {
    dispatcher.dispatchAction(
      constants.ADD_USER,
      {
        user,
      }
    );
  },

  reset: () => {
    dispatcher.dispatchAction(
      constants.RESET_USERS
    );
  },
};
