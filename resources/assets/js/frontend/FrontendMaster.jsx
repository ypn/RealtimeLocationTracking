import React from 'react';
import MapMaster from './tomchentwmap/InitialMap';
import TopNavBar from './navbar/Navbar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import MornitorMaster from './dashboard/MornitorMaster';

export default class FrontendMaster extends React.Component{
  render(){
    return(
      <MuiThemeProvider>
        <div>
          <TopNavBar/>        
          <MornitorMaster/>
        </div>
      </MuiThemeProvider>
    )
  }
}
