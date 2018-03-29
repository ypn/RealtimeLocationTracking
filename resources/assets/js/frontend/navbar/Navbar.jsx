import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';

export default class Navbar extends React.Component{
  render(){
    return(
      <AppBar
        iconElementRight={
            <a href="/app"><FlatButton label="dashboard" /></a>
        }
      />
    )
  }
}
