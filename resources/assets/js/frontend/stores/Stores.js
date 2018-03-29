import {EventEmitter} from 'events';
import dispatcher from '../dispatcher/dispatcher';
import axios from 'axios';

class CarTrackerStore extends EventEmitter {

  constructor(){
    super();
    this.listTrackingCar = [];
    this.listMarkersObject = [];
    this.listPolylines = [];
  }


  loadObjectsOnTracking($modeId){
    
  }

  /**
   * Load danh sách xe đang kiểm tra.
   */
  loadListTrackingCar(){
      this.listTrackingCar = [];
      this.listMarkersObject = [];
      axios.get('/quanlyxeravao/session-tracking/list').then(response=>{
      var objects = response.data;
      for(let i= 0;i<objects.length;i++){
        let pos = JSON.parse(JSON.stringify(eval("(" + objects[i].current_position + ")")));

        this.listTrackingCar.push({
          bienso:objects[i].bienso,
          id:objects[i].id,
          status:objects[i].status,
          path_color:objects[i].path_color!=null ? objects[i].path_color : 'orange',
          created_at:objects[i].created_at
        });

        this.listMarkersObject.push({
          id:objects[i].id,
          position:{
            lat:pos.lat,
            lng:pos.lng
          },
          bienso:objects[i].bienso,
          showInfo:true
        });

        let flightPlanCoordinates = JSON.parse(objects[i].car_positions);
        let path  =[];

        for(let i = 0 ;i <flightPlanCoordinates.length; i++){
          let obj = eval('(' + JSON.parse(JSON.stringify(flightPlanCoordinates[i])) + ')');
          path.push(obj);
        }

        this.listPolylines.push({
          id:objects[i].id,
          isShowed: false,
          options:{
            strokeWeight:4,
            strokeColor:objects[i].path_color!=null ? objects[i].path_color :'orange'
          },
          path:path
        });

      }
      this.emit('ypn',objects.length);
      this.emit('load_list_tracking_car');
    });
  }

  /**
   * Xe vào điểm kiểm tra.
   */
  sessionStepInCheckPoint(data){
    this.emit(`session_step_in_checkpoint_${data.data.checkpointId}`);
    this.emit(`session_${data.data.sessionId}_step_in_checkpoint`,{data:data});
  }

  /**
   * Xe ra khỏi điểm kiểm tra.
   */
  SessionStepOutCheckPoint(data){
    this.emit(`session_step_out_checkpoint_${data.data.checkpointId}`);
    this.emit(`session_${data.data.sessionId}_step_out_checkpoint`,{data:data});
  }

  detectNewSession(data){
    let d = JSON.parse(data.data);
    this.listTrackingCar.push(d);
    let ob = {
      id:d.id,
      position:{
        lat:data.position.lat,
        lng: data.position.lng
      },
      bienso:d.bienso,
      showInfo:true
    }
    let pl = {
      id:d.id,
      isShowed: false,
      options:{
        strokeWeight:4,
        strokeColor:d.path_color!=null? d.path_color : 'orange'
      },
      path:[]
    }

    this.listMarkersObject.push(ob);
    this.listPolylines.push(pl);

    this.emit('new_session_was_add_to_track');
  }

  updatePosition(data){
    this.emit('update_marker',{data});
  }

  stopTracking(sessionId){
    var index = this.listTrackingCar.findIndex(session => session.id == sessionId);
    this.listTrackingCar.splice(index,1);
    this.listMarkersObject.splice(index,1);
    this.listPolylines.splice(index,1);
    this.emit('stop_session_tracking');
  }

  togglePath(id){
    this.emit('togglePath',id);
  }

  changePathColor(id,pathColor){
    this.emit('change_path_color',{id,pathColor})
  }

  handleAction(action){
    switch (action.type) {
      case 'SESSION_STEP_IN_CHECKPOINT':
        this.sessionStepInCheckPoint(action.data)
        break;
      case 'SESSION_STEP_OUT_CHECKPOINT':
        this.SessionStepOutCheckPoint(action.data);
        break;
      case 'GET_LIST_TRACKING_CAR':
        this.loadListTrackingCar();
        break;
      case 'NEW_SESSION_DETECTED':
        this.detectNewSession(action.data);
        break;
      case 'STOP_TRACKING':
        this.stopTracking(action.sessionId);
        break;
      case 'UPDATE_POSITION':
        this.updatePosition(action.data);
        break;
      case 'TOGGLE_PATH':
        this.togglePath(action.id);
        break;
      case 'CHANGE_PATH_COLOR':
        this.changePathColor(action.id,action.pathColor);
        break;
    }
  }

  getTotal(){
    return this.listTrackingCar.length;
  }

  getListTrackingCar(){
    return this.listTrackingCar;
  }

  getListPolylines(){
    return this.listPolylines;
  }

  getListMarkerObject(){
    return this.listMarkersObject;
  }
}

const Store = new CarTrackerStore();
dispatcher.register(Store.handleAction.bind(Store));
export default Store;
