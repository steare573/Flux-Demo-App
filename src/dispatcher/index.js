/**
 * Global dispatcher for actions and views to talk to each other
 *
 * @author Sean Teare
 * @since 2015-09-29
 */

var Dispatcher = require('flux').Dispatcher;
var Instance = new Dispatcher();

Instance.dispatchAction = function (actionName, data) {
  this.dispatch({
    action: actionName,
    data: data
  });
};

export default Instance;
