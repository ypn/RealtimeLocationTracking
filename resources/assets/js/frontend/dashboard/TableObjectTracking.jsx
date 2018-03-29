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

import ObjectTrackingItem from './ObjectTrackingItem';

const styles = {
  toggle: {
    marginBottom: 16,
  }
};


export default class TableObjectTracking extends React.Component{
  render(){
    return(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderColumn>STT</TableHeaderColumn>
            <TableHeaderColumn>Màu đường đi</TableHeaderColumn>
            <TableHeaderColumn>Hiện đường đi</TableHeaderColumn>
            <TableHeaderColumn>Nhà cân</TableHeaderColumn>
            <TableHeaderColumn>Bãi phế</TableHeaderColumn>
            <TableHeaderColumn>Giờ bắt đầu</TableHeaderColumn>
            <TableHeaderColumn>Thời gian giám sát</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody className="mornitor-tablebody">
          <TableRow>
            <TableRowColumn>do</TableRowColumn>
            <TableRowColumn>
              <div><Toggle style={styles.toggle}/></div></TableRowColumn>
            <TableRowColumn>16m4-8033</TableRowColumn>
            <TableRowColumn>40m:30s</TableRowColumn>
            <TableRowColumn>40m:30s</TableRowColumn>
            <TableRowColumn>40m:30s</TableRowColumn>
            <TableRowColumn>40m:30s</TableRowColumn>
          </TableRow>
        </TableBody>
      </Table>
    )
  }
}
