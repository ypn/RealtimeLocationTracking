import React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

import Pagination from 'material-ui-pagination';

/**
 * A simple table demonstrating the hierarchy of the `Table` component and its sub-components.
 */
export default class ReportTable extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      display_property:this.props.DisplayProperty,
      listObject:[1,2,3,4,5,6,7,8,9,10]
    }
  }

  changePagination(number){

  }

  componentWillMount(){
    //alert(this.props.modeid);
  }

  render(){
    //alert(this.props.modeid);
    return(
      <div>
        <br />
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>{this.state.display_property}</TableHeaderColumn>
              <TableHeaderColumn>Đơn vị</TableHeaderColumn>
              <TableHeaderColumn>Giờ bắt đầu</TableHeaderColumn>
              <TableHeaderColumn>Giờ kết thúc</TableHeaderColumn>
              <TableHeaderColumn>Chạm cân</TableHeaderColumn>
              <TableHeaderColumn>Bãi phế</TableHeaderColumn>
              <TableHeaderColumn>Cồng A1</TableHeaderColumn>
              <TableHeaderColumn>Chi tiết</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>

            {
              this.state.listObject.map((node,k)=>{
                return(
                  <TableRow key={k}>
                    <TableHeaderColumn>Nguyen van nam</TableHeaderColumn>
                    <TableHeaderColumn>VJS</TableHeaderColumn>
                    <TableHeaderColumn>14:30</TableHeaderColumn>
                    <TableHeaderColumn>18:00</TableHeaderColumn>
                    <TableHeaderColumn>14m:20s</TableHeaderColumn>
                    <TableHeaderColumn>20m</TableHeaderColumn>
                    <TableHeaderColumn>14m:20s</TableHeaderColumn>
                    <TableHeaderColumn><a href="javascript:void(0);">chi tiet</a></TableHeaderColumn>
                  </TableRow>
                )
              })
            }

          </TableBody>
        </Table>
        <br/>
        <Pagination
          total = { 50 }
          current = { 1 }
          display = { 18}

          onChange = { this.changePagination.bind(this) }
        />
      </div>
    )
  }
}
