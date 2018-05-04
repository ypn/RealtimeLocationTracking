import React from 'react';

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
      defaultZoom={17}
      defaultOptions = {mapOption}
      defaultCenter = {{lat:20.903975, lng: 106.629445}}
      onClick={(event)=>{
        props.onMapClick({lat:event.latLng.lat(),lng:event.latLng.lng()})
      }}
    >
    {
      props.markers.map((mk,k)=>{
        return(
          <Marker key={k}  position = {mk.position}/>
        )
      })
    }
    <Polygon
        paths = {props.pathPolygon}
        options = {options}
      >
    </Polygon>
  </GoogleMap>
  )
})

export default class MapComponent extends React.Component{
    constructor(props){
      super(props);    
      this.state = {
        markers:[],
        pathPolygon:this.props.pathPolygon
      }
    }

    onMapClick(latLng){
      this.setState({
        markers:[...this.state.markers,{position:latLng}],
        pathPolygon:[...this.state.pathPolygon,latLng]
      });
      this.props.UpdatePolygon(this.state.pathPolygon);
    }

    deletePolygon(){
      this.setState({
        markers:[],
        pathPolygon:[]
      });

      this.props.UpdatePolygon([]);
    }

    render(){
      return(
        <div style = {{
          width:"100%",
          height:"500px",
          position:'relative'
        }}>
        <button style={{
            position:'absolute',top:'80px',right:'13px',zIndex:99
          }} onClick={this.deletePolygon.bind(this)}>Xóa</button>
        <br/>
        <InitialMap
          containerElement = {
            <div style = {{height:"100%"}}/>
          }
          mapElement = {
            <div style = {{height:"100%"}}/>
          }

          markers = {this.state.markers}

          pathPolygon = {this.state.pathPolygon}

          onMapClick = {this.onMapClick.bind(this)}
        />
      </div>
      )
    }
}
