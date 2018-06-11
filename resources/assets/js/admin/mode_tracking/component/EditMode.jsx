import React from 'react';
import {List} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';
import GlobalConstants from '../../../constants/GlobalConstants';
import ItemCheckPoint from './ItemCheckPoint';
import SaveIcon from 'material-ui/svg-icons/content/save';
import TextField from 'material-ui/TextField';
import _ from 'lodash';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    fontFamily:'Roboto'
  },
};


export default class EditMode extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      data:null,
      listCheckPoints :[],
      listInArray:[]
    }

    axios.post(GlobalConstants.MODE_TRACKING_ROUTE+'get',{
      id:this.props.ModeId
    })
    .then(function(response){
      console.log(response.data);
      this.setState({
        data:response.data
      });
    }.bind(this))
    .catch(function(err){

    });

    axios.post(GlobalConstants.CHECKPOINT_ROUTE+'list-enabled',{
      mode_id:this.props.ModeId
    })
    .then(function(response){
        this.setState({
          listInArray:response.data
        });

        axios.post(GlobalConstants.CHECKPOINT_ROUTE + 'list')
        .then(function(response){
          if(response.data.status == 'success'){
            this.setState({
              listCheckPoints:response.data.list
            });
          }
        }.bind(this))
        .catch(function(err){
          console.log(err);
        });
    }.bind(this))
    .catch(function(err){
      console.log(err);
    })
  }


  update(){
    axios.post(GlobalConstants.MODE_TRACKING_ROUTE+'update-mode',{
      mode_id:this.props.ModeId,
      time_frequence:$('#time_frequence').val(),
      list_email_to_send_report:$('#list_email_to_send_report').val(),
      list_email_to_cc_report:$('#list_email_to_cc_report').val()
    })
    .then(function(response){
      //console.log(response.data);
      if(response.data==1){
        alert('Cập nhật thành công');
      }
      else{
        alert(response.data.message);
      }
    })
    .catch(function(err){

    });
  }

  render(){
    return(
      <div style={styles.root}>
        <div className="col-md-12"><h1>{this.state.data!= null ?this.state.data.name:''}</h1></div>
        <div className="col-md-4">
          <div style={{maxHeight: 400, overflow: 'auto'}}>
            <List>
              <Subheader>Danh sách trạm theo dõi</Subheader>
              {
                this.state.listCheckPoints.map((node,k)=>{
                  return(
                    <ItemCheckPoint Availabled={this.state.listInArray.indexOf(node.id)!=-1  ? true : false} ModeId ={this.props.ModeId} Node={node} key = {k}/>
                  )
                })
              }
            </List>
          </div>
        </div>
        <div className="col-md-8">
          <div className="col-md-8">
            <h1 style={{marginBottom:0}}>Configuration</h1>
            <TextField id="time_frequence"
               ref="time_frequence"
               hintText="Tần suất gửi vị trí"
               floatingLabelText="Tần suất gửi vị trí theo giây"
               type="number"
               defaultValue={this.state.data!=null?this.state.data.time_frequency:5}
             /><br />
           <i>Thời gian càng nhỏ, tần suất gửi vị trí của ứng dụng càng dày, báo cáo lộ trình càng chi tiết nhưng sẽ tốn nhiều pin hơn (trung bình 5s).</i>
          <br/>
          {
            this.state.data!=null ?(
              <div>
                <TextField id="list_email_to_send_report"
                     ref="list_email_to_send_report"
                     hintText="Danh sách email nhận báo cáo giám sát."
                     floatingLabelText="Danh sách email nhận báo cáo giám sát."
                     multiLine={true}
                     fullWidth={true}
                     defaultValue={this.state.data.list_email_send}
                     rows={3}
                   /><br />
                 <TextField id="list_email_to_cc_report"
                      ref="list_email_to_cc_report"
                      hintText="Danh sách email đính kèm báo cáo giám sát."
                      floatingLabelText="Danh sách email đính kèm báo cáo giám sát."
                      defaultValue={this.state.data.list_email_cc}
                      multiLine={true}
                      fullWidth={true}
                      rows={3}
                    /><br />
                </div>
              ):null
          }
          </div>
        </div>
        <div className="col-md-12">
          <br/><br/><br/>
          <RaisedButton
            disabled ={this.state.isSubmitted}
            onClick = {this.update.bind(this)}
            className="pull-right"
            label="Cập nhật"
            primary={true}
            icon={<SaveIcon/>} />
        </div>
      </div>
    )
  }
}
