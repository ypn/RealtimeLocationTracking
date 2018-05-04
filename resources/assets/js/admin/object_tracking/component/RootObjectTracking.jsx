import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import ActionAndroid from 'material-ui/svg-icons/action/android';
import FontIcon from 'material-ui/FontIcon';
import Divider from 'material-ui/Divider';
import IconList from 'material-ui/svg-icons/action/list';
import IconListAdd from 'material-ui/svg-icons/av/playlist-add';
import ReactTooltip from 'react-tooltip'
import IconButton from 'material-ui/IconButton';

import {Route, NavLink } from "react-router-dom";

import AddNewObjectTracking from './AddNewObjectTracking';
import ListObjectTracking from './ListObjectTracking';

const styles = {
  button: {
    margin: 12,
  },
  exampleImageInput: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0,
  },
};

const List = ()=>(
  <ListObjectTracking/>
);

const Add = () => (
    <AddNewObjectTracking/>
)



export default class RootObjectTracking extends React.Component{
  render(){
    return(
      <div>
        <div className="control-tool-bar">
          <NavLink activeClassName="_active"  to="/app/object-tracking/list">
            <IconButton
              data-tip="Danh sách"
              iconStyle={{
                color:'#ddd'
              }}
            >{<IconList/>}</IconButton><ReactTooltip />
          </NavLink>
          <NavLink activeClassName="_active" to="/app/object-tracking/add">
            <IconButton
              data-tip="Thêm mới"
              iconStyle={{
                  color:'#ddd'
              }

              }

            >{<IconListAdd/>}</IconButton><ReactTooltip />
          </NavLink>
        </div>
        <Divider />
        <div className="component-content-viewer">
          <Route exact path="/app/object-tracking" component={List} />
          <Route exact path="/app/object-tracking/list" component={List} />
          <Route path="/app/object-tracking/add" component={Add} />
        </div>
      </div>
    )
  }
}
