import React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import Dialog from 'material-ui/Dialog';

import ReportDetail from './ReportDetail';
import * as Actions from '../../actions/Actions';
import Stores from '../../stores/Stores';
import Pagination from 'material-ui-pagination';
import TimeCheckPoint from './TimeCheckPoint';
import FullscreenDialog from 'material-ui-fullscreen-dialog'

import NodeAdd from 'material-ui/svg-icons/action/note-add';
import FontIcon from 'material-ui/FontIcon';

import GlobalConstants from '../../../constants/GlobalConstants';
import axios from 'axios';


const customContentStyle = {
  width: '100%',
  maxWidth: 'none',
  height:'100%',
  maxHeight:'none'
};


/**
 * A simple table demonstrating the hierarchy of the `Table` component and its sub-components.
 */
export default class ReportTable extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      listObject:[],
      full_length:0,
      currentPage:1,
      open:false,
      reportIndex:-1
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

  openModal(id){
    this.setState({
      open:true,
      reportIndex:id
    })
  }

  exportExcel(){
    axios.post(GlobalConstants.REPORT_ROUTE + 'export-excel',{
      name:this.props.mode.name,
      id:this.props.mode.id,
      current_page:this.props.mode.currentPage
    })
    .then(function(response){
      if(response.data !=0){
        window.location='/storage/' + response.data + '.xlsx';
      }
      else{
        alert('Không thể xuất file!');
      }

    })
    .catch(function(err){

    });
  }

  render(){

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        disabled={true}
      />,
    ];

    return(
      <div>
        <RaisedButton icon={<NodeAdd />} label="Excel" onClick = {this.exportExcel.bind(this)} secondary={true} />
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
                          <TableRowColumn key={ki}><TimeCheckPoint node = {n}/></TableRowColumn>
                        )
                      })
                    }
                    <TableRowColumn>
                      <button onClick={this.openModal.bind(this,node.id)}>Chi tiết</button>
                    </TableRowColumn>
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

        <FullscreenDialog
          open={this.state.open}
          onRequestClose={() => this.setState({ open: false })}
          title={'Lịch sử di chuyển'}
          actionButton={<FlatButton
            label='Trở lại'
            onClick={() => this.setState({ open: false })}
          />}
        >
        <ReportDetail   reportIndex = {this.state.reportIndex} />
       </FullscreenDialog>
      </div>
    )
  }
}
