import React from 'react';

export default class TimeCheckPoint extends React.Component{
   constructor(props){
     super(props);

   }

   render(){
     var min = Math.floor(this.props.node.total_time / 60);
     var sec = this.props.node.total_time - min * 60;
     var time = `${min} m : ${sec} s`;
     var _class='';

    if(this.props.node.total_time > this.props.node.max_time) _class='row-danger';

     return(
       <div className={_class} style={{
           width:'100%',
           height:'100%',
           padding:'15px 0'        
         }}>
         {time}
       </div>
     )
   }
}
