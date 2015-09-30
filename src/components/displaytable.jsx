/**
 * Reusable component for displaying an array of objects in a table
 *
 * @author Sean Teare
 * @since 2015-09-29
 */
import React from 'react';

export default class DisplayTable extends React.Component {

  render () {
    // if we don't have our required stuffs, return a div
    // NOTE: This will never happen now that I set propTypes as required
    if (!this.props.dataSource || !this.props.displayFields) {
      return (<div></div>);
    }

    // Piece together our table header
    var tableHeadings = [];
    this.props.displayFields.forEach((name) => {
      tableHeadings.push(<th key={this.props.tableName + 'tableheader-' + name}>{name}</th>);
    }.bind(this));
    var tableHeader = (
      <thead>
        <tr>
          {tableHeadings}
        </tr>
      </thead>
    );

    // piece togethor our table body
    var tableRows = [];

    this.props.dataSource.forEach((dataObj) => {
      var tableData = [];
      this.props.displayFields.forEach((fieldName) => {
        tableData.push(
          <td key={this.props.tableName + 'tabledata-' + fieldName + '-' + dataObj[fieldName]}>
            {dataObj[fieldName]}
          </td>
        );
      }.bind(this));
      tableRows.push(<tr key={this.props.tableName + 'tablerow-' + dataObj[this.props.displayFields[0]]}>{tableData}</tr> )
    }.bind(this));
    var tableBody = (
      <tbody>
        {tableRows}
      </tbody>
    );

    return (
      <table className={this.props.tableClassname}>
        {tableHeader}
        {tableBody}
      </table>
    );
  }
}

DisplayTable.propTypes = {
  tableName: React.PropTypes.string.isRequired,
  tableClassName: React.PropTypes.string,
  dataSource: React.PropTypes.array.isRequired,
  displayFields: React.PropTypes.array.isRequired
};

DisplayTable.defaultProps = {
  tableClassname: 'display-table'
};
