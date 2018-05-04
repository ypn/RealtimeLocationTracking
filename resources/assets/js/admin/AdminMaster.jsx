import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

import React from 'react';
import AppBar from 'material-ui/AppBar';
import {Route, NavLink } from "react-router-dom";


import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

import RootModeTracking from './mode_tracking/component/RootModeTracking';
import RootObjectTracking from './object_tracking/component/RootObjectTracking';
import RootCheckPointsComponent from './checkpoint/component/RootCheckPointComponent';
import RootReportComponent from './report/component/RootReportComponent';

import ContentInbox from 'material-ui/svg-icons/content/inbox';
import IconSettings from 'material-ui/svg-icons/action/settings';
import IconCheckPoint from 'material-ui/svg-icons/communication/location-on';
import IconMode from 'material-ui/svg-icons/device/usb';
import IconObject from 'material-ui/svg-icons/maps/directions-bus';

import IconButton from 'material-ui/IconButton';

import HomePage from 'material-ui/svg-icons/action/home';



class AppBarExampleIcon extends React.Component {
  render(){
    return(
      <AppBar
        title="Dashboard"
        iconElementLeft={<IconButton><a href="/"><HomePage style={{color:'#fff'}} /></a></IconButton>}
      />
    )
  }
}

const Report = () => (
  <RootReportComponent/>
);

const Checkpoints = () => (
  <RootCheckPointsComponent/>
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
              <div className="drawer-avatar"></div>
              <NavLink to="/app/report" activeClassName="active"><MenuItem leftIcon={<ContentInbox />} className="menu-item">Báo cáo</MenuItem></NavLink>
              <NavLink to="/app/checkpoint" activeClassName="active"><MenuItem leftIcon={<IconCheckPoint />} className="menu-item">Trạm giám sát</MenuItem></NavLink>
              <NavLink to="/app/mode-tracking" activeClassName="active"><MenuItem leftIcon={<IconMode />} className="menu-item">Chế độ giám sát</MenuItem></NavLink>
              <NavLink to="/app/object-tracking" activeClassName="active"><MenuItem leftIcon={<IconObject />} className="menu-item">Đối tượng giám sát</MenuItem></NavLink>
              <NavLink to="/app/settings" activeClassName="active"><MenuItem leftIcon={<IconSettings />} className="menu-item">Cài đặt</MenuItem></NavLink>
            </Drawer>
            <div className="root-content">
              <Route exact path="/app" component={Report} />
              <Route exact path="/app/report" component={Report} />
              <Route exact path="/app/checkpoint" component={Checkpoints} />
              <Route path="/app/mode-tracking" component={ModeTracking} />
              <Route path="/app/object-tracking" component={ObjectTracking} />
              <Route path="/app/settings" component={Settings} />
            </div>
          </div>
        </MuiThemeProvider>
    )
  }
}
