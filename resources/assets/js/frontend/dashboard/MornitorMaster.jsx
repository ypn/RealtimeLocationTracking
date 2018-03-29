import React,{Component} from 'react';
import CarTrackedItem from './CarTrackedItem';
import * as Actions from '../actions/Actions';
import Stores from '../stores/Stores';
import TableHeader from './TableHeader';
import TableObjectTracking from './TableObjectTracking';
import {Tabs, Tab} from 'material-ui/Tabs';

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
};

export default class MornitorMaster extends Component{

  constructor(props){
    super(props);
    this.state = {
      listTrackingCar:[]
    }

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
            <Tab label="Item One" >
              <div>
              <TableObjectTracking/>
              </div>
            </Tab>
            <Tab label="Item Two" >
              <div>
                <h2 style={styles.headline}>Tab Two</h2>
                <p>
                  This is another example tab.
                </p>
              </div>
            </Tab>
            <Tab
              label="onActive"
              data-route="/home"
            >
              <div>
                <h2 style={styles.headline}>Tab Three</h2>
                <p>
                  This is a third example tab.
                </p>
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
    )
  }
}
