import React,{Component} from 'react';
import{
  withGoogleMap,
  GoogleMap,
  InfoWindow,
  Marker,
  Polyline
} from 'react-google-maps';
import Stores from '../stores/Stores';
import * as Actions from '../actions/Actions';
//import MornitorMaster from '../dashboard/MornitorMaster';

const  mapOption = {
  draggableCursor: 'default',
  draggingCursor: 'pointer',
  mapTypeId: 'satellite',
}

const InitialMap = withGoogleMap(props=>{
  var mk= props.markers
  return(
    <GoogleMap
      ref={props.onMapLoad}
      defaultZoom={16}
      defaultCenter = {{lat:20.903975, lng: 106.629445}}
      defaultOptions={mapOption}
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
      props.markers.map((mk,k)=>{
        return(
          <Marker
            key = {k}
            position = {mk.position}
            onClick = {()=>{props.onMarkerClick(mk)}}
          >{
            mk.showInfo &&
            <InfoWindow
              onCloseClick = {()=>props.handleMarkerClose(mk)}
            >
              {
                <div><h6>{mk.object_tracking}</h6></div>
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

    componentDidMount(){
      var _self = this;
      Stores.on('list-all-on-object-tracking',function(){
        var objects = Stores.getListAllOnObjectTracking();

        for(let i=0;i<objects.length;i++){
          let pos = JSON.parse(JSON.stringify(eval("(" + objects[i].current_position + ")")));

          let flightPlanCoordinates = JSON.parse(objects[i].path);
          let path  =[];
          for(let i = 0 ;i <flightPlanCoordinates.length; i++){
            let obj = eval('(' + JSON.parse(JSON.stringify(flightPlanCoordinates[i])) + ')');
            path.push(obj);
          }

          _self.setState({
            markers:[..._self.state.markers,{
              id:objects[i].id,
              position:{
                lat:pos.lat,
                lng:pos.lng
              },
              object_tracking:objects[i].object_tracking,
              showInfo:true
            }],
            polylines:[..._self.state.polylines,{
              id:objects[i].id,
              isShowed: true,
              options:{
                strokeWeight:4,
                strokeColor:objects[i].path_color!=null? objects[i].path_color : 'orange'
              },
              path:path
            }]
          })
        }
      });

      Stores.on('change_path_color',function(data){
        console.log(data);
        _self.setState({
          polylines:_self.state.polylines.map(pl=>{
            if(pl.id==data.id){
              pl.options = {
                strokeWeight:4,
                strokeColor:data.pathColor
              }
            }
            return pl;
          })
        })
      })

      Stores.on('togglePath',function(id){
        _self.setState({
          polylines:_self.state.polylines.map(pl=>{
            if(pl.id == id){
              pl.isShowed = !pl.isShowed;
            }

            return pl;
          })
        });
      });
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
          width:"100%",
          height:"95vh"
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
