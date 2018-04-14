import React,{Component} from 'react';
import * as Actions from '../actions/Actions';
import Stores from '../stores/Stores';
import TableObjectTracking from './TableObjectTracking';
import {Tabs, Tab} from 'material-ui/Tabs';
import axios from 'axios';
import GlobalConstants from '../../constants/GlobalConstants';


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

  }

  componentDidMount (){
    setTimeout(function(){
      Actions.getListAllOnObjectTraking();
    },10);
  }

  componentWillUnmount(){
    Stores.removeAllListeners();
  }

  render(){
    var offsetY = this.props.ShowTable ? 0 : 270;
    return(
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
        </div>
      </div>
    )
  }
}
