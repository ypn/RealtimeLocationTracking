import React from 'react';
import GlobalConstants from '../../../constants/GlobalConstants';
import axios from 'axios';
import TimeLine from './TimeLine';
import './style.css';

import ReportItem from './ReportItem';

import{
  withGoogleMap,
  GoogleMap,
  InfoWindow,
  Marker,
  Polygon,
  Polyline
} from 'react-google-maps';

const options = {
  strokeColor: 'rgb(0, 188, 212)',
  strokeOpacity: 0.8,
  strokeWeight: 1,
  fillColor: 'rgb(0, 188, 212)',
  fillOpacity: 0.35
}

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
    {
      props.showMarker ? (
        <Marker
          position = {props.posMarker}
        />
    ):null
    }

    <Polyline
        path = {props.polyline.path}
        options = {props.polyline.options}
      >
    </Polyline>
  </GoogleMap>
  )
})

export default class ReportDetail extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        isReplay:true,
        showMarker:false,
        posMarker:null,
        timeline:[],
        polyline:{
          options:{
            strokeWeight:4,
            strokeColor:'orange'
          },
          path:[]
        },
      }
    }

    replayMove(){
      if(this.state.isReplay){
        var _self = this;
        var _path = this.state.polyline.path;
        this.setState({
          showMarker:true,
          isReplay:false
        })

        for (let i=1; i<_path.length; i++) {
            setTimeout( function timer(){
              _self.setState({
                posMarker:_path[i]
              })
              if(i == _path.length-1){
                _self.setState({
                  isReplay:true
                })
              }
            }, i*500 );
        }
      }

    }

    componentWillMount(){
      axios.post(GlobalConstants.REPORT_ROUTE + 'get-detail',{
        id:this.props.reportIndex
      })
      .then(function(response){
        if(response.data.status == 'success'){
          var polyline = response.data.data.path;
          let path  =[];
          let flightPlanCoordinates = JSON.parse(polyline);

          for(let i = 0 ;i <flightPlanCoordinates.length; i++){
            let obj = eval('(' + JSON.parse(JSON.stringify(flightPlanCoordinates[i])) + ')');
            path.push(obj);
          }

          this.setState({
            polyline:{
              options:{
                strokeWeight:4,
                strokeColor:'orange'
              },
              path:path
            },
            time_start:response.data.data.created_at,
            time_end:response.data.data.ended_at,
            timeline:JSON.parse(response.data.data.timeline)
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
        <button style={{
            position:'absolute',top:'80px',right:'13px',zIndex:99
          }} onClick={this.replayMove.bind(this)}>Replay</button>

        <div style={{
          position: 'absolute',
          bottom: '15px',
          left: '15px',
          right:'15px',
          width: 'auto',
          background: '#23527c70',
          zIndex: 99,
          border: '1px solid #98b2ec'
        }}>
        {
          this.state.timeline!=null ? (
            <TimeLine createdAt = {this.state.time_start} endedAt ={this.state.time_end} timelineeee = {this.state.timeline}/>
          ):null
        }


        </div>



        <InitialMap
          containerElement = {
            <div style = {{height:"100%"}}/>
          }
          mapElement = {
            <div style = {{height:"100%"}}/>
          }

          polyline = {this.state.polyline}

          showMarker = {this.state.showMarker}

          posMarker = {this.state.posMarker}

        />


      </div>
      )
    }
}
