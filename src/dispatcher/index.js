/**
 * Global dispatcher for actions and views to talk to each other
 *
 * @author Sean Teare
 * @since 2015-09-29
 */
import { Dispatcher } from 'flux';

const Instance = new Dispatcher();

Instance.dispatchAction = function dispatch(actionName, d) {
  this.dispatch({
    action: actionName,
    data: d,
  });
};

export default Instance;
