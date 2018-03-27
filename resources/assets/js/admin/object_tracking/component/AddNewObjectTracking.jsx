import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import axios from 'axios';
import Constants from '../../constants/Constants';

export default class AddNewObjectTracking extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      value: -1,
      listMode:[]
    };

    axios.post(Constants.MODE_TRACKING_ROUTE + 'minimal-list',{required:['name','id']})
    .then(function(response){
      this.setState({
        listMode:response.data
      })
    }.bind(this))
    .catch(function(err){
      console.log(err);
    });

  }

  handleChange(event, index, value){
    this.setState({value});

    axios.post(Constants.MODE_TRACKING_ROUTE + 'get',{id:value})
    .then(function(response){
      console.log(response.data);
    })
    .catch(function(err){
      console.log(err);
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
      </div>
    )
  }
}
