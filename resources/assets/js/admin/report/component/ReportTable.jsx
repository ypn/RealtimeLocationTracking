import React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

import * as Actions from '../../actions/Actions';
import Stores from '../../stores/Stores';
import Pagination from 'material-ui-pagination';
import TimeCheckPoint from './TimeCheckPoint';

/**
 * A simple table demonstrating the hierarchy of the `Table` component and its sub-components.
 */
export default class ReportTable extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      listObject:[],
      full_length:0,
      currentPage:1
    }
  }

  componentWillMount(){
    var _self = this;
    Stores.on('list-object-tracked-in-mode',function(data){
      _self.setState({
        listObject:data.data.list,
        full_length:data.data.full_length
      })
    })
  }

  changePagination(number){
    this.setState({
      currentPage:number
    })
    Actions.loadTrackedObject(this.props.mode.id,(number-1)*10);
  }

  render(){

    return(
      <div>
        <br />
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>{this.props.mode.display_property}</TableHeaderColumn>
              {
                this.props.mode.object_owner!=null ? (
                  <TableHeaderColumn>{this.props.mode.object_owner}</TableHeaderColumn>
                ):null
              }
              <TableHeaderColumn>Đơn vị</TableHeaderColumn>
              <TableHeaderColumn>Giờ bắt đầu</TableHeaderColumn>
              <TableHeaderColumn>Giờ kết thúc</TableHeaderColumn>
              {
                this.props.mode.checkpoints.map((node,k)=>{
                  return(
                    <TableHeaderColumn key={k}>{node.name}</TableHeaderColumn>
                  )
                })
              }
              <TableHeaderColumn>Chi tiết</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>

            {
              this.state.listObject.map((node,k)=>{
                let _status = JSON.parse(node.status);
                return(
                  <TableRow key={k}>
                    <TableRowColumn>{node.object_tracking}</TableRowColumn>
                    {
                      this.props.mode.object_owner!=null ? (
                        <TableRowColumn>{node.object_info.object_owner}</TableRowColumn>
                      ):null
                    }
                    <TableRowColumn>{node.object_info.organization}</TableRowColumn>
                    <TableRowColumn>{node.created_at}</TableRowColumn>
                    <TableRowColumn>{node.ended_at}</TableRowColumn>
                    {
                      _status.map((n,ki)=>{
                        return(
                          <TableRowColumn key={ki}><TimeCheckPoint/></TableRowColumn>
                        )
                      })
                    }
                    <TableRowColumn><a href="javascript:void(0);">chi tiet</a></TableRowColumn>
                  </TableRow>
                )
              })
            }

          </TableBody>
        </Table>
        <br/>
        <Pagination
          total = {this.state.full_length }
          current = { this.state.currentPage }
          display = { 10 }
          onChange = { this.changePagination.bind(this) }
        />
      </div>
    )
  }
}
