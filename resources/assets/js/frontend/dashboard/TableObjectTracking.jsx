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


export default class TableObjectTracking extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      listObjectTracking:[]
    }

    axios.post(GlobalConstants.OBJECT_TRACKING_ROUTE + 'list-objects-on-tracking',{
      mode_id:this.props.ModeId
    })
    .then(function(response){
      if(response.data.status=='success'){
        console.log(response.data);
        this.setState({
          listObjectTracking:response.data.list
        });
      }
    }.bind(this))
    .catch(function(err){
      console.log(err);
    })
  }

  componentWillMount(){

  }

  render(){
    return(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderColumn>{this.props.DisplayProperty}</TableHeaderColumn>
            <TableHeaderColumn>Màu đường đi</TableHeaderColumn>
            <TableHeaderColumn>Hiện đường đi</TableHeaderColumn>
            <TableHeaderColumn>Nhà cân</TableHeaderColumn>
            <TableHeaderColumn>Bãi phế</TableHeaderColumn>
            <TableHeaderColumn>Giờ bắt đầu</TableHeaderColumn>
            <TableHeaderColumn>Thời gian giám sát</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody className="mornitor-tablebody">
          {
            this.state.listObjectTracking.map((node,key)=>{
              return(
                  <ObjectTrackingItem Data={node} key={key}/>
              )
            })
          }
        </TableBody>
      </Table>
    )
  }
}
