/**
 * Actions for changing the main application state
 *
 * @author Sean Teare
 * @since 2015-09-29
 */

import dispatcher from '../dispatcher';
import * as constants from '../constants';

export default {
  setWidgets: (widgets) => {
    dispatcher.dispatchAction(
      constants.SET_WIDGETS,
      {
        widgets,
      }
    );
  },

  addWidget: (widget) => {
    dispatcher.dispatchAction(
      constants.ADD_WIDGET,
      {
        widget,
      }
    );
  },

  reset: () => {
    dispatcher.dispatchAction(
      constants.RESET_WIDGETS
    );
  },
};
