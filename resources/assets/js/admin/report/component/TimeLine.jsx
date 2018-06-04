import React from 'react';
import ItemTimeLine from './ItemTimeLine';

export default class TimeLine extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
    <div>
				<div style={{
            display:'inline-block',
            width:'100%',
            overflowY:'auto'
          }}>
          <h3 style={{marginTop:'10px',marginBottom:0,color:'#fff',marginLeft:'17px'}}>Timeline di chuyển</h3>
					<ul className="timeline timeline-horizontal">
            <li className="timeline-item">
              <div className="timeline-badge danger"><i className="glyphicon glyphicon-check"></i></div>
              <div className="timeline-panel">
                <div className="timeline-heading">
                  <h4 className="timeline-title">{this.props.createdAt}</h4>
                  <p><small className="text-muted"><i className="glyphicon glyphicon-time">Bắt đầu giám sát</i></small></p>
                </div>
              </div>
            </li>
            {
              this.props.timelineeee.map((node,k)=>{
                return(
                  <ItemTimeLine key={k} data={JSON.parse(node)}/>
                )
              })
            }
            <li className="timeline-item">
              <div className="timeline-badge danger"><i className="glyphicon glyphicon-check"></i></div>
              <div className="timeline-panel">
                <div className="timeline-heading">
                  <h4 className="timeline-title">{this.props.endedAt}</h4>
                  <p><small className="text-muted"><i className="glyphicon glyphicon-time">Kết thúc giám sát</i></small></p>
                </div>
              </div>
            </li>
					</ul>
				</div>
      </div>
    )
  }
}
