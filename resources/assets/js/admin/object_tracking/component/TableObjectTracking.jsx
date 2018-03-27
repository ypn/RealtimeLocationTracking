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
    console.log('Load Data:' + this.props.ModeProperty.name);
    axios.post(Constants.OBJECT_TRACKING_ROUTE+'list',{
      table:this.props.ModeProperty.table_reference
    })
    .then(function(response){
      this.setState({
        listObject:response.data
      })
      console.log(response.data);
    }.bind(this))
    .catch(function(err){
      console.log(err);
    })
  }

  componentDidMount(){
    console.log('did mount');
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
            <TableHeaderColumn></TableHeaderColumn>
          </TableRow>
        </TableHeader>

        <TableBody>
          {
            this.state.listObject.map((node,k)=>{
              return(
                <TableRow key={k}>
                  <TableRowColumn>1</TableRowColumn>
                  <TableRowColumn>John Smith</TableRowColumn>
                  <TableRowColumn>Employed</TableRowColumn>
                </TableRow>
              )
            })
          }
        </TableBody>
      </Table>
    )
  }
}
