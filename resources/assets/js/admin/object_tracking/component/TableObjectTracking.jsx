import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import Pagination from 'material-ui-pagination';
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
      isLoadComplete:false,
      listObject:[],
      currentPage:1,
      full_length:0,
    }
  }

  componentWillMount(){
    if((this.state.listObject).length !=0){
      return;
    }
    axios.post(Constants.OBJECT_TRACKING_ROUTE+'list-pagination',{
      table:this.props.ModeProperty.table_reference,
      current_page:this.state.currentPage
    })
    .then(function(response){
      if(response.data.status == 'success'){
        this.setState({
          listObject:response.data.list,
          isLoadComplete:true,
          full_length:response.data.full_length
        });
      }
    }.bind(this))
    .catch(function(err){
      this.setState({
        isLoadComplete:false
      })
      alert('Có lỗi! Xem log để biết thêm chi tiết');
      console.log(err);
    })
  }

  destroyItem(table,id){
    var result = confirm("Nhấn OK để xác nhận xóa bản ghi!");
    if(result){
      axios.post(Constants.OBJECT_TRACKING_ROUTE + 'remove',{table,id})
      .then(function(response){
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

  changePagination(number){
    this.setState({
      currentPage:number
    });

    axios.post(Constants.OBJECT_TRACKING_ROUTE+'list-pagination',{
      table:this.props.ModeProperty.table_reference,
      current_page:number
    })
    .then(function(response){    
      if(response.data.status == 'success'){
        this.setState({
          listObject:response.data.list,
          full_length:response.data.full_length,
          isLoadComplete:true
        });
      }
    }.bind(this))
    .catch(function(err){
      this.setState({
        isLoadComplete:false
      })
      alert('Có lỗi! Xem log để biết thêm chi tiết');
      console.log(err);
    })
  }

  render(){
    return(
      <div>
        {
          this.state.isLoadComplete ? (
            <div>
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
                        <TableRowColumn>{k+1}</TableRowColumn>
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
            <br/>
            <Pagination
              total = {this.state.full_length}
              current = { this.state.currentPage }
              display = { 10 }
              onChange = { this.changePagination.bind(this) }
            />
            </div>
          ):(
            <CircularProgress
              style={{
                position:'fixed',
                top:'50%',
                left:'50%',
                margin:'15px'
              }}
            />
          )
        }
      </div>
    )
  }
}
