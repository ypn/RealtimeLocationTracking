import React from 'react';
import GlobalConstants from '../constants/GlobalConstants';
import ChartSpeed from '../admin/report/component/ChartSpeed';
import axios from 'axios';
import{
  withGoogleMap,
  GoogleMap,
  InfoWindow,
  Marker,
  Polygon,
  Polyline
} from 'react-google-maps';

const  mapOption = {
  draggableCursor: 'default',
  draggingCursor: 'pointer',
  mapTypeId: 'satellite',
}

const InitialMap = withGoogleMap(props=>{
  return(
    <GoogleMap
      ref={props.onMapLoad}
      defaultZoom={16}
      defaultOptions = {mapOption}
      defaultCenter = {{lat:20.903975, lng: 106.629445}}
    >

    <Polyline
        path = {props.polyline.path}
        options = {props.polyline.options}
      >
    </Polyline>
    {
      props.currPos!=null ? (
        <Marker
          position = {props.currPos}
        />
    ):null
    }


  </GoogleMap>
  )
})


export default class ReportMaster extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      currPos:null,
      polyline:{
        options:{
          strokeWeight:4,
          strokeColor:'orange'
        },
        path:[]
      },
    }

  }

  callbackChart(obji){
    this.setState({
      currPos:{
        lat:parseFloat(obji.lat),
        lng:parseFloat(obji.lng)
      }
    })
  }

  componentWillMount(){
    axios.post(GlobalConstants.REPORT_ROUTE + 'get-detail',{
      id:sessionId
    })
    .then(function(response){
      if(response.data.status == 'success'){
        var polyline = response.data.data.path;
        let path  =[];
        let flightPlanCoordinates = JSON.parse(polyline);

        for(let i = 0 ;i <flightPlanCoordinates.length; i++){
          let obj =JSON.parse(flightPlanCoordinates[i]);
          path.push(obj);
        }

        this.setState({
          polyline:{
            options:{
              strokeWeight:4,
              strokeColor:'orange'
            },
            path:path
          }
        });

      }

    }.bind(this))
    .catch(function(err){
      alert('Xem log để biết chi tiết lỗi!');
      console.log(err);
    });
  }


  render(){
    return(
      <div style = {{
        width:"100%",
        height:"100%",
        position:'relative'
      }}>
      <div style={{
        position: 'absolute',
        bottom: '15px',
        left: '15px',
        right:'15px',
        width: 'auto',
        background: '#23527c70',
        overflowX:"scroll",
        zIndex: 99,
        border: '1px solid #98b2ec'
      }}>

      <ChartSpeed MyData = {this.state.polyline.path} CallBack = {this.callbackChart.bind(this)}/>


      </div>


        <InitialMap
          containerElement = {
            <div style = {{height:"100%"}}/>
          }
          mapElement = {
            <div style = {{height:"100%"}}/>
          }

          currPos = {this.state.currPos}

          polyline = {this.state.polyline}
        />

      </div>
    )
  }
}
