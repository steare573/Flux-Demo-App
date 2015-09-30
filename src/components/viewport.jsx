/**
 * Component for viewport, also determines what component page to display
 *
 * @author Sean Teare
 * @since 2015-09-29
 */

import React from 'react';
import Dashboard from './dashboard.jsx';
import Users from './users.jsx';
import Widgets from './widgets.jsx';

export default class Viewport extends React.Component {

  render () {
    var activeComponent = (<Dashboard {...this.props}/>);
    var activePanel = this.props.activePane;
    switch (this.props.activePane) {
      case 'users':
        activeComponent = <Users {...this.props}/>;
        break;
      case 'widgets':
        activeComponent = <Widgets {...this.props}/>
        break;

    }

    return (
      <div id='content-wrapper'>
        {activeComponent}
      </div>
    );
  }
}


Viewport.propTypes = {
  activePane: React.PropTypes.string
};

Viewport.defaultProps = {
  activePane: 'default'
};
