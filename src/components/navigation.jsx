/**
 * Component for displaying navigation and selecting active pane
 *
 * @author Sean Teare
 * @since 2015-09-29
 */

import React from 'react';
import appStateActions from '../actions/appStateActions';

export default class Navigation extends React.Component {
  changePaneHandler(pane) {
    return () => {
      appStateActions.setActivePane(pane);
    }
  }
  render() {
    var glyphComponent = (<span className="menu-icon fa fa-tachometer"></span>);

    switch (this.props.activePane) {
      case 'users':
        glyphComponent = (<span className="menu-icon fa fa-users"></span>);
        break;
      case 'widgets':
        glyphComponent = (<span className="menu-icon fa fa-cubes"></span>);
        break;
    }
    return (
      <div id="sidebar-wrapper">
        <ul className="sidebar">
          <li className="sidebar-main"><a href="#" onClick={this.changePaneHandler('dashboard')}>{this.props.activePane.toUpperCase()} {glyphComponent}</a></li>
          <li className="sidebar-title"><span>NAVIGATION</span></li>
          <li className="sidebar-list"><a href="#" onClick={this.changePaneHandler('dashboard')}>Dashboard <span className="menu-icon fa fa-tachometer"></span></a></li>
          <li className="sidebar-list"><a href="#" onClick={this.changePaneHandler('users')}>Users <span className="menu-icon fa fa-users"></span></a></li>
          <li className="sidebar-list"><a href="#" onClick={this.changePaneHandler('widgets')}>Widgets <span className="menu-icon fa fa-cubes"></span></a></li>
        </ul>
        <div className="sidebar-footer col-xs-12"><a href="#" target="_blank">&copy; 2015 Red Ventures</a></div>
      </div>
    );
  }
}
