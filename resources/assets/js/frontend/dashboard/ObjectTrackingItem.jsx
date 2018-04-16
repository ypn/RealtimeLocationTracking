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

    console.log('step_into_checkpoint_' + this.props.modeid + "_" + this.props.node.id);

    socket.on('step_into_checkpoint_' + this.props.modeid + "_" + this.props.node.id,function(data){

      var temp = _self.state.listTrack;

      temp.map(obj=>{
        if(obj.checkpointId == data.data.checkpointId){
            console.log('co vao day');
            console.log(obj);
            obj.status = 1;
            setInterval(function(){
              obj.total_time += 1;
            },1000);
        }

        return obj;
      })

      _self.setState({
        listTrack:temp
      });

    });

  }

  componentWillMount(){
    // var _self = this;
    // var tungnui = this.state.listTrack;
    //
    // _self.total_time_count = setInterval(function(){
    //   _self.setState({
    //     count_time: _self.state.count_time+1
    //   });
    // },1000);

    // for(let i=0;i < tungnui.length ;i++){
    //   if(tungnui[i].status ==1){
    //      let time1 = new Date(tungnui[i].time_start);
    //      let time2 = new Date();
    //      tungnui[i].total_time = Math.floor((time2-time1)/1000);
    //      let a = setInterval(function(){
    //
    //        tungnui[i].total_time += 1;
    //        _self.setState({
    //            listTrack:tungnui
    //          });
    //        }, 1000);
    //
    //      _self.listInterval[i] = a;
    //
    //     }
    // }

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

    var minutes_count = Math.floor(this.state.count_time / 60);
    var seconds_count = this.state.count_time - minutes_count * 60;
    var ct = `${minutes_count}m : ${seconds_count}s`;

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
          this.state.listTrack.map((node,key)=>{
            var time;
            var _class='';

            switch (node.status) {
              case 2:
                _class = 'row-stop';
                var minutes = Math.floor(node.total_time / 60);
                var seconds = node.total_time - minutes * 60;
                time = `${minutes}m : ${seconds} s`;
                break;
              case 1:
                _class = 'row-active'
                var minutes = Math.floor(node.total_time / 60);
                var seconds = node.total_time - minutes * 60;
                time = `${minutes} m : ${seconds} s`;
                break;
              default:
                time = '--/--';
                break;
            }

            if(node.total_time > node.max_time) _class='row-danger';

            return(
              <TableRowColumn className={_class} key={key}>{time}</TableRowColumn>
            )
          })
        }
        <TableRowColumn>{created_atT}</TableRowColumn>
        <TableRowColumn>{ct}</TableRowColumn>
      </TableRow>
    )
  }
}
