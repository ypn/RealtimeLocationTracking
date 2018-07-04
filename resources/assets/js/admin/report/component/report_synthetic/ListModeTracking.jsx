import React from 'react';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import axios from 'axios';
import GlobalConstant from '../../../../constants/GlobalConstants';

export default class ListModeTracking extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      list:[]
    };
  }

  componentWillMount(){
    axios.post(GlobalConstant.MODE_TRACKING_ROUTE + 'list-enabled')
    .then(function(response){
        if(response.data.status=='success'){
          this.setState({
            list:response.data.list
          });
        }

    }.bind(this))
    .catch(function(err){
      alert("Xem log để biết chi tiết lỗi!");
      console.log(err);
    });
  }

  handleChange(target,event) {
    this.props.getList(target,event.target.checked);  
  };

  render(){
    return(
      <FormControl component="fieldset">
        <FormLabel component="legend">Chế độ theo dõi</FormLabel>
        <FormGroup   style={{display:"inline-block"}}>
          {
            this.state.list.map((node,k)=>{
              return(
                <FormControlLabel
                  key={node.id}
                  control={
                    <Checkbox
                      color="primary"
                      onChange={this.handleChange.bind(this,node.id)}
                    />
                  }
                  label={node.name}
                />
              )
            })
          }
        </FormGroup>
      </FormControl>
    )
  }
}
