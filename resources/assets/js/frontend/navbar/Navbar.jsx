import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';
import IconMenu from 'material-ui/svg-icons/navigation/menu';
import KeyBoardArrayUp from 'material-ui/svg-icons/hardware/keyboard-arrow-up'

export default class Navbar extends React.Component{

  constructor(props){
    super(props);
  }

  toggleMornitorTable(){
    this.props.ToggleMornitorTable();
  }

  render(){
    return(
      <AppBar
        title="realtime location tracking"
        iconElementLeft={<IconButton><a href="/app"><IconMenu style={{color:'#fff'}} /></a></IconButton>}
        iconElementRight={
          <FlatButton onClick= {this.toggleMornitorTable.bind(this)} ><KeyBoardArrayUp style={{color:'#fff'}}/></FlatButton>
        }
      />
    )
  }
}
