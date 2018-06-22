import React from 'react';
import { Chart } from 'react-google-charts';





export default class ChartSpeed extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      data:this.props.MyData
    }
  }

  render(){
    var _self = this;
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(function(){

      var data = new google.visualization.DataTable();
      data.addColumn('datetime', 'Thời điểm');
      data.addColumn('number', 'Vận tốc');
      data.addColumn({type:'string','role':'certainty'});
      data.addColumn({type:'string','role':'certainty'});

      var arr = _self.props.MyData;

      for(let i=0 ; i < arr.length ; i++){
        data.addRow([
          new Date(arr[i].time_at),
          arr[i].speed,
          arr[i].lat.toString(),
          arr[i].lng.toString()
        ])
      }

      var options = {
        hAxis: {
          title: 'Thời gian'
        },
        vAxis: {
          title: 'Vận tốc m/s'
        },
        explorer: {
           actions: ['dragToZoom', 'rightClickToReset'],
           axis: 'horizontal',
           keepInBounds: true,
           maxZoomIn: 4.0
         }

      };

      var chart = new google.visualization.LineChart(document.getElementById('chart_div'));

      google.visualization.events.addListener(chart, 'select', function(){
        var selectedItem = chart.getSelection()[0];
        if (selectedItem) {
          let lat = data.getFormattedValue(selectedItem.row,2);
          let lng = data.getFormattedValue(selectedItem.row,3);
          _self.props.CallBack({lat,lng});
        }

      });

      chart.draw(data, options);
    });

    return(
      <div id="chart_div"></div>
    )
  }
}
