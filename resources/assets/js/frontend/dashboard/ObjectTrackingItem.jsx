/*
* created by: ypn
* Hiển thị danh sách và trạng thái các xe đang được theo dõi.
*/

import React from 'react';
import Stores from '../stores/Stores';
import * as Actions from '../actions/Actions';
import { HuePicker } from 'react-color';
import Toggle from 'material-ui/Toggle';
import moment from 'moment';
import {
  TableRow,TableRowColumn
} from 'material-ui/Table';

const styles = {
  toggle: {
    marginBottom: 16,
  }
};

export default class ObjectTrackingItem extends React.Component{
  constructor(props){
    super(props);
    console.log('data');
    console.log(this.props.Data);
    this.state = {
      isColorPickerShowed:false,
      pathColor:'orange',
    }
  }

  onToggleColorPicker(){
    this.setState({
      isColorPickerShowed:!this.state.isColorPickerShowed
    });
  }

  colorChange(color){
    this.setState({
      pathColor:color.hex
    });
  }

  render(){
    const {...otherProps} = this.props;
    var pathColor = this.state.pathColor!=null ? this.state.pathColor :'orange';
    return(
      <TableRow {...otherProps}>
        {otherProps.children[0]}
        <TableRowColumn>{this.props.Data.object_tracking}</TableRowColumn>
        <TableRowColumn>
          <div onClick={this.onToggleColorPicker.bind(this)} style={{width:'15px',height:'15px',background:`${pathColor}`,border:'1px solid #ddd',position:'relative'}}>
          {
            this.state.isColorPickerShowed && (
              <div style={{zIndex:7,position:'absolute',top:'101%'}}>
                  <HuePicker pathId={this.props.id} color ={this.state.pathColor} onChange={ this.colorChange.bind(this)} />
              </div>
            )
          }
        </div></TableRowColumn>
      <TableRowColumn className="row-active"><Toggle/></TableRowColumn>
        <TableRowColumn>40m:30s</TableRowColumn>
        <TableRowColumn>40m:30s</TableRowColumn>
        <TableRowColumn>14h:30</TableRowColumn>
        <TableRowColumn>40m:30s</TableRowColumn>
      </TableRow>
    )
  }
}
