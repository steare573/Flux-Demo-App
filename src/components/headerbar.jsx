/**
 * Header component to be displayed on every page showing user and active page
 *
 * @author Sean Teare
 * @since 2015-09-29
 */

import React from 'react';

import appStateActions from '../actions/appStateActions';
export default class Headerbar extends React.Component {
  changePaneHandler (pane) {
    return () => {
      appStateActions.setActivePane(pane);
    };
  }
  render() {
    var page = this.props.activePane;
    return (
      <div className="row header col-xs-12">
        <div className="user pull-right">
          <div className="item dropdown">
            <a href="#" className="dropdown-toggle"><img src="img/avatar.jpg" alt="" /></a>
          </div>
        </div>
        <div className="meta">
          <div className="page">{page.toUpperCase()}</div>
          <div className="breadcrumb-links">
            <a href="#" onClick={this.changePaneHandler('dashboard')}>Home</a> |
            <a href="#" style={(page === 'dashboard') ? {color: 'black'} : {}} onClick={this.changePaneHandler('dashboard')}>Dashboard</a> |
            <a href="#" style={(page === 'users') ? {color: 'black'} : {}} onClick={this.changePaneHandler('users')}>Users</a> |
            <a href="#" style={(page === 'widgets') ? {color: 'black'} : {}} onClick={this.changePaneHandler('widgets')}>Widgets</a>
            
          </div>
        </div>
      </div>
    );
  }
}


Headerbar.propTypes = {
  activePane: React.PropTypes.string
};

Headerbar.defaultProps = {
  activePane: 'Widgets App'
};
