import React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

import { Link } from "react-router-dom";

import axios from 'axios';

import Toggle from 'material-ui/Toggle';
import Checkbox from 'material-ui/Checkbox';
const styles = {
  toggle: {
    marginBottom: 16,
  }
};

import _ from 'lodash';

export default class ListModes extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      listModes:[]
    }

    axios.post('/api/v1/mode-tracking/list')
    .then(function(response){    
      if(response.data.status=='success'){
        this.setState({
          listModes:response.data.list
        })
      }
    }.bind(this))
    .catch(function(err){

    })
  }


  deleteMode(id,table_reference){
    var result = confirm("Bạn sẽ xóa tất cả danh sách đối tượng theo dõi nằm trong chế độ này! Bạn có chắc chắn muốn tiếp tục?");
    if (result) {
      axios.post('/api/v1/mode-tracking/del',{id,table_reference})
      .then(function(response){
        if(response.data.status=='success'){
          this.setState({
            listModes: _.remove(this.state.listModes,node=>{
              return node.id!=id;
            })
          })
        }
      }.bind(this))
      .catch(function(err){
        console.log(err);
      });
    }
  }

  toggleStateMode(id){
    axios.post('/api/v1/mode-tracking/update-state',{id})
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
            <TableHeaderColumn>Tên chế độ giám sát</TableHeaderColumn>
            <TableHeaderColumn>Đối tượng giám sát</TableHeaderColumn>
            <TableHeaderColumn>Trạng thái</TableHeaderColumn>
            <TableHeaderColumn>Xóa/Sửa</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            this.state.listModes.map((node,key)=>{
              return(
                <TableRow key={key}>
                  <TableRowColumn>1</TableRowColumn>
                  <TableRowColumn>{node.name}</TableRowColumn>
                  <TableRowColumn>{node.object_tracking}</TableRowColumn>
                  <TableRowColumn>
                    <Toggle
                        onToggle = {this.toggleStateMode.bind(this,node.id)}
                        defaultToggled={node.state?true:false}
                        style={styles.toggle}
                      />
                  </TableRowColumn>
                  <TableRowColumn>
                    <a onClick={this.deleteMode.bind(this,node.id,node.table_reference)} href="javascript:void(0);">Xóa</a>
                    /
                    <Link to={"/app/mode-tracking/edit/" + node.id}>Sửa</Link>
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
