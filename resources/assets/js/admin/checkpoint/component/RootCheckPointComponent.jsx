import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import ActionAndroid from 'material-ui/svg-icons/action/android';
import FontIcon from 'material-ui/FontIcon';
import Divider from 'material-ui/Divider';

import AddNewCheckPoint  from './AddNewCheckPoint';
import ListCheckPoints from './ListCheckPoints';
import EditCheckpoint from './EditCheckpoint';

import {BrowserRouter as Router,Route, Link } from "react-router-dom";
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
  <ListCheckPoints/>
);

const Add = ()=>(
  <AddNewCheckPoint/>
);


const Edit = ({match})=>(
  <EditCheckpoint CheckPointId = {match.params.id} />
)

export default class  RootCheckPointComponent extends React.Component{
  render(){
    return(
      <Router>
      <div>
        <div className="control-tool-bar">
          <Link to="/app/checkpoint/list">
              <RaisedButton
                label="List"
                labelPosition="before"
                primary={true}
                icon={<ActionAndroid />}
                style={styles.button}
              />
          </Link>
          <Link to="/app/checkpoint/add">
              <RaisedButton label="Add"
                secondary={true}
                style={styles.button}
                icon={<FontIcon className="muidocs-icon-custom-github" />}
              />
          </Link>
        </div>
        <Divider />
        <div className="component-content-viewer">
          <Route exact path="/app/checkpoint" component={List} />
          <Route exact path="/app/checkpoint/list" component={List} />
          <Route path="/app/checkpoint/add" component={Add} />
          <Route path="/app/checkpoint/edit/:id" component={Edit} />
        </div>
      </div>
    </Router>
    )
  }
}
