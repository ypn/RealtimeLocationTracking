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

    axios.post(Constants.MODE_TRACKING_ROUTE + 'minimal-list',{required:['name','id']})
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

  submitForm(modeId,data){
    axios(Constants.OBJECT_TRACKING_ROUTE + 'create',{

    })
    .then(function(reponse){
      
    })
    .catch(function(err){

    })
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
              id="display_property"
              hintText={this.state.submitForm.display_property}
              floatingLabelText={this.state.submitForm.display_property}
            /><br/>
            {
              this.state.submitForm.object_owner!=null?(
                <div>
                <TextField
                    id="display_property"
                    hintText={this.state.submitForm.object_owner}
                    floatingLabelText={this.state.submitForm.object_owner}
                  />
                <br/>
                </div>
              ):null
            }
            <TextField
                id="organization"
                hintText="Đơn vị"
                floatingLabelText="Đơn vị"
              />
            <br/>
            {
              this.state.submitForm.is_required_phone_number==1?(
                <div>
                <TextField
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
                    hintText="Số chứng minh thư"
                    floatingLabelText="Số chứng minh thư"
                  /><br/>
                </div>
              ):null
            }
            <RaisedButton
                disabled = {this.state.isSubmitted}
                onClick={this.submitForm.bind(this)}
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
