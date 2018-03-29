import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';

import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';

import axios from 'axios';
import Constants from '../../constants/Constants';

export default class AddNewObjectTracking extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      value: -1,
      listMode:[],
      submitForm:null,
      isSubmitted:false
    };

    axios.post(Constants.MODE_TRACKING_ROUTE + 'minimal-list',
    {
      required:[
        'name',
        'id',
        'table_reference'
      ],
      _token:$('meta[name="csrf-token"]').attr('content')
    })
    .then(function(response){
      this.setState({
        listMode:response.data
      });
    }.bind(this))
    .catch(function(err){
      console.log(err);
    });

  }

  handleChange(event, index, value){
    this.setState({value});

    axios.post(Constants.MODE_TRACKING_ROUTE + 'get',{id:value})
    .then(function(response){
      this.setState({
        submitForm:response.data
      });
      console.log(response.data);
    }.bind(this))
    .catch(function(err){
      console.log(err);
    })

  }

  submitForm(table){
    var data = {
      object_name : $('#object_name').val(),
      organization: $('#organization').val(),
    }

    if(document.getElementById('object_owner')){
      data.object_owner = $('#object_owner').val();
    }

    if(document.getElementById('phone_number')){
      data.phone_number = $('#phone_number').val();
    }

    if(document.getElementById('identification')){
      data.identification = $('#identification').val();
    }

    this.setState({
      isSubmitted:true
    });

    axios.post(Constants.OBJECT_TRACKING_ROUTE + 'create',{
        table,data
    })
    .then(function(response){
      if(response.data.status=='success'){
        alert('Thêm thành công!');
      }
      else{
        alert('Thêm không thành công! Xem console.log để biết chi tiết');
        console.log(response.data.message);
      }
      this.setState({
        isSubmitted:false
      });
    }.bind(this))
    .catch(function(err){
      alert('Thêm không thành công. Xem log để biêt thêm chi tiết!');
      console.log(err);
      this.setState({
        isSubmitted:false
      });
    }.bind(this))
  }

  render(){
    return(
      <div>
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
        <br/>
        {this.state.submitForm!=null?(
          <div>
            <TextField
              id="object_name"
              ref="object_name"
              hintText={this.state.submitForm.display_property}
              floatingLabelText={this.state.submitForm.display_property}
            /><br/>
            {
              this.state.submitForm.object_owner!=null?(
                <div>
                <TextField
                    id="object_owner"
                    ref="object_owner"
                    hintText={this.state.submitForm.object_owner}
                    floatingLabelText={this.state.submitForm.object_owner}
                  />
                <br/>
                </div>
              ):null
            }
            <TextField
                id="organization"
                ref="organization"
                hintText="Đơn vị"
                floatingLabelText="Đơn vị"
              />
            <br/>
            {
              this.state.submitForm.is_required_phone_number==1?(
                <div>
                <TextField
                    id="phone_number"
                    ref="phone_number"
                    hintText="Số điện thoại"
                    floatingLabelText="Số điện thoại"
                  /><br/>
                </div>
              ):null
            }
            {
              this.state.submitForm.is_required_identification==1?(
                <div>
                <TextField
                    id="identification"
                    ref="identification"
                    hintText="Số chứng minh thư"
                    floatingLabelText="Số chứng minh thư"
                  /><br/>
                </div>
              ):null
            }
            <br/>
            <RaisedButton
                disabled = {this.state.isSubmitted}
                onClick={this.submitForm.bind(this,this.state.submitForm.table_reference)}
                label="Lưu"
                primary={true}
                icon={<FontIcon className="material-icons">save</FontIcon>}
              />
          </div>
        ):null}
      </div>
    )
  }
}
