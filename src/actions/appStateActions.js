/**
 * Actions for changing the main application state
 *
 * @author Sean Teare
 * @since 2015-09-29
 */

import dispatcher from '../dispatcher';
import * as constants from '../constants';

export default {
  setActivePane: (activePane) => {
    dispatcher.dispatchAction(
      constants.SET_ACTIVE_PANE,
      {
        activePane: activePane
      }
    );
  }
};
