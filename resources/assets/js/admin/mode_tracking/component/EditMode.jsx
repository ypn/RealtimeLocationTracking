import React from 'react';
import MobileTearSheet from './MobileTearSheet';
import {List} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import axios from 'axios';
import GlobalConstants from '../../../constants/GlobalConstants';
import ItemCheckPoint from './ItemCheckPoint';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    fontFamily:'Roboto'
  },
};


export default class EditMode extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      listCheckPoints :[],
      listInArray:[]
    }

    axios.post(GlobalConstants.CHECKPOINT_ROUTE+'list-enabled',{
      mode_id:this.props.ModeId
    })
    .then(function(response){
      if(response.data.status == 'success'){
        this.setState({
          listInArray:response.data
        });
      }
    })
    .catch(function(err){
      console.log(err);
    })

    axios.post(GlobalConstants.CHECKPOINT_ROUTE + 'list')
    .then(function(response){
      if(response.data.status=='success'){
        this.setState({
          listCheckPoints:response.data.list
        });
      }
    }.bind(this))
    .catch(function(err){
      console.log(err);
    });

  }

  render(){
    return(
      <div style={styles.root}>
        <MobileTearSheet>
          <List>
            <Subheader>Danh sách trạm theo dõi</Subheader>
            {
              this.state.listCheckPoints.map((node,k)=>{
                return(
                  <ItemCheckPoint Availabled={this.state.listInArray.indexOf(node.id)!=-1?true:false} ModeId ={this.props.ModeId} Node={node} key = {k}/>
                )
              })
            }
          </List>
        </MobileTearSheet>
      </div>
    )
  }
}
