import React from 'react';
import axios from 'axios';
import GlobalConstants from '../../../constants/GlobalConstants';

export default class ItemTimeLine extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      checkpoint:null
    }

    axios.post(GlobalConstants.CHECKPOINT_ROUTE + 'get',{
      id:this.props.data.checkpointID
    })
    .then(function(response){
      this.setState({
        checkpoint:response.data.item.name
      })
    }.bind(this))
    .catch(function(err){

    })

  }
  render(){
    var _class = this.props.data.type ==1 ? "primary" : 'warning';
    var _state = this.props.data.type == 1 ? "vào trong" : "ra ngoài";
    return(
      <li className="timeline-item">
        <div className={"timeline-badge"  + " " + _class}><i className="glyphicon glyphicon-check"></i></div>
        <div className="timeline-panel">
          <div className="timeline-heading">
            <h4 className="timeline-title">{this.props.data.time_at}</h4>
            <p><small className="text-muted"><i className="glyphicon glyphicon-time">Đối tượng <b><u>{_state}</u></b> {this.state.checkpoint}</i></small></p>
          </div>
        </div>
      </li>
    )
  }
}
