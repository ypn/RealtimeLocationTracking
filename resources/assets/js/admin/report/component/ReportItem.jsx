import React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

/**
 * A simple table demonstrating the hierarchy of the `Table` component and its sub-components.
 */
export default class ReportItem extends React.Component {
  render(){
    return(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderColumn>Biển số xe</TableHeaderColumn>
            <TableHeaderColumn>Lái xe</TableHeaderColumn>
            <TableHeaderColumn>Bắt đầu</TableHeaderColumn>
            <TableHeaderColumn>Kết thúc</TableHeaderColumn>
            <TableHeaderColumn>Cổng</TableHeaderColumn>
            <TableHeaderColumn>Nhà cân</TableHeaderColumn>
            <TableHeaderColumn>Bãi phế</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableRowColumn>122121</TableRowColumn>
            <TableRowColumn>John Smith</TableRowColumn>
            <TableRowColumn>Employed</TableRowColumn>
            <TableRowColumn>122121</TableRowColumn>
            <TableRowColumn>John Smith</TableRowColumn>
            <TableRowColumn>Employed</TableRowColumn>
            <TableRowColumn>Employed</TableRowColumn>
          </TableRow>
        </TableBody>
      </Table>
    )
  }
}
