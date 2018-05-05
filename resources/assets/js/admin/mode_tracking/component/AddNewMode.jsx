import React from 'react';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import ActionAndroid from 'material-ui/svg-icons/action/android';
import FontIcon from 'material-ui/FontIcon';
import SaveIcon from 'material-ui/svg-icons/content/save';

import axios from 'axios';

const styles = {
  checkbox: {
    marginBottom: 16,
  }
};

const error = {
  errorTextModeName: "Tên chế độ theo dõi không thể để trống",
  errorObjectName : "Tên đối tượng theo dõi không thể để trống",
  errorDisplayProperty:"Tên đối tượng theo dõi không thể để trống"
}


export default class AddNewMode extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      errorTextModeName: '',
      errorObjectName:'',
      errorDisplayProperty:'',
      isSubmitted:false,
      responseError:false,
      responseErrorMessage:null
    }
  }


  onChangee(stateKey,errorText,event) {
     if (event.target.value!='') {
       this.setState({ [stateKey]: '' })
     } else {
       this.setState({ [stateKey]:errorText})
     }
   }

   onDataSubmit(){
     if(
       this.checkTextInput(this.refs.mode_name,"errorTextModeName",error.errorTextModeName)
       &&
       this.checkTextInput(this.refs.object_name,"errorObjectName",error.errorObjectName)
       &&
       this.checkTextInput(this.refs.display_property,"errorDisplayProperty",error.errorDisplayProperty)
     ){
       this.setState({isSubmitted:true});
       axios.post('/api/v1/mode-tracking/add',{
         _token:$('meta[name="csrf-token"]').attr('content'),
         mode_name:$('#mode_name').val(),
         object_name:$('#object_name').val(),
         display_property:$('#display_property').val(),
         object_owner:$('#object_owner').val(),
         is_identitication:$('#is_identitication').is(':checked'),
         is_phone_number:$('#is_phone_number').is(':checked')
       })
       .then(function(response){
         if(response.data.status=='success' && response.data.status_code==201){
           this.setState({
             responseError:false
           });
           alert("Đã thêm chế độ theo dõi mới thành công");
         }else{
           this.setState({
             responseError:true,
             responseErrorMessage:response.data.message
           })
         }
         this.setState({isSubmitted:false});
       }.bind(this))
       .catch(function(err){
         this.setState({
           responseError:true,
           responseErrorMessage:err
         });
         console.log(err);
         this.setState({isSubmitted:false});
       }.bind(this));

     }else{
       //alert('Cần điền đầy đủ thông tin vào các trường');
     }
   }

  checkTextInput(component,stateKey,errorText){
    if(component.input.value!=''){
      this.setState({ [stateKey]: '' });
      return true;
    } else {
      this.setState({ [stateKey]:errorText});
      return false;
    }
  }

  closeAlertError(){
    this.setState({
       responseError:false,
    })
  }


  render(){
    return(
      <div>
        <div className="tab-title">
          <h3>
            Thêm chế độ giám sát mới
          </h3>
        </div>
        <div>
          {
            this.state.responseError?(
              <div className="alert alert-danger" role="alert">
                <button onClick={this.closeAlertError.bind(this)} type="button" className="close-alert">×</button>
                <h4>Thêm mới không thành công!</h4>
                {this.state.responseErrorMessage}
              </div>
            ):null
          }

          <TextField id="mode_name"
             ref="mode_name"
             hintText="Nhập tên chế độ giám sát"
             floatingLabelText="Tên chế độ giám sát"
             errorText= {this.state.errorTextModeName}
             onChange={this.onChangee.bind(this,"errorTextModeName",error.errorTextModeName)}
           /><br />

           <TextField
              id="object_name"
              ref="object_name"
              hintText="Nhập tên đối tượng giám sát"
              floatingLabelText="Tên đối tượng giám sát"
              errorText= {this.state.errorObjectName}
              onChange={this.onChangee.bind(this,"errorObjectName",error.errorObjectName)}

            /><br />

          <TextField
               id="display_property"
               ref="display_property"
               hintText="Nhập thuộc tính hiển thị"
               floatingLabelText="Thuộc tính hiển thị"
               errorText= {this.state.errorDisplayProperty}
               onChange={this.onChangee.bind(this,"errorDisplayProperty",error.errorDisplayProperty)}
             /><br />

           <TextField
                id="object_owner"
                hintText="Nhập đối tượng chủ quản nếu có"
                floatingLabelText="Đối tượng chủ quản"
              /><br />
            <br/>
            <Checkbox
              id="is_identitication"
              label="Yêu cầu số chứng minh thư"
              style={styles.checkbox}
            /><br/>
            <Checkbox
              id ="is_phone_number"
              label="Yêu cầu số điện thoại"
              style={styles.checkbox}
            /><br/>

            <RaisedButton
              disabled ={this.state.isSubmitted}
              onClick={this.onDataSubmit.bind(this)}
              label="Lưu"            
              primary={true}
              icon={<SaveIcon/>}
            />
        </div>
      </div>
    )
  }
}
