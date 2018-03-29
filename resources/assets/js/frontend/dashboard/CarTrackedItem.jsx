/*
* created by: ypn
* Hiển thị danh sách và trạng thái các xe đang được theo dõi.
*/

import React from 'react';
import Stores from '../stores/Stores';
import * as Actions from '../actions/Actions';
import { HuePicker } from 'react-color';
import moment from 'moment';

export default class CarTrackedItem extends React.Component{
  constructor(props){
    super(props);
    var time1 = new Date(this.props.created);
    var time2 = new Date();
    var t = $.map(JSON.parse(this.props.status),function(v,i){
      return [v];
    });

    this.interval = null;
    this.listInterval = [];
    this.total_time_count = null;
    this.state = {
      pathColor:this.props.pathColor,
      isColorPickerShowed:false,
      tracks : t,
      count_time : Math.floor((time2-time1)/1000)
    }
  }

  componentWillMount(){
    var _self = this;
    var tungnui = this.state.tracks;
    _self.total_time_count = setInterval(function(){
      _self.setState({
        count_time: _self.state.count_time+1
      });
    },1000);
    for(let i=0;i < tungnui.length ;i++){
      if(tungnui[i].status ==1){
         var time1 = new Date(tungnui[i].time_start);
         var time2 = new Date();
         tungnui[i].total_time = Math.floor((time2-time1)/1000);

         var a = setInterval(function(){
           tungnui[i].total_time += 1;
           _self.setState({
               tracks:tungnui
             });
           }, 1000);

           _self.listInterval[i] = a;

        }
    }

    Stores.on(`session_${this.props.id}_step_in_checkpoint`,function(data){
      var newTracks = _self.state.tracks;
      newTracks[data.data.data.checkpointIndex].status = 1;
      newTracks[data.data.data.checkpointIndex].total_time = 0;

      _self.interval = setInterval(function(){
        newTracks[data.data.data.checkpointIndex].total_time += 1;
        _self.setState({
            tracks:newTracks
          });
        }, 1000);

      _self.listInterval[data.data.data.checkpointIndex] = setInterval(function(){
        newTracks[data.data.data.checkpointIndex].total_time += 1;
        _self.setState({
            tracks:newTracks
          });
        }, 1000);

      _self.setState({
        tracks:newTracks
      });
    });

    Stores.on(`session_${this.props.id}_step_out_checkpoint`,function(data){
      if(_self.interval){
          clearInterval(_self.interval);
      }

      if(_self.listInterval[data.data.data.checkpointIndex]){
        clearInterval(_self.listInterval[data.data.data.checkpointIndex]);
      }

      var newTracks = _self.state.tracks;
      newTracks[data.data.data.checkpointIndex].status = 2;
      //update new time
      newTracks[data.data.data.checkpointIndex].total_time = data.data.data.total_time;
      _self.setState({
        tracks:newTracks
      });
    });
  }

  componentWillUnmount(){
    if(this.interval){
        clearInterval(this.interval);
    }

    if(this.total_time_count){
      clearInterval(this.total_time_count);
    }

    for(var i=0; i< this.listInterval.length ; i++){
      clearInterval(this.listInterval[i]);
    }
  }

  checkboxChange(e){
    Actions.togglePath(e.target.value);
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

    Actions.changePathColor(this.props.id,color.hex);
  }

  render(){
    var minutes_count = Math.floor(this.state.count_time / 60);
    var seconds_count = this.state.count_time - minutes_count * 60;
    var ct = `(${minutes_count}m : ${seconds_count}s)`;
    var pathColor = this.state.pathColor!=null ? this.state.pathColor :'orange';
    var created_atT = moment(new Date(this.props.created)).format('H:mm:ss');
    return(
      <tr key={this.props.id} className="info">
        <td>{this.props.index +1}</td>
        <td>
          <div onClick={this.onToggleColorPicker.bind(this)} style={{width:'15px',height:'15px',background:`${pathColor}`,border:'1px solid #ddd',position:'relative'}}>
            {
              this.state.isColorPickerShowed && (
                <div style={{zIndex:7,position:'absolute',top:'140%'}}>
                    <HuePicker pathId={this.props.id} color ={this.state.pathColor} onChange={ this.colorChange.bind(this) } />
                </div>
              )
            }
          </div>
        </td>
        <td>
          <input value={this.props.id} onChange ={this.checkboxChange.bind(this)} id={"id-name--" + this.props.id} type="checkbox" name="set-name" className="switch-input"/>
          <label htmlFor={"id-name--" + this.props.id} className="switch-label"></label>
        </td>
        <td>{this.props.bienso}</td>
        {
          this.state.tracks.map((node,key)=>{
            var txtStatus;
            var time;
            var cssClass = null;

            switch (node.status) {
              case 2:
                txtStatus = 'Đã kiểm tra';
                var minutes = Math.floor(node.total_time / 60);
                var seconds = node.total_time - minutes * 60;
                time = `(${minutes}m : ${seconds} s)`;
                break;
              case 1:
                txtStatus = 'Đang kiểm tra';
                var minutes = Math.floor(node.total_time / 60);
                var seconds = node.total_time - minutes * 60;
                time = `(${minutes}m : ${seconds} s)`;
                break;
              case 0:
                txtStatus = 'Chưa kiểm tra'
                break;
            }
            if(node.total_time > node.max_time*60) cssClass='danger';

            return(
              <td key={key} className={cssClass}>{txtStatus} {time}</td>
            )
          })
        }
        <td>{created_atT}</td>
        <td>{ct}</td>
      </tr>
    )
  }
}
