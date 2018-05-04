import React from 'react';

export default class TimeCheckPoint extends React.Component{
   constructor(props){
     super(props);

   }

   getTimeInCheckPoint(total_time,time_start,time_end){
     if(time_start==''){
       return 0;
     }

     time_start = new Date(time_start);
     if(time_end=='' || new Date(time_end) - time_start <0 ){
       time_end = new Date(this.props.timeend);
     }else{
       time_end = new Date(time_end);
     }

     return (parseInt(total_time) + Math.floor((time_end-time_start)/1000));


   }

   render(){

     var total_time = this.getTimeInCheckPoint(this.props.node.total_time,this.props.node.time_start,this.props.node.time_end);

     var min = Math.floor(total_time / 60);
     var sec = total_time - min * 60;
     var time = `${min} m : ${sec} s`;
     var _class='';

    var _class= total_time > parseInt(this.props.node.max_time) ? 'row-danger' : null;

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
