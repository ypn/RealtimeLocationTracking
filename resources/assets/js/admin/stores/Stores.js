import {EventEmitter} from 'events';
import dispatcher from '../dispatcher/dispatcher';
import axios from 'axios';
import GlobalConstants from '../../constants/GlobalConstants';

class AdminStores extends EventEmitter {

  loadTrackedObject(mode_id,offset){
      axios.post(GlobalConstants.REPORT_ROUTE + 'list-object-tracked',{
        id:mode_id,
        offset
      })
      .then(function(response){
        if(response.data.status=='success'){
          this.emit('list-object-tracked-in-mode',{data:response.data});
        }
      }.bind(this))
      .catch(function(err){
        console.log(err);
      })
  }

  loadReportData(data){
    this.emit('load-report-data',data);
  }

  handleAction(action){
    switch (action.type) {
      case 'LOAD_TRACKED_OBJECT':
        this.loadTrackedObject(action.mode_id,action.offset);
        break;
      case 'LOAD_REPORT_DATA':
        this.loadReportData(action.data);
      default:
    }
  }
}

const Stores = new AdminStores();
dispatcher.register(Stores.handleAction.bind(Stores));

export default Stores;
