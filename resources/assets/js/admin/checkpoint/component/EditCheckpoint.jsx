import React from 'react';
import TextField from 'material-ui/TextField';
import MapComponent from './MapComponent';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import GlobalConstants from '../../../constants/GlobalConstants';
import SaveIcon from 'material-ui/svg-icons/content/save';
import axios from 'axios';

export default class EditCheckpoint extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      item:null
    }

    axios.post(GlobalConstants.CHECKPOINT_ROUTE + 'get',{
      id:this.props.CheckPointId
    })
    .then(function(response){
      this.setState({
        item:response.data.item
      })
    }.bind(this))
    .catch(function(err){
      console.log(err);
    });

  }

  submitForm(){
    this.state.item = {
      name:$('#checkpoint_name').val(),
      time:$('#checkpoint_time').val(),
      description:$('#description').val(),
      polygon:this.state.item.polygon
    }

    axios.post(GlobalConstants.CHECKPOINT_ROUTE + 'edit',{
      id:this.props.CheckPointId,
      value:this.state.item
    })
    .then(function(response){
      if(response.data ==1 ){
        alert('Cập nhật trạm theo dõi thành công!');
      }else{
        alert('Cập nhật không thành công! Xem log để biết thêm chi tiết');
        console.log(response.data);
      }
    })
    .catch(function(err){
      alert('Xem log để biết thêm chi tiết!');
      console.log(err);
    })
  }

  updatePolygon(pathPolygon){
    this.state.item.polygon = JSON.stringify(pathPolygon);
  }

  render(){
    return(
      <div>
      {
        this.state.item !=null ?(
          <div>
            <TextField
              id="checkpoint_name"
              defaultValue={this.state.item.name}
              floatingLabelText="Tên trạm theo dõi"
            />
            <TextField
                id = "checkpoint_time"
                type="number"
                defaultValue = {this.state.item.time/60}
                floatingLabelText="Thời gian định mức theo phút"
                style={{marginLeft:15}}
              /><br />

            <TextField
              id='description'
              defaultValue={this.state.item.description}
              floatingLabelText="Diễn giải"
              multiLine={true}
              fullWidth={true}
              rows={3}
            />

          <h3>Xác định phạm vi trạm theo dõi</h3>

          <MapComponent pathPolygon={JSON.parse(this.state.item.polygon)} UpdatePolygon = {this.updatePolygon.bind(this)}/>
          <br/>
          <br/>
          <RaisedButton
              onClick={this.submitForm.bind(this)}
              label="Lưu"
              primary={true}
              icon={<SaveIcon/>}
            />
          </div>
        ):null
      }
    </div>
    )
  }
}
