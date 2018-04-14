import React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

import Constants from '../../constants/Constants';
import axios from 'axios';


export default class TableObjectTracking extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      listObject:[]
    }
  }

  componentWillMount(){
    if((this.state.listObject).length !=0){
      return;
    }
    axios.post(Constants.OBJECT_TRACKING_ROUTE+'list',{
      table:this.props.ModeProperty.table_reference
    })
    .then(function(response){
      if(response.data.status == 'success'){
        this.setState({
          listObject:response.data.list
        })
      }
    }.bind(this))
    .catch(function(err){
      console.log(err);
    })
  }

  destroyItem(table,id){
    var result = confirm("Nhấn OK để xác nhận xóa bản ghi!");
    if(result){

      axios.post(Constants.OBJECT_TRACKING_ROUTE + 'remove',{table,id})
      .then(function(response){
        console.log(response.data);
        if(response.data.status=='success' && response.data.message!=0){
          this.setState({
            listObject:this.state.listObject.filter(obj=>{
              return obj.id!=id;
            })
          })
        }
      }.bind(this))
      .catch(function(err){
        console.log(err);
      })
    }
  }

  render(){
    return(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderColumn>STT</TableHeaderColumn>
            <TableHeaderColumn>{(this.props.ModeProperty.display_property).toUpperCase()}</TableHeaderColumn>
            {
              this.props.ModeProperty.object_owner!=null?(
                <TableHeaderColumn>{(this.props.ModeProperty.object_owner).toUpperCase()}</TableHeaderColumn>
              ):null
            }
            <TableHeaderColumn>ĐƠN VỊ</TableHeaderColumn>
            {
              this.props.ModeProperty.is_required_phone_number==1?(
                <TableHeaderColumn>SỐ ĐIỆN THOẠI</TableHeaderColumn>
              ):null
            }
            <TableHeaderColumn>Xóa/Sửa</TableHeaderColumn>
          </TableRow>
        </TableHeader>

        <TableBody>
          {
            this.state.listObject.map((node,k)=>{
              return(
                <TableRow key={k}>
                  <TableRowColumn>1</TableRowColumn>
                  <TableRowColumn>{node.object_name}</TableRowColumn>
                  {
                    this.props.ModeProperty.object_owner!=null?(
                      <TableRowColumn>{node.object_owner}</TableRowColumn>
                    ):null
                  }
                  <TableRowColumn>{node.organization}</TableRowColumn>
                  {
                    this.props.ModeProperty.is_required_phone_number==1?(
                      <TableRowColumn>{node.phone_number}</TableRowColumn>
                    ):null
                  }
                  <TableRowColumn>
                    <a href="javascript:void(0)" onClick={this.destroyItem.bind(this,this.props.ModeProperty.table_reference,node.id)}>Xóa</a>
                    /
                    <a href="javascript:void(0)">Sửa</a>
                  </TableRowColumn>
                </TableRow>
              )
            })
          }
        </TableBody>
      </Table>
    )
  }
}
