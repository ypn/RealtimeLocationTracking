import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

import React from 'react';
import AppBar from 'material-ui/AppBar';
import {Route, NavLink ,Switch  } from "react-router-dom";


import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

import RootModeTracking from './mode_tracking/component/RootModeTracking';
import RootObjectTracking from './object_tracking/component/RootObjectTracking';
import RootCheckPointComponent from './checkpoint/component/RootCheckPointComponent';
import RootReportComponent from './report/component/RootReportComponent';

import ContentInbox from 'material-ui/svg-icons/content/inbox';
import IconSettings from 'material-ui/svg-icons/action/settings';
import IconCheckPoint from 'material-ui/svg-icons/communication/location-on';
import IconMode from 'material-ui/svg-icons/device/usb';
import IconObject from 'material-ui/svg-icons/maps/directions-bus';
import IconMenu from 'material-ui/svg-icons/navigation/menu';
import IconClose from 'material-ui/svg-icons/navigation/close';
import IconHome from 'material-ui/svg-icons/action/home';
import Page404 from './Page404';

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
  <RootCheckPointComponent/>
);

const ModeTracking = () => (
  <RootModeTracking/>
);

const ObjectTracking = () => (
  <RootObjectTracking/>
);

const P404 = ()=>(
  <Page404/>
)

export default class AdminMaster extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      isOpenDrawer:true,
      isDockedDrawer:true
    }
  }

  toggleDrawer(){
    this.setState({
      isOpenDrawer:!this.state.isOpenDrawer,
      isDockedDrawer: !this.state.isOpenDrawer
    });

  }

  onTT(){
    if(this.state.isDockedDrawer){
      return;
    }
    this.setState({
      isOpenDrawer:true,
    })
  }

  onTTT(){
    if(this.state.isDockedDrawer){
      return;
    }
    this.setState({
      isOpenDrawer:false,
    })
  }

  render(){
    var _open = this.state.isOpenDrawer?'_open':'';
    return(
        <MuiThemeProvider>
          <div>
            <div onMouseOver={this.onTT.bind(this)} onMouseLeave = {this.onTTT.bind(this)}>
              <Drawer  containerClassName={"root-drawer " + _open}>
                <div className={"drawer-avatar "+_open}></div>
                <a href="/"><MenuItem leftIcon={<IconHome />} className="menu-item">{this.state.isOpenDrawer ? "Trang chủ" :null}</MenuItem></a>
                <NavLink to="/app/report" activeClassName="active"><MenuItem leftIcon={<ContentInbox />} className="menu-item">{this.state.isOpenDrawer ? "Báo cáo" :null}</MenuItem></NavLink>
                <NavLink to="/app/checkpoint" activeClassName="active"><MenuItem leftIcon={<IconCheckPoint />} className="menu-item">{this.state.isOpenDrawer ? "Trạm giám sát" :null}</MenuItem></NavLink>
                <NavLink to="/app/mode-tracking" activeClassName="active"><MenuItem leftIcon={<IconMode />} className="menu-item">{this.state.isOpenDrawer ? "Chế độ giám sát" :null}</MenuItem></NavLink>
                <NavLink to="/app/object-tracking" activeClassName="active"><MenuItem leftIcon={<IconObject />} className="menu-item">{this.state.isOpenDrawer ? "Đối tượng giám sát" :null}</MenuItem></NavLink>
                <NavLink to="#" activeClassName="active">
                  <MenuItem leftIcon={<IconObject />} className="menu-item" primaryText="Inbox"
                    initiallyOpen={false}
                    primaryTogglesNestedList={true}
                    nestedItems={this.state.isOpenDrawer ? [
                      <MenuItem
                        key={1}
                        leftIcon={<IconObject />}
                        primaryText="Starred"
                      />,
                      <MenuItem
                        key={2}
                        leftIcon={<IconObject />}
                        primaryText="Sent Mail"
                        disabled={true}
                      />,
                  ] : []}

                  />
                </NavLink>
              </Drawer>
            </div>
            <div className={"root-content " + _open}>
              <div className="admin-top-bar">
                <button className="btn-menu" onClick={this.toggleDrawer.bind(this)}>
                  {
                    this.state.isOpenDrawer ? (
                        <IconClose style={{color:'#555'}} />
                    ):(
                      <IconMenu style={{color:'#555'}} />
                    )
                  }
                </button>
                <span style={
                    {
                      marginLeft:'15px',
                      fontSize:'25px',
                      fontWeight:'bold',
                      color:'rebeccapurple'
                    }}>
                    Dashboard
                </span>
              </div>
              <div className="_uuu">
                <Switch>
                  <Route exact path="/app" component={Report} />
                  <Route exact path="/app/report" component={Report} />
                  <Route path="/app/object-tracking" component={ObjectTracking} />
                  <Route path="/app/checkpoint" component={Checkpoints} />
                  <Route path="/app/mode-tracking" component={ModeTracking} />
                  <Route path='*' exact={true} component={P404} />
                </Switch>
              </div>
            </div>
          </div>
        </MuiThemeProvider>
    )
  }
}
