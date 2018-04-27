import React from 'react';
import Stores from '../stores/Stores';

export default class TimeCheckPoint extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      status:this.props.node.status,
      time:parseInt(this.props.totaltime)
    }
    this.listInterval = new Array();
  }

  componentWillMount(){

    var _self = this;

    if(this.state.status == 1){
      _self.listInterval[`checkpoint_${_self.props.node.checkpointId}`] = setInterval(function(){
        _self.setState({
            time:_self.state.time+1
        })
      },1000);
    }

    Stores.on(`session_step_in_checkpoint_${_self.props.sessionid}_${_self.props.node.checkpointId}`,function(data){
      _self.setState({
        status:1
      });
      _self.listInterval[`checkpoint_${_self.props.node.checkpointId}`] = setInterval(function(){
        _self.setState({
            time:_self.state.time+1
        })
      },1000);
    });

    Stores.on(`session_step_out_checkpoint_${_self.props.sessionid}_${_self.props.node.checkpointId}`,function(data){
      _self.setState({
        status:2
      });

      if(_self.listInterval[`checkpoint_${_self.props.node.checkpointId}`] !='undefined'){
        clearInterval(_self.listInterval[`checkpoint_${_self.props.node.checkpointId}`]);
      }
    })
  }

  componentWillUnmount(){  
    for(var i=0; i< this.listInterval.length ; i++){
      clearInterval(this.listInterval[i]);
    }
  }


  render(){
    var time;
    var _class='';

    var minutes = Math.floor(this.state.time / 60);
    var seconds = this.state.time - minutes * 60;
    time = `${minutes} m : ${seconds} s`;

    switch (this.state.status) {
      case 2:
        _class = 'row-stop';
        break;
      case 1:
        _class = 'row-active'
        break;
      default:
        time = '--/--';
        break;
    }

    if(this.state.time > this.props.node.max_time) _class='row-danger';


    return(
      <div className={_class} style={{
          width:'100%',
          height:'100%',
          padding:'15px 24px'
        }}>
        {time}
      </div>
    )
  }
}
