import React from 'react';
import {ListItem} from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import Toggle from 'material-ui/Toggle';
import axios from 'axios';
import GlobalConstants from '../../../constants/GlobalConstants';

export default class ItemCheckPoints extends React.Component{
  constructor(props){
    super(props);
  }

  addRemoveCheckPoint(event){
    axios.post(GlobalConstants.CHECKPOINT_ROUTE+'add-remove-from-mode',{
      state:event.target.checked,
      checkpoint_id:this.props.Node.id,
      mode_id:this.props.ModeId
    })
    .then(function(response){
      console.log(response.data);
    }.bind(this))
    .catch(function(err){
      console.log(err);
    });
  }

  render(){  
    return(
      <ListItem
        primaryText={this.props.Node.name}
        leftCheckbox={<Checkbox defaultChecked={this.props.Availabled}
        onClick={this.addRemoveCheckPoint.bind(this)} />}
        />
    )
  }
}
