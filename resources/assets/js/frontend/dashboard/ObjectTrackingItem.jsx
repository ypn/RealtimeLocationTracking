/*
* created by: ypn
* Hiển thị danh sách và trạng thái các xe đang được theo dõi.
*/

import React from 'react';
import Stores from '../stores/Stores';
import * as Actions from '../actions/Actions';
import { HuePicker } from 'react-color';
import Toggle from 'material-ui/Toggle';
import moment from 'moment';
import {
  TableRow,TableRowColumn
} from 'material-ui/Table';

const styles = {
  toggle: {
    marginBottom: 16,
  }
};

export default class ObjectTrackingItem extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <TableRow>
        <TableRowColumn>do</TableRowColumn>      
        <TableRowColumn>
          <div><Toggle style={styles.toggle}/></div></TableRowColumn>
        <TableRowColumn>16m4-8033</TableRowColumn>
        <TableRowColumn>40m:30s</TableRowColumn>
        <TableRowColumn>40m:30s</TableRowColumn>
        <TableRowColumn>40m:30s</TableRowColumn>
      </TableRow>
    )
  }
}
