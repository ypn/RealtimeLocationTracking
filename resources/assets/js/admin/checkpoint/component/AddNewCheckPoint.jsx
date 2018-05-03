import React from 'react';
import TextField from 'material-ui/TextField';
import MapComponent from './MapComponent';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import axios from 'axios';
import SaveIcon from 'material-ui/svg-icons/content/save';

import GlobalConstants from '../../../constants/GlobalConstants';

export default class AddNewCheckPoint extends React.Component{
  constructor(props){
    super(props);
    this.pathPolygon=[];
  }

  submitForm(){
    if($('#checkpoint_name').val()==''||$('#checkpoint_time').val()==''){
      alert('Tên checkpoint và thời gian định mức không thể trống');
      return;
    }

    if(this.pathPolygon.length < 3){
      alert('Cần xác định vùng diện tích trạm giám sát');
    }

    axios.post(GlobalConstants.CHECKPOINT_ROUTE + 'create',{
      checkpoint_name : $('#checkpoint_name').val(),
      checkpoint_time : $("#checkpoint_time").val(),
      description:$('#description').val(),
      polygon:this.pathPolygon
    })
    .then(function(response){
      if(response.data.status == 'success'){
        alert('Thêm trạm theo dõi ' + $('#checkpoint_name').val() + ' thành công');
      }else{
        alert('Xử lý lỗi, xem log để biết chi tiết');
        console.log(response.data);
      }
    })
    .catch(function(err){
      console.log(err);
    })

  }

  updatePolygon(pathPolygon){
    this.pathPolygon = pathPolygon;
  }

  render(){
    return(
      <div>
        <TextField
          id="checkpoint_name"
          hintText="Nhập tên trạm theo dõi"
          floatingLabelText="Tên trạm theo dõi"
        />
        <TextField
            id = "checkpoint_time"
            type="number"
            hintText="Nhập thời gian định mức theo phút"
            floatingLabelText="Thời gian định mức theo phút"
            style={{marginLeft:15}}
          /><br />

        <TextField
          id='description'
          hintText="Diễn giải ngắn gọn về trạm giám sát"
          floatingLabelText="Diễn giải"
          multiLine={true}
          fullWidth={true}
          rows={3}
        />

      <h3>Xác định phạm vi trạm theo dõi</h3>

      <MapComponent pathPolygon={[]} UpdatePolygon = {this.updatePolygon.bind(this)}/>
      <br/>
      <br/>
      <RaisedButton
          onClick={this.submitForm.bind(this)}
          label="Lưu"
          primary={true}
          icon={<SaveIcon/>}
        />
      </div>
    )
  }
}
