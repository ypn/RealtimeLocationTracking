import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import DatePicker from 'material-ui/DatePicker';
import Stores from '../../stores/Stores';
import * as Actions from '../../actions/Actions';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

import GlobalConstants from '../../../constants/GlobalConstants';
import axios from 'axios';

import ReportTable from './ReportTable';

const styles = {
  customWidth: {
    width: 150,
  },
};

const List = () => (
  <h1>
    Danh sách theo dõi
  </h1>
);



export default class RootReportComponent extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      mode:{
         id:-1,
         table_reference:null,
         display_property:'availabe',
         object_owner:null
      },
      listMode:[]
    }
    axios.post(GlobalConstants.MODE_TRACKING_ROUTE + 'list-enabled')
    .then(function(response){
      if(response.data.status == 'success'){

        Actions.loadTrackedObject(response.data.list[0].id,0);
        this.setState({
          listMode:response.data.list,
          mode:response.data.list[0],
          value:response.data.list[0].id
        });
      }
    }.bind(this))
    .catch(function(err){
      alert('xem log để biết lỗi!');
      console.log(err);
    });
  }

  handleChange(event, index, value){
    axios.post(GlobalConstants.MODE_TRACKING_ROUTE + 'get',{
      id:value
    })
    .then(function(response){
      this.setState({
        value,
        mode:response.data
      });
    }.bind(this))
    .catch(function(err){
      alert('Xem log để biết chi tiết lỗi!');
      console.log(err);
    })

    Actions.loadTrackedObject(value,0);
  }

  render(){
    return(
      <div>
        <div className="tab-title">
          <h3>
            Báo cáo lịch sử giám sát
          </h3>
        </div>
        <div className="row component-content-viewer">
          <div>
            <div className="col-md-4">
              <SelectField
                floatingLabelText="Chọn chế độ theo dõi"
                value={this.state.value}
                onChange={this.handleChange.bind(this)}
              >
              {
                this.state.listMode.map((node,k)=>{
                  return(
                    <MenuItem key={k} value={node.id} primaryText={node.name} />
                  )
                })
              }
              </SelectField>
            </div>

            <div className="col-md-4">
              <DatePicker floatingLabelText="Xuất bản ghi từ ngày" mode="landscape" />
            </div>

            <div className="col-md-4">
              <DatePicker floatingLabelText="Đến ngày" mode="landscape" />
            </div>
          </div>

          <div>
            <div  className="col-md-12">
              {
                this.state.mode.id!=-1 ?   <ReportTable mode={this.state.mode}/> : null
              }

            </div>
          </div>
        </div>
      </div>
    )
  }
}
