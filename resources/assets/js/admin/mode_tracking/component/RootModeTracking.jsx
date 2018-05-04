import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import ActionAndroid from 'material-ui/svg-icons/action/android';
import FontIcon from 'material-ui/FontIcon';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';

import ListModes from './ListModes';
import AddNewMode from './AddNewMode';
import EditMode from './EditMode';
import {Route, NavLink } from "react-router-dom";
import IconList from 'material-ui/svg-icons/action/list';
import IconListAdd from 'material-ui/svg-icons/av/playlist-add';
import ReactTooltip from 'react-tooltip'


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

const Edit = ({match})=> (
  <EditMode ModeId={match.params.id}/>
);

export default class RootModeTracking extends React.Component{
  render(){
    return(
      <div>      
        <div className="control-tool-bar">
          <NavLink activeClassName="_active" to="/app/mode-tracking/list">
              <IconButton
                data-tip="Danh sách"
                iconStyle={{
                  color:'#ddd'
                }}
              >{<IconList/>}</IconButton><ReactTooltip />
          </NavLink>
          <NavLink activeClassName="_active" to="/app/mode-tracking/add">
              <IconButton
                data-tip="Thêm mới"
                iconStyle={{
                    color:'#ddd'
                }

                }

              >{<IconListAdd/>}</IconButton><ReactTooltip />
          </NavLink>
        </div>
        <Divider />
        <div className="component-content-viewer">
          <Route exact path="/app/mode-tracking" component={List} />
          <Route exact path="/app/mode-tracking/list" component={List} />
          <Route path="/app/mode-tracking/add" component={Add} />
          <Route path="/app/mode-tracking/edit/:id" component={Edit} />
        </div>
      </div>
    )
  }
}
