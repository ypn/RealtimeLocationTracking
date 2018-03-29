import React,{Component} from 'react';
import CarTrackedItem from './CarTrackedItem';
import * as Actions from '../actions/Actions';
import Stores from '../stores/Stores';
import TableHeader from './TableHeader';
import TableObjectTracking from './TableObjectTracking';
import {Tabs, Tab} from 'material-ui/Tabs';
import axios from 'axios';
import GlobalConstants from '../../constants/GlobalConstants';

export default class MornitorMaster extends Component{

  constructor(props){
    super(props);
    this.state = {
      listTrackingCar:[],
      listModes:[]
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

    });

  }

  componentWillMount(){
    Stores.on('load_list_tracking_car',()=>{
      this.setState({
        listTrackingCar:Stores.getListTrackingCar()
      });
    });

    Stores.on('new_session_was_add_to_track',()=>{
      this.setState({
        listTrackingCar:Stores.getListTrackingCar()
      });
    });

    Stores.on('stop_session_tracking',()=>{
      this.setState({
        listTrackingCar:Stores.getListTrackingCar()
      });
    });

    Actions.getListTrakingCar();
  }

  componentWillUnmount(){
    Stores.removeAllListeners();
  }

  render(){
    return(
      <div className="mornitor-master-wrapper">
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
