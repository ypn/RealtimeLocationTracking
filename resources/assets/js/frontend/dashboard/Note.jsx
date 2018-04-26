import React from 'react';

export default class Note extends React.Component{
  render(){
    return(
      <div style={{
          width:'100%',
          height:'50px',
          borderTop:'1px solid #000',
          background:'rgba(0,0,0,0.4)'

        }}>
        <ul className="list-note">
          <li>
            <span className="note-square default"></span> Đối tượng chưa vào điểm giám sát.
          </li>
          <li>
            <span className="note-square active"></span> Đối tượng giám sát nằm trong điểm giám sát.
          </li>
          <li>
            <span className="note-square danger"></span> Đối tượng ở trong điểm giám sát quá hạn mức.
          </li>
        </ul>           
      </div>
    )
  }
}
