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
import _ from 'lodash';

import Stores from '../stores/Stores';
import * as Actions from '../actions/Actions';

const socket = io(GlobalConstants.REALTIME_SERVER_URL);

const styles = {
  toggle: {
    marginBottom: 16,
  }
};

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
        listObjectTracking:_.reject(_self.state.listObjectTracking,{'id':data.sessionId})
      })

    });

  }

  render(){
    return(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderColumn key={'theader_5'}>{this.props.DisplayProperty}</TableHeaderColumn>
            <TableHeaderColumn key={'theader_4'}>Màu đường đi</TableHeaderColumn>
            <TableHeaderColumn key={'theader_3'}>Hiện đường đi</TableHeaderColumn>
            {
              this.state.listCheckPoints.map((node,k)=>{
                return(
                    <TableHeaderColumn key={'theader_checkpoint_' + k}>{node.name}</TableHeaderColumn>
                )
              })
            }
            <TableHeaderColumn key={'theader_2'}>Giờ bắt đầu</TableHeaderColumn>
            <TableHeaderColumn key={'theader_1'}>Thời gian giám sát</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody className="mornitor-tablebody">
          {
            this.state.listObjectTracking.map(node=>{
              return(
                  <ObjectTrackingItem modeid={this.props.ModeId}  node={node} key={node.id}/>
              )
            })
          }
        </TableBody>
      </Table>
    )
  }
}
