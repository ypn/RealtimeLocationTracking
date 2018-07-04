import dispatcher from '../dispatcher/dispatcher';

export function loadTrackedObject(mode_id,offset){
  dispatcher.dispatch({
    type:'LOAD_TRACKED_OBJECT',
    mode_id,
    offset
  })
}

export function loadReportData(data){
  dispatcher.dispatch({
    type:'LOAD_REPORT_DATA',
    data
  })
}
