import dispatcher from '../dispatcher/dispatcher';

export function SessionStepInCheckPoint(data){
  dispatcher.dispatch({
    type:'SESSION_STEP_IN_CHECKPOINT',
    data
  })

}

export function SessionStepOutCheckPoint(data){
  dispatcher.dispatch({
    type:'SESSION_STEP_OUT_CHECKPOINT',
    data
  });
}

export function getListTrakingCar(){
  dispatcher.dispatch({
    type:'GET_LIST_TRACKING_CAR'
  });
}

export function newSessionDetected(data){
  dispatcher.dispatch({
    type:'NEW_SESSION_DETECTED',
    data
  });
}

export function stopTracking(sessionId){
    dispatcher.dispatch({
      type:'STOP_TRACKING',
      sessionId
    });
}

export function togglePath(id){
    dispatcher.dispatch({
      type:'TOGGLE_PATH',
      id
    })
}

export function updatePosition(data){
    dispatcher.dispatch({
      type:'UPDATE_POSITION',
      data
    })
}

export function changePathColor(id,pathColor){
  dispatcher.dispatch({
    type:'CHANGE_PATH_COLOR',
    id,
    pathColor
  });
}


//

export function getListAllOnObjectTraking(){
  dispatcher.dispatch({
    type:'GET_LIST_ALL_ON_OBJECT_TRACKING'
  });
}
