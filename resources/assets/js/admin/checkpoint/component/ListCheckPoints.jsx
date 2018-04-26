import React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

import axios from 'axios';
import GlobalConstants from '../../../constants/GlobalConstants';


export default class ListCheckPoints extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      listCheckPoints:[]
    }

    axios.post(GlobalConstants.CHECKPOINT_ROUTE + 'list')
    .then(function(response){
      console.log(response);
      if(response.data.status=='success'){
        this.setState({
          listCheckPoints:response.data.list
        });
      }
    }.bind(this))
    .catch(function(err){
      console.log(err);
    })
  }

  render(){
    return(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderColumn>STT</TableHeaderColumn>
            <TableHeaderColumn>Tên trạm giám sát</TableHeaderColumn>
            <TableHeaderColumn>Mô tả</TableHeaderColumn>
            <TableHeaderColumn>Thời gian định mức</TableHeaderColumn>
            <TableHeaderColumn>Xóa/Sửa</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            this.state.listCheckPoints.map((node,k)=>{

              let min = Math.floor(node.time / 60);
              let sec = node.time - 60 *(min);
              console.log(sec);


              return(
                <TableRow key = {k}>
                  <TableRowColumn>{k+1}</TableRowColumn>
                  <TableRowColumn>{node.name}</TableRowColumn>
                  <TableRowColumn>{node.description}</TableRowColumn>
                  <TableRowColumn>{min + ' phút' + (sec!=0 ?' ' + sec +' giây' : '' )}</TableRowColumn>
                  <TableRowColumn>
                    <a href="javascript:void(0)">Xóa</a>
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
