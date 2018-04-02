import React from 'react';
import {ListItem} from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import Toggle from 'material-ui/Toggle';
import axios from 'axios';
import GlobalConstants from '../../../constants/GlobalConstants';

export default class ItemCheckPoints extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      checked:false
    }

    axios.post(GlobalConstants.CHECKPOINT_ROUTE+'is-checkpoint-available',{
      checkpoint_id:this.props.Node.id,
      mode_id:this.props.ModeId
    })
    .then(function(response){
      console.log(response.data);
      if(response.data.status=='success' && response.data.item !=null){
        this.setState({
          checked:true
        })
      }
    }.bind(this))
    .catch(function(err){
      console.log(err);
    })
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

  onChangeState(event){
    axios.post(GlobalConstants.CHECKPOINT_ROUTE+'on-changestate-mode-checkpoint',{
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
    var checked = this.state.checked;
    return(
      <ListItem
        primaryText={this.props.Node.name}
        leftCheckbox={<Checkbox defaultChecked={this.props.Availabled}
        onClick={this.addRemoveCheckPoint.bind(this)} />}
        rightToggle={<Toggle onClick={this.onChangeState.bind(this)}
        defaultToggled={this.state.item!=null && this.state.item==1 ? true : false}
        disabled ={this.state.disabled} />}
        />
    )
  }
}
