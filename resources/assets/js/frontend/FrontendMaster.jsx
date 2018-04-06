import React from 'react';
import MapMaster from './tomchentwmap/InitialMap';
import TopNavBar from './navbar/Navbar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import MornitorMaster from './dashboard/MornitorMaster';


export default class FrontendMaster extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      showMornitorTable:false
    }

  }

  toggleMornitorTable(){  
    this.setState({
      showMornitorTable:!this.state.showMornitorTable
    })
  }

  render(){
    return(
      <MuiThemeProvider>
        <div>
          <TopNavBar ToggleMornitorTable = {this.toggleMornitorTable.bind(this)}/>
          <MapMaster/>
          <MornitorMaster ShowTable={this.state.showMornitorTable} />
        </div>
      </MuiThemeProvider>
    )
  }
}
