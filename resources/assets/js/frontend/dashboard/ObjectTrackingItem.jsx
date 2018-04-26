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
import GlobalConstants from '../../constants/GlobalConstants';
import TimeCheckPoint from './TimeCheckPoint';
import {
  TableRow,TableRowColumn
} from 'material-ui/Table';

import axios from 'axios';
const styles = {
  toggle: {
    marginBottom: 16,
  }
};

const socket = io(GlobalConstants.REALTIME_SERVER_URL);

export default class ObjectTrackingItem extends React.Component{
  constructor(props){
    super(props);

    var _self = this;

    let start = new Date(this.props.node.created_at);
    let time_now = new Date();
    this.total_time_count = null;
    this.interval = null;

    this.listInterval = [];
    this.state = {
      isColorPickerShowed:false,
      pathColor:this.props.node.path_color,
      listTrack:JSON.parse(this.props.node.status),
      count_time : Math.floor((time_now-start)/1000)
    }

  }

  componentWillMount(){
    var _self = this;
    this.total_time_count = setInterval(function(){
      _self.setState({
        count_time: _self.state.count_time+1
      });
    },1000);
  }

  componentWillUnmount(){
    if(this.total_time_count !='undefined'){
      clearInterval(this.total_time_count);
    }
  }

  onToggleColorPicker(){
    this.setState({
      isColorPickerShowed:!this.state.isColorPickerShowed
    });
  }

  //Thay đổi màu đường đi
  colorChange(color){
    this.setState({
      pathColor:color.hex
    });

    Actions.changePathColor(this.props.node.id,color.hex);
  }

  //hiển thị hoặc ẩn đường đi
  onTogglePath(){
    Actions.togglePath(this.props.node.id);
  }

  render(){
    const {...otherProps} = this.props;
    var pathColor = this.state.pathColor!=null ? this.state.pathColor :'orange';
    var hours = Math.floor(this.state.count_time / 3600);
    var minutes_count = Math.floor((this.state.count_time - hours * 3600)/60);
    var seconds_count = this.state.count_time - hours*3600 -  minutes_count * 60;
    var ct = `${hours}h :${minutes_count}m : ${seconds_count}s`;

    var created_atT = moment(new Date(this.props.node.created_at)).format('H:mm');

    return(
      <TableRow {...otherProps}>
        {otherProps.children[0]}
        <TableRowColumn>{this.props.node.object_tracking}</TableRowColumn>
        <TableRowColumn>
          <div onClick={this.onToggleColorPicker.bind(this)} style={{width:'15px',height:'15px',background:`${pathColor}`,border:'1px solid #ddd',position:'relative'}}>
          {
            this.state.isColorPickerShowed && (
              <div style={{zIndex:7,position:'absolute',top:'101%'}}>
                  <HuePicker color ={this.state.pathColor} onChange={ this.colorChange.bind(this)} />
              </div>
            )
          }
        </div></TableRowColumn>
        <TableRowColumn><Toggle defaultToggled={true} onToggle={this.onTogglePath.bind(this)}  /></TableRowColumn>
        {
          this.state.listTrack.map((node,k)=>{
            var time1 = node.time_start!='' ? new Date(node.time_start) : new Date();
            var time2 = new Date();          
            var total_time = node.status!=2 ? (Math.floor((time2-time1)/1000)) + parseInt(node.total_time) : node.total_time;

            return(
              <TableRowColumn style={{padding:0}} key={k}>
                <TimeCheckPoint totaltime={total_time} sessionid= {this.props.node.id} node={node}/>
              </TableRowColumn>
            )
          })
        }
        <TableRowColumn>{created_atT}</TableRowColumn>
        <TableRowColumn>{ct}</TableRowColumn>
      </TableRow>
    )
  }
}
