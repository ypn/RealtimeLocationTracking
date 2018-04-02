import React,{Component} from 'react';
import CarTrackedItem from './CarTrackedItem';
import * as Actions from '../../actions/Actions';
import Stores from '../../stores/Stores';
import TableHeader from './TableHeader';
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
        <table className="table dashboard-table">
          <TableHeader/>
          <tbody>
            {
              this.state.listTrackingCar.map((node,k)=>{
                return(
                    <CarTrackedItem pathColor = {node.path_color} key = {k} status = {node.status} bienso={node.bienso} index={k} id={node.id} created = {node.created_at} />
                )
              })
            }

          </tbody>
        </table>

        </div>
      </div>
    )
  }
}
