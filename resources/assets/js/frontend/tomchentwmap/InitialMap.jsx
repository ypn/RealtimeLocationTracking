import React,{Component} from 'react';
import{
  withGoogleMap,
  GoogleMap,
  InfoWindow,
  Marker,
  Polyline,
  Polygon,
} from 'react-google-maps';
import Stores from '../stores/Stores';
import axios from 'axios';

const  mapOption = {
  draggableCursor: 'default',
  draggingCursor: 'pointer',
  mapTypeId: 'satellite',
}

import GlobalConstants from '../../constants/GlobalConstants';

const socket = io(GlobalConstants.REALTIME_SERVER_URL);

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
      props.polygons.map((pg,k)=>{
        return(
          <Polygon
            key = {k}
            path = {pg.path}
            options = {pg.options}
          />
        )
      })
    }
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
                <div>
                  <h6>{mk.mode_name}</h6>
                  <span>{mk.object_tracking}</span>
                </div>
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
        polylines:[],
        checkpoints:[],
        polygons:[]
      }
    }

    componentDidMount(){
      var _self = this;

      axios.post(GlobalConstants.CHECKPOINT_ROUTE + 'list').
      then(function(response){

        var list = response.data.list;

        for(let i=0; i<list.length ; i++){
           let path = JSON.parse(list[i].polygon);
           _self.setState({
             polygons:[..._self.state.polygons,{
               isShowed: true,
               options:{
                 strokeWeight:1,
                 strokeColor:'orange',
                 fillColor:'#00bcd4b8'
               },
               path:path
             }]
           })

        }

      })
      .catch(function(err){
        console.log(err);
      })

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
              mode_name:objects[i].mode_name,
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

      socket.on('start_new_marker',function(data){
        let obj = JSON.parse(data.data);
        let pos = JSON.parse(JSON.stringify(eval("(" + obj.current_position + ")")));
        _self.setState({
          markers:[..._self.state.markers,{
            id:obj.id,
            position:{
              lat:pos.lat,
              lng:pos.lng
            },
            object_tracking:obj.object_tracking,
            mode_name:obj.mode_name,
            showInfo:true
          }],

          polylines:[..._self.state.polylines,{
            id:obj.id,
            isShowed: true,
            options:{
              strokeWeight:4,
              strokeColor:obj.path_color !=null ? obj.path_color : 'orange'
            },
            path:[]
          }]

        });
      });

      socket.on('remove_marker',function(data){
        _self.setState({
          markers:_self.state.markers.filter(obj=>{
            return obj.id!= data.sessionId
          }),
          polylines:_self.state.polylines.filter(obj=>{
            return obj.id!= data.sessionId
          })
        });
      })

      socket.on('location_change',function(data){
        _self.setState({
          markers:_self.state.markers.map(mk=>{
            if(mk.id == data.id){
              mk.position = {
                lat:data.position.lat,
                lng:data.position.lng
              }
            }
            return mk;
          }),
          polylines:_self.state.polylines.map(pl=>{
            if(pl.id == data.id){
              pl.path = [ ...pl.path,{
                lat:data.position.lat,
                lng:data.position.lng
              }]
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

          polygons = {this.state.polygons}

          onMarkerClick = {this.onClick.bind(this)}

          handleMarkerClose = {this.onHandleMarkerClose.bind(this)}
        />

      </div>
      )
    }
}
