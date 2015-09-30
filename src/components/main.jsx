/**
 * Main application wrapper component which manages data and passes it down as
 * props to all other components
 *
 * @author Sean Teare
 * @since 2015-09-29
 */

import React from 'react';
import Navigation from './navigation.jsx';
import Viewport from './viewport.jsx';
import stateStore from '../stores/appStateStore';
import widgetStore from '../stores/widgetStore';
import userStore from '../stores/userStore';
import widgetService from '../service/widgets';
import userService from '../service/users';

export default class MainApp extends React.Component {

  constructor (props, context) {
    super(props, context);
    this.state = {
      widgets: widgetStore.getWidgets(),
      users: userStore.getUsers(),
      activePane: 'dashboard'
    };

    widgetService.fetchWidgets();
    userService.fetchUsers();


    this.onActivePaneChange = () => {
      this.setState({activePane: stateStore.activePane});
    };

    this.onUsersChange = () => {
      this.setState({users: userStore.getUsers()});
    }

    this.onWidgetsChange = () => {
      this.setState({widgets: widgetStore.getWidgets()});
    }
  }

  componentDidMount () {
    stateStore.addActivePaneChangeListener(this.onActivePaneChange.bind(this));
    widgetStore.addChangeListener(this.onWidgetsChange.bind(this));
    userStore.addChangeListener(this.onUsersChange.bind(this));
  }

  componentWillUnmount () {
    stateStore.removeActivePaneChangeListener(this.onActivePaneChange);
  }

  render () {

    return (
      <div id="page-wrapper" className="open">
          <Navigation {...this.state}/>
          <Viewport {...this.state}/>
      </div>
    )
  }
}
