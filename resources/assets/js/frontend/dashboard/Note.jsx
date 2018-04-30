import React from 'react';

export default class Note extends React.Component{
  render(){
    return(
      <div style={{
          width:'100%',
          borderTop:'1px solid #000',
          background:'rgba(0,0,0,0.4)'

        }}>
        <ul className="list-note">
          <li>
            <span className="note-square default"></span> Chưa kiểm tra
          </li>
          <li>
            <span className="note-square active"></span> Đang kiểm tra
          </li>
          <li>
            <span className="note-square deactive"></span> Đã kiểm tra
          </li>
          <li>
            <span className="note-square danger"></span> Quá thời gian
          </li>
        </ul>
      </div>
    )
  }
}
