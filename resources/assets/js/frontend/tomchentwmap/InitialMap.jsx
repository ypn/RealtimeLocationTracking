import React,{Component} from 'react';
import{
  withGoogleMap,
  GoogleMap,
  InfoWindow,
  Marker,
  Polyline
} from 'react-google-maps';
//import Stores from '../../stores/Stores';
//import MornitorMaster from '../dashboard/MornitorMaster';

const InitialMap = withGoogleMap(props=>{
  var mk= props.markers
  return(
    <GoogleMap
      ref={props.onMapLoad}
      defaultZoom={17}
      defaultCenter = {{lat:20.903975, lng: 106.629445}}
      defaultOptions="tilt"
    >
    {
      props.polylines.map((pl,k)=>{
        return(
          pl.isShowed &&
          <Polyline
            key = {k}
            path = {pl.path}
            options = {pl.options}
          />
        )
      })
    }
    {
      props.markers.map(mk=>{
        return(
          <Marker
            defaultZIndex = {mk.index}
            key = {mk.id}
            position = {mk.position}
            onClick = {()=>{props.onMarkerClick(mk)}}
          >{
            mk.showInfo &&
            <InfoWindow
              onCloseClick = {()=>props.handleMarkerClose(mk)}
            >
              {
                <div><h6>{mk.bienso}</h6></div>
              }
            </InfoWindow>
          }
          </Marker>
        )
      })
    }
    </GoogleMap>
  )
})

export default class MapContainer extends Component{
    constructor(props){
      super(props);
      this.state = {
        markers:[],
        polylines:[]
      }
    }

    onClick(mk){
      this.setState({
        markers:this.state.markers.map(marker=>{
          if(marker.id == mk.id) marker.showInfo = !marker.showInfo;
          return marker;
        })
      })
    }

    onHandleMarkerClose(mk){
      this.setState({
        markers:this.state.markers.map(marker=>{
          if(marker.id == mk.id) mk.showInfo = false;
          return marker;
        })
      })
    }

    render(){
      return(
        <div style = {{
          width:"100vw",
          height:"100vh"
        }}>
        <InitialMap
          containerElement = {
            <div style = {{height:"100%"}}/>
          }
          mapElement = {
            <div style = {{height:"100%"}}/>
          }

          markers = {this.state.markers}

          polylines = {this.state.polylines}

          onMarkerClick = {this.onClick.bind(this)}

          handleMarkerClose = {this.onHandleMarkerClose.bind(this)}
        />
      </div>
      )
    }
}
