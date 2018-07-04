import React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import Stores from '../../../stores/Stores';
import moment from 'moment';


export default class ReportTableMaster extends React.Component{
  constructor(props){
    super(props);
    this.state={
      list:[]
    }

  }

  exportPDF(){
    var pdf = new jsPDF("p", "pt", "a4");
  	pdf.addHTML($('#div-export'), 15, 15, function() {
  	  pdf.save('div.pdf');
  	});
  }

  componentWillMount(){
    var _self = this;
    Stores.on('load-report-data',function(data){
      var array = $.map(data, function(value, index) {
          return [value];
      });
      _self.setState({
        list:array
      });

      console.log(array);

    });
  }


  render(){
    return(
      <div>
        <div id="div-export">
        <table className="table table-bordered">
          <thead>
            <tr className="success">
              <th colSpan="1">STT</th>
              <th colSpan="2">Đối tượng</th>
              <th colSpan="1">Số phiên</th>
              <th colSpan="2">Số lần vi phạm</th>
              <th colSpan="5">Chi tiết vi phạm</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.list.map((node,k)=>{
                return(
                  <tr key={k}>
                    <td colSpan="1">{k+1}</td>
                    <td colSpan="2">{node.object_tracking}</td>
                    <td colSpan="1">{node.session}</td>
                    <td colSpan="2">{node.error}</td>
                    <td colSpan="5" style={{padding:0}}>
                      <table className="table table-bordered" style={{
                          marginBottom:0,
                          border:"none"
                        }}>
                        <thead>
                          <tr className="info">
                            <th>Ngày</th>
                            <th>Điểm giám sát</th>
                            <th>Thời điểm vào</th>
                            <th>Thời điểm ra</th>
                            <th>Thời gian ở lại</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            node.list_error.map((n,key)=>{
                              return(
                                <tr key={key}>
                                  <td>{moment(n.in).format('DD/MM/YYYY')}</td>
                                  <td>{n.check_point}</td>
                                  <td>{moment(n.in).format('h:mm: a')}</td>
                                  <td>{moment(n.out).format('h:mm: a')}</td>
                                  <td>Ở trong {n.diff}</td>
                                </tr>
                              )
                            })
                          }
                        </tbody>
                      </table>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
      </div>
    )
  }
}
