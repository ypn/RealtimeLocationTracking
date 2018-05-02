import React from 'react';
import Stores from '../stores/Stores';


export default class TimeCheckPoint extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      status:this.props.node.status,
      time:parseInt(this.props.totaltime)
    }

  }

  tick(){
     this.setState({
       time: (this.state.time + 1)
     });
  }

  componentWillMount(){

    var _self = this;

    if(this.state.status == 1){
      this.interval = setInterval(this.tick.bind(_self),1000);
    }

    Stores.on(`session_step_in_checkpoint_${_self.props.sessionid}_${_self.props.node.checkpointId}`,function(data){
      if(_self.refs.myRef){
        _self.setState({
          status:1
        });
        _self.interval = setInterval(_self.tick.bind(_self),1000);

      }
    });

    Stores.on(`session_step_out_checkpoint_${_self.props.sessionid}_${_self.props.node.checkpointId}`,function(data){
      if(_self.refs.myRef){
        _self.setState({
          status:2
        });

        if(_self.interval != null){
          clearInterval(_self.interval);
        }
      }
    })
  }

  componentWillUnmount(){
    if(this.interval!=null){
      clearInterval(this.interval);
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
      <div ref="myRef" className={_class} style={{
          width:'100%',
          height:'100%',
          padding:'15px 24px'
        }}>
        {time}
      </div>
    )
  }
}
