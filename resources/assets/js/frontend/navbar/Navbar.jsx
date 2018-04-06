import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';

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
        onLeftIconButtonClick= {this.toggleMornitorTable.bind(this)}
        iconElementRight={
            <a href="/app"><FlatButton label="dashboard" /></a>
        }
      />
    )
  }
}
