import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import DatePicker from 'material-ui/DatePicker';
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


export default class RootReportComponent extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      mode:{
         id:-1,
         display_property:null,
         object_owner:null
      },
      listMode:[]
    }
    axios.post(GlobalConstants.MODE_TRACKING_ROUTE + 'list-enabled')
    .then(function(response){
      if(response.data.status == 'success'){
        this.setState({
          listMode:response.data.list,
          mode:{
            id:response.data.list[0].id,
            display_property:response.data.list[0].display_property,
            object_owner:response.data.list[0].object_owner
          }
        });
      }
    }.bind(this))
    .catch(function(err){

    });
  }

  handleChange(event, index, value){
    this.setState({value});

    axios.post(GlobalConstants.MODE_TRACKING_ROUTE  + 'get',{
      id:value
    })
    .then(function(response){
      console.log(response.data);
    })
    .catch(function(err){

    })
  }

  render(){
    return(
      <div className="component-content-viewer">
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
              this.state.mode.id!=-1 ?   <ReportTable DisplayProperty = {this.state.mode.display_property} modeid={this.state.mode.id}/> : null
            }

          </div>
        </div>
      </div>
    )
  }
}
