import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

import React from 'react';
import AppBar from 'material-ui/AppBar';
import {Route, Link } from "react-router-dom";


import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

import RootModeTracking from './mode_tracking/component/RootModeTracking';
import RootObjectTracking from './object_tracking/component/RootObjectTracking';

const AppBarExampleIcon = () => (
  <AppBar
    title="Title"
    iconClassNameRight="muidocs-icon-navigation-expand-more"
  />
);

const Realtime = () => (
  <div>
    <h2>Realtime</h2>
  </div>
);

const Checkpoints = () => (
  <div>
    <h2>Checkpoints</h2>
  </div>
);

const ModeTracking = () => (
  <RootModeTracking/>
);

const ObjectTracking = () => (
  <RootObjectTracking/>
);

const Settings = () => (
  <div>
    <h2>Settings</h2>
  </div>
);

export default class AdminMaster extends React.Component{
  render(){
    return(
      <MuiThemeProvider>
        <div>
          <AppBarExampleIcon/>
          <Drawer containerClassName="root-drawer">
            <div className="drawer-avatar">

            </div>
            <Link to="/app/realtime"><MenuItem>Giám sát thời gian thực</MenuItem></Link>
            <Link to="/app/checkpoints"><MenuItem>Trạm giám sát</MenuItem></Link>
            <Link to="/app/mode-tracking"><MenuItem>Chế độ giám sát</MenuItem></Link>
            <Link to="/app/object-tracking"><MenuItem>Đối tượng giám sát</MenuItem></Link>
            <Link to="/app/settings"><MenuItem>Cài đặt</MenuItem></Link>
          </Drawer>
          <div className="root-content">
            <Route exact path="/app/realtime" component={Realtime} />
            <Route exact path="/app/checkpoints" component={Checkpoints} />
            <Route path="/app/mode-tracking" component={ModeTracking} />
            <Route path="/app/object-tracking" component={ObjectTracking} />
            <Route path="/app/settings" component={Settings} />
          </div>

        </div>
      </MuiThemeProvider>
    )
  }
}
