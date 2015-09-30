/**
 * Component for our main dashboard app
 *
 * @author Sean Teare
 * @since 2015-09-29
 */

import React from 'react';
import Headerbar from './headerbar.jsx';
import DisplayTable from './displaytable.jsx';
import filterBySubstring from '../util';

export default class Dashboard extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
          userFilter: undefined,
          widgetFilter: undefined
        }
        this.updateUserFilter = (e) => {
          this.setState({userFilter: e.target.value});
        }

        this.updateWidgetFilter = (e) => {
          this.setState({widgetFilter: e.target.value});
        }
    }

    render() {
      var widgetCount = this.props.widgets.length;
      var userCount = this.props.users.length;
      var userList;
      var widgetList;
      if (this.state.userFilter) {
        userList = filterBySubstring(
          this.props.users,
          ['id', 'name'],
          this.state.userFilter
        ) || [];
      } else {
        userList = this.props.users || [];
      }


      if (this.state.widgetFilter) {
        widgetList = filterBySubstring(
          this.props.widgets,
          ['id', 'name'],
          this.state.widgetFilter
        );
      } else {
        widgetList = this.props.widgets;
      }

      var visibleUserCount = userList.length;
      var visibleWidgetCount = widgetList.length;
      var DashboardBoxes = (
        <div className="row">
          <div className="col-lg-3 col-md-6 col-xs-12">
            <div className="widget">
              <div className="widget-header">
                <div className="widget-icon green pull-left">
                  <i className="fa fa-users"></i>
                </div>
                <div className="title">{visibleUserCount} | {userCount}</div>
                <div className="comment">Users</div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-xs-12">
            <div className="widget">
              <div className="widget-header">
                <div className="widget-icon green pull-left">
                  <i className="fa fa-users"></i>
                </div>
                <div className="title">{visibleWidgetCount} | {widgetCount}</div>
                <div className="comment">Widgets</div>
              </div>
            </div>
          </div>
        </div>
      );

      var UsersListing = (
        <div className="col-lg-6">
          <div className="widget">
            <div className="widget-header">Users
              <div className="pull-right"><input type="text" className="form-control input-sm" onChange={this.updateUserFilter} /></div>
            </div>
            <div className="table-responsive">
              <DisplayTable
                tableClassname='table'
                tableName='dashboard-users'
                dataSource={userList}
                displayFields={['id', 'name']}
              />
            </div>
          </div>
        </div>
      );

      var WidgetListing = (
        <div className="col-lg-6">
          <div className="widget">
            <div className="widget-header">Widgets
              <div className="pull-right"><input type="text" className="form-control input-sm" onChange={this.updateWidgetFilter}/></div>
            </div>
            <div className="table-responsive">
              <DisplayTable
                tableClassname='table'
                tableName='dashboard-widgets'
                dataSource={widgetList}
                displayFields={['id', 'name']}
              />
            </div>
          </div>
        </div>
      );
      return (
        <div className='page-content'>
          <Headerbar {...this.props}/>
          {DashboardBoxes}
          <div className="row">
            {UsersListing}
            {WidgetListing}
          </div>
        </div>

      );
    }
}

Dashboard.propTypes = {
  widgets: React.PropTypes.array,
  users: React.PropTypes.array
};

Dashboard.defaultProps = {
  widgets: [],
  users: []
};
