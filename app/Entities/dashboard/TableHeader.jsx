import React from 'react';
import CheckPoint from './CheckPoint';
import axios from 'axios';
import Stores from '../../stores/Stores';

export default class TableHeader extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      total:0,
      listCheckPoints : []
    }
  }

  componentWillMount(){
    axios.get('/quanlyxeravao/checkpoints/api/list').then((response)=>{
      this.setState({
        listCheckPoints:response.data
      });
    });
    Stores.on('ypn',(size)=>{
        this.setState({
          total:size
        })
    });
  }
  render(){
    return(
      <thead key='table-header'>
          <tr style = {{background:'rgb(42, 201, 170)'}}>
            <td key={-2}>#</td>
            <td>Màu đường đi</td>
            <td>Hiện đường đi</td>
            <td key={-1}>Xe({this.state.total})</td>
            {
              this.state.listCheckPoints.map((node,k)=>{
                return(
                  <CheckPoint index={k} id={node.id} key={node.id} name={node.name} />
                );
              })
            }
            <td>Giờ bắt đầu</td>
            <td>Thời gian giám sát</td>
          </tr>
      </thead>
    )
  }
}
