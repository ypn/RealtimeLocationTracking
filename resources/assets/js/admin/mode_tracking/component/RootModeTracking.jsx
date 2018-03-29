import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import ActionAndroid from 'material-ui/svg-icons/action/android';
import FontIcon from 'material-ui/FontIcon';
import Divider from 'material-ui/Divider';

import ListModes from './ListModes';
import AddNewMode from './AddNewMode';
import {Route, Link } from "react-router-dom";


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
  <ListModes/>
);

const Add = () => (
  <AddNewMode/>
);

export default class RootModeTracking extends React.Component{
  render(){
    return(
      <div>
        <div className="control-tool-bar">
          <Link to="/app/mode-tracking/list">
              <RaisedButton
                label="List"
                labelPosition="before"
                primary={true}
                icon={<ActionAndroid />}
                style={styles.button}
              />
          </Link>
          <Link to="/app/mode-tracking/add">
              <RaisedButton label="Add"
                secondary={true}
                style={styles.button}
                icon={<FontIcon className="muidocs-icon-custom-github" />}
              />
          </Link>
        </div>
        <Divider />
        <div className="component-content-viewer">
          <Route exact path="/app/mode-tracking" component={List} />
          <Route exact path="/app/mode-tracking/list" component={List} />
          <Route path="/app/mode-tracking/add" component={Add} />
        </div>
      </div>
    )
  }
}
