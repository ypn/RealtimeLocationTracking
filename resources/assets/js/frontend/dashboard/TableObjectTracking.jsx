import React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';

import Toggle from 'material-ui/Toggle';
import axios from 'axios';
import ObjectTrackingItem from './ObjectTrackingItem';
import GlobalConstants from '../../constants/GlobalConstants';

import Stores from '../stores/Stores';
import * as Actions from '../actions/Actions';

const styles = {
  toggle: {
    marginBottom: 16,
  }
};


const socket = io(GlobalConstants.REALTIME_SERVER_URL);

var _self;

export default class TableObjectTracking extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      listObjectTracking:[],
      listCheckPoints:[]
    }

    var _self = this;
    Stores.on('list-all-on-object-tracking',function(){
      _self.setState({
        listObjectTracking:(Stores.getListAllOnObjectTracking()).filter(obj=>{
          return obj.mode_id == _self.props.ModeId
        })
      });
    });

    axios.post(GlobalConstants.MODE_TRACKING_ROUTE+'list-checkpoints',{
      mode_id:this.props.ModeId
    })
    .then(function(response){
      this.setState({
        listCheckPoints:response.data
      })
    }.bind(this))
    .catch(function(err){
      console.log(err);
    })

    socket.on('new_session_detected_in_mode_' + this.props.ModeId,function(data){
      _self.setState({
        listObjectTracking:[..._self.state.listObjectTracking,JSON.parse(data.data)]
      })
    });

    socket.on('stop_tracking_in_' + this.props.ModeId,function(data){
      _self.setState({
        listObjectTracking:_self.state.listObjectTracking.filter(ob=>{
          return ob.id!=data.sessionId
        })
      })
    });

    socket.on('step_into_checkpoint_' + this.props.ModeId,function(data){

      console.log('step in to check point');
      console.log(data);
      _self.state.listObjectTracking.map(obj=>{
          console.log(obj.id);
          console.log(obj.status);

          // if(obj.id==data.sessionId){
          //   console.log(obj.status);
          //   obj.status.total_time = 200;
          //   obj.status.status =1;
          // }

      });
    });

  }

  render(){
    return(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderColumn>{this.props.DisplayProperty}</TableHeaderColumn>
            <TableHeaderColumn>Màu đường đi</TableHeaderColumn>
            <TableHeaderColumn>Hiện đường đi</TableHeaderColumn>
            {
              this.state.listCheckPoints.map((node,k)=>{
                return(
                    <TableHeaderColumn key={k}>{node.name}</TableHeaderColumn>
                )
              })
            }
            <TableHeaderColumn>Giờ bắt đầu</TableHeaderColumn>
            <TableHeaderColumn>Thời gian giám sát</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody className="mornitor-tablebody">
          {
            this.state.listObjectTracking.map((node,key)=>{
              return(
                  <ObjectTrackingItem node={node} key={key}/>
              )
            })
          }
        </TableBody>
      </Table>
    )
  }
}
