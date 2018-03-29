import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import axios from 'axios';
import Constants from '../../constants/Constants';

import TableObjectTracking from './TableObjectTracking';

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
};

export default class ListObjectTracking extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      listMode:null,
      tabActive:0

    }

    axios.post(Constants.MODE_TRACKING_ROUTE + 'minimal-list',
    {
      required:[
        'name',
        'id',
        'table_reference',
        'display_property',
        'object_owner',
        'is_required_phone_number'
      ],
      _token:$('meta[name="csrf-token"]').attr('content')
    })
    .then(function(response){
      this.setState({
        listMode:response.data
      });
    }.bind(this))
    .catch(function(err){
      console.log(err);
    });

  }

  onTabActive(index){
    this.setState({
      tabActive:index,
    });
  }

  render(){
    return(
      <div>
      {
        this.state.listMode!=null ? (
          <Tabs>
          {
            this.state.listMode.map((node,k)=>{
              return(
                  <Tab onActive={this.onTabActive.bind(this,k)} label={node.name} key={k}>
                    {
                      this.state.tabActive == k ? (
                        <TableObjectTracking ModeProperty= {node}/>
                      ):null
                    }
                  </Tab>
              )
            })
          }
          </Tabs>
        ):
        (
          <h4>Chưa có chế độ theo dõi nào! Nhấn vào ADD để thêm 1 chế độ mới!</h4>
        )
      }
      </div>
    )
  }
}
