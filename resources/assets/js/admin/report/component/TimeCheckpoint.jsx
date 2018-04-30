import React from 'react';

export default class TimeCheckPoint extends React.Component{
   constructor(props){
     super(props);

   }

   render(){

     var time_start ='';
     var time_end ='';
     var total_time = 0;

     if(this.props.node.time_start!=''){
       time_start = new Date(this.props.node.time_start);
     }

     if(this.props.node.time_end!=''){
       time_end = new Date(this.props.node.time_end);
     }

     if(time_start!=''){
        if(time_end=='' || (time_end-time_start) < 0 ){
          time_end = new Date(this.props.timeend);
          total_time = (Math.floor((time_end-time_start)/1000)) + parseInt(this.props.node.total_time);
        }
     }


     var time1 = this.props.node.time_start!='' ? new Date(this.props.node.time_start) : new Date();
     var time2 = new Date(this.props.timeend);
     console.log(this.props.timeend);

     var total_time = (Math.floor((time2-time1)/1000)) + parseInt(this.props.node.total_time);

     var min = Math.floor(total_time / 60);
     var sec = total_time - min * 60;
     var time = `${min} m : ${sec} s`;
     var _class='';

    if(total_time > this.props.node.max_time) _class='row-danger';

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
