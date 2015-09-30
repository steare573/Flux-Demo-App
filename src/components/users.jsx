/**
 * Main component for our users page
 *
 * @author Sean Teare
 * @since 2015-09-29
 */

import React from 'react';
import Headerbar from './headerbar.jsx';
import DisplayTable from './displaytable.jsx';
import clonedeep from 'lodash.clonedeep';
import filterBySubstring from '../util';

export default class Users extends React.Component {
  constructor (props, context) {
    super(props, context);
    this.state = {
      userFilter: undefined
    };

    this.updateUserFilter = (e) => {
      this.setState({userFilter: e.target.value});
    }
  }
  render() {

    var datasource = clonedeep(this.props.users);

    if (this.state.userFilter) {
      datasource = filterBySubstring(datasource, ['id', 'name'], this.state.userFilter);
    }

    datasource.forEach((userObj) => {
      userObj.avatar = <img src={userObj.gravatar} />
    });

    return (
      <div className="page-content">

        <Headerbar {...this.props}/>

        <div className="row">

          <div className="col-lg-12">
            <div className="widget">
              <div className="widget-header">Users
                <div className="pull-right"><input type="text" onChange={this.updateUserFilter} className="form-control input-sm"/></div>
              </div>
              <div className="table-responsive">
                <DisplayTable
                  tableName='users-page-users'
                  tableClassname='table'
                  dataSource={datasource}
                  displayFields={['id', 'name', 'avatar']}
                  />
              </div>
            </div>
          </div>

        </div>

      </div>
    );
  }
}


Users.propTypes = {
  users: React.PropTypes.array
};

Users.defaultProps = {
  users: []
};
