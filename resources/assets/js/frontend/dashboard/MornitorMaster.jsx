import React,{Component} from 'react';
import * as Actions from '../actions/Actions';
import Stores from '../stores/Stores';
import Note from './Note';
import TableObjectTracking from './TableObjectTracking';
import {Tabs, Tab} from 'material-ui/Tabs';
import axios from 'axios';
import GlobalConstants from '../../constants/GlobalConstants';
import logo from './logo.png';

const socket = io(GlobalConstants.REALTIME_SERVER_URL);

export default class MornitorMaster extends Component{

  constructor(props){
    super(props);
    this.state = {
      listTrackingCar:[],
      listModes:[],
      showTable:this.props.ShowTable
    }

    axios.post(GlobalConstants.MODE_TRACKING_ROUTE + 'list-enabled')
    .then(function(response){
      if(response.data.status == 'success'){
        this.setState({
          listModes:response.data.list
        });
      }

    }.bind(this))
    .catch(function(err){
      console.log(err);
    });

    socket.on('step_into_checkpoint',function(data){
      Actions.SessionStepInCheckPoint(data.data);
    });

    socket.on('session_step_out_checkpoint',function(data){      
      Actions.SessionStepOutCheckPoint(data.data);
    });
  }

  componentDidMount (){
    setTimeout(function(){
      Actions.getListAllOnObjectTraking();
    },100);
  }

  componentWillUnmount(){
    Stores.removeAllListeners();
  }

  render(){
    var offsetY = this.props.ShowTable ? 0 : 270;
    return(
      <div>
        <div style={{
            transform:`translate(0,${offsetY}px)`
          }} className="mornitor-master-wrapper">
          <div className="monitor-content">
            <Tabs>
              {
                this.state.listModes.map((node,k)=>{
                  return(
                    <Tab label = {node.name} key={k} >
                      <div>
                      <TableObjectTracking ModeId={node.id} DisplayProperty={node.display_property}/>
                      </div>
                    </Tab>
                  )
                })
              }
            </Tabs>
            <Note/>
          </div>
        </div>
        <div style={{
            position:'fixed',
            fontSize:'15px',
            right:'10px',
            bottom:'5px',
            zIndex:999,
            color:'#ddd'
          }}>
          &copy;Designed by Pham Nhu Y in &nbsp;<img src={logo}/>
        </div>
      </div>
    )
  }
}
