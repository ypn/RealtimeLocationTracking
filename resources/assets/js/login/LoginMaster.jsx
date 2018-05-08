import React from 'react';
import {Card} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextFieldIcon from 'material-ui-textfield-icon';
import Person from 'material-ui/svg-icons/maps/person-pin';
import Lock from 'material-ui/svg-icons/action/lock';
import GlobalConstant from '../constants/GlobalConstants';
import axios from 'axios';


export default class LoginMaster extends React.Component {

  constructor(props){
    super(props);
  }

  submitForm(){
    axios.post(GlobalConstant.LOGIN_ROUTE,{
      username:$('#username').val(),
      password:$('#password').val()
    })
    .then(function(response){
      if(response.data!=false){
        window.location.href = "/app";
      }
    }.bind(this))
    .catch(function(err){

    });
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
      <div className="login-title">
        <span>Đăng nhập</span>
      </div>
      <Card style={
          {  padding:'25px',
            paddingBottom:'15px',
            boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)'
          }
        }>
        <br/>
        <TextFieldIcon
          id="username"
          hintText="Tên tài khoản"
          floatingLabelText="Tên tài khoản"
          fullWidth="true"
          icon={<Person/>}
        /><br />
        <TextFieldIcon
          id="password"
          hintText="Mật khẩu"
          floatingLabelText="Mật khẩu"
          type="password"
          fullWidth="true"
          icon={<Lock/>}
        /><br />
      <br/>
      <RaisedButton onClick={this.submitForm.bind(this)} label="Đăng nhập" primary={true}/>
      </Card>
      <div style={{
          position:'fixed',
          bottom:'15px',
          left:'15px',
          color:'#fff',
          fontWeight:'bold',
          fontSize:'20px'
        }}>
        <a style={{color:'#ddd'}} href="/">Trang chủ</a>
      </div>
    </div>
    </MuiThemeProvider>
    );
  }
}
