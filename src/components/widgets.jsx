/**
 * Component for our main widgets page
 *
 * @author Sean Teare
 * @since 2015-09-29
 */

import React from 'react';
import Headerbar from './headerbar.jsx';
import DisplayTable from './displaytable.jsx';
import clonedeep from 'lodash.clonedeep';
import widgetService from '../service/widgets';

export default class Widgets extends React.Component {
  constructor (props, context) {
    super(props, context);
    this.state = {
      currentWidgetPane: 'list',
      currentWidget: {},
      errMessage: ''
    };
    this.getEditBtnClickHandler = (widget) => {
      return () => {
        this.setState({currentWidgetPane: 'form', currentWidget: widget});
      }.bind(this);
    };

    this.changeToForm = (e) => {
      this.setState({currentWidgetPane: 'form', currentWidget: {}});
    };

    this.changeToList = () => {
      this.setState({currentWidgetPane: 'list', currentWidget: {}})
    }

    this.editCurrentWidget = (e) => {
      var curWidget = this.state.currentWidget;
      curWidget[e.target.name] = e.target.value;
      this.setState({currentWidget: curWidget});
    };

    this.toggleCurrentWidgetMelts = () => {
      var curWidget = this.state.currentWidget;
      curWidget.melts = !this.state.currentWidget.melts;
      this.setState({currentWidget: curWidget});
    }


    this.saveWidget = () => {

      widgetService.upsertWidget({
        color: this.state.currentWidget.color,
        price: this.state.currentWidget.price,
        name: this.state.currentWidget.name,
        melts: this.state.currentWidget.melts,
        inventory: this.state.currentWidget.inventory,
        id: this.state.currentWidget.id
      }, (err, res) => {
        if (err) {
          this.setState({errMessage: 'Error saving widget: ' + err.message});
          setTimeout(() => {
            this.setState({errMessage: ''});
          }.bind(this), 2000);
        } else {
          this.setState({currentWidgetPane: 'list'});
        }
      }.bind(this));

    }
  }
    render() {
      var datasource = clonedeep(this.props.widgets);
      datasource.forEach(function (widgetObj) {
        widgetObj.displayPrice = '$' + widgetObj.price;
        widgetObj['melts?'] = widgetObj['melts'] ? 'yes' : 'no';
        widgetObj.button = <button className='btn btn-sm btn-info' onClick={this.getEditBtnClickHandler(widgetObj)}>Edit</button>
      }.bind(this));
      var activeComponent = (
        <div className="row">
          <div className="col-lg-12">
            <div className="widget">
              <div className="widget-header">Widgets
                <div className="pull-right">
                  <button className="btn btn-sm btn-info" onClick={this.changeToForm}>+ Create</button>
                </div>
              </div>
              <div className="table-responsive">
                <DisplayTable
                  tableName='widgets-page-widgets'
                  tableClassname='table'
                  dataSource={datasource}
                  displayFields={['id', 'name', 'color', 'displayPrice', 'melts?', 'inventory', 'button']}
                />
              </div>
            </div>
          </div>

        </div>
      );

      if (this.state.currentWidgetPane == 'form') {
        console.log('my current stuffs', this.state.currentWidget);
        activeComponent = (
          <div className="row">

            <div className="col-lg-12">
              <div className="widget">
                <div className="widget-header">{this.state.currentWidget.id ? 'Edit' : 'Create '} Template</div>
                <div className="widget-body">
                  <form className="form-horizontal" onSubmit={(e) => {e.preventDefault();}}>

                    <legend>{this.state.currentWidget.id ? 'Edit' : 'Create '} Widget<a href='#' onClick={this.changeToList} style={{marginLeft: '20'}}>(Return To List View)</a><span style={{color: 'red', float: 'right', fontSize: '.7em'}}>{this.state.errMessage}</span></legend>

                    <div className="controls">
                    Name
                      <input id="name" name="name" type="text" placeholder="foo-bar" className="input-medium" value={this.state.currentWidget.name} onChange={this.editCurrentWidget}/>
                        <div className="pull-right">
                          <button className="btn btn-sm btn-info" onClick={this.saveWidget}>{this.state.currentWidget.id ? '+ Update' : '+ Create'}</button>
                        </div>
                    </div>

                    <div className="controls">
                      <div className="input-prepend">
                      Price
                        <span className="add-on">$</span>
                        <input id="price" name="price" className="input-medium" placeholder="0.00" type="text" value={this.state.currentWidget.price} onChange={this.editCurrentWidget}  />
                      </div>
                    </div>

                    <div className="controls">
                    Color
                      <select id="color" name="color" className="input-large" onChange={this.editCurrentWidget} value={this.state.currentWidget.color}>
                        <option>red</option>
                        <option>purple</option>
                        <option>black</option>
                        <option>green</option>
                        <option>magenta</option>
                        <option>white</option>
                        <option>depends on the viewing angle</option>
                      </select>
                    </div>

                    <div className="controls">
                      Melts
                      <input type="checkbox" name="melts" id="melts" checked={this.state.currentWidget.melts} onChange={this.toggleCurrentWidgetMelts} />
                    </div>

                    <div className="controls">
                      Inventory
                      <input id="inventory" name="inventory" type="text" placeholder="#?" className="input-small" value={this.state.currentWidget.inventory} onChange={this.editCurrentWidget}/>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        );
      }
      return (
        <div className="page-content">

          <Headerbar {...this.props}/>

          {activeComponent}
        </div>

      );
    }
}


Widgets.propTypes = {
  widgets: React.PropTypes.array
};

Widgets.defaultProps = {
  widgets: []
};
