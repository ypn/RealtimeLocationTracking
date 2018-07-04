import React from 'react';
import ReportTableMaster from './ReportTableMaster';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import ListModeTracking from './ListModeTracking';
import Button from '@material-ui/core/Button';
import Save from '@material-ui/icons/Save';
import Divider from '@material-ui/core/Divider';
import moment from 'moment';
import axios from 'axios';
import GlobalConstant from '../../../../constants/GlobalConstants';
import * as Actions from '../../../actions/Actions';

const ReportContext = React.createContext();

export default class RootReportSynthetic extends React.Component{
  constructor(props){
    super(props);
    this.listMode = [];
  }

  getList(target,state){
    if(state){
      this.listMode = [...this.listMode,target];
    }else{
      var index = this.listMode.indexOf(target);
      if(index > -1){
        this.listMode.splice(index,1);
      }
    }
  }

  getReportTracking(){
    axios.post(GlobalConstant.REPORT_ROUTE + 'get-violate-subject',{
      listMode:this.listMode,
      from_date:$('#from_date').val(),
      to_date:$('#to_date').val()
    })
    .then(function(response){
        Actions.loadReportData(response.data);
    }.bind(this))
    .catch(function(err){

    });
  }

  render(){
    return(
      <div>
        <div>
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <h3 style={{margin:0}}>Chọn tiêu chí lọc</h3>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <div className="col-md-7">
                <ListModeTracking getList = {this.getList.bind(this)}/>
              </div>
              <div className="col-md-5">
                <TextField
                  id="from_date"
                  label="Chọn từ ngày"
                  type="date"
                  defaultValue={moment().subtract(7, 'days').format('YYYY-MM-DD')}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />

                <TextField
                  id="to_date"
                  label="Đến ngày"
                  type="date"
                  style={{marginLeft:"35px"}}
                  defaultValue={moment().format('YYYY-MM-DD')}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>
            </ExpansionPanelDetails>
            <Divider/>
            <div className="col-md-12" style={{margin:"15px"}}>
              <Button onClick={this.getReportTracking.bind(this)}  variant="contained" color="primary">Xem</Button>
            </div>
          </ExpansionPanel>
        </div>
            <ReportTableMaster/>
      </div>
    )
  }
}
