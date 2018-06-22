<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Thông báo kết quả giám sát!</title>
    <style media="screen">
    #customers {
      font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
      border-collapse: collapse;
      width: 100%;
    }
    #customers td, #customers th {
      border: 1px solid #ddd;
      padding: 8px;
    }
    #customers tr:nth-child(even){background-color: #f2f2f2;}
    #customers tr:hover {background-color: #ddd;}
    #customers th {
      padding-top: 12px;
      padding-bottom: 12px;
      text-align: left;
      background-color: #4CAF50;
      color: white;
    }

    #customers tr.danger{
      background: red;
    }

    #customers tr.inbound{
      background: #009688;
    }
    #customers tr.default{
      background: #FFF8E1;
    }
    </style>
  </head>
  <body>
    <div class="content">
      <p>Đối tượng giám sát: <b>{{$object_tracking}}</b></p>
      <p>Chế độ giám sát: <b>{{$mode_name}}</b><p>
      <p>Bắt đầu: <b>{{$created_at}}</b>
      <p>Kết thúc:<b>{{$ended_at}}</b>
      <p>Tổng thời gian giám sát: <b>{{$time_diff}}</b></p>
      <p>Lộ trình chi tiết: <a href="http://113.160.215.214:8092/report-detail/{{$sessionId}}">Click vào đây để xem lộ trình chi tiết</a></p>
      <p>
        <img src="https://api.thumbnail.ws/api/ab4e893a78f8aa4a81c3c5dce3bca921fe26c7d3c7bd/thumbnail/get?url=http://113.160.215.214:8092/report-detail/{{$sessionId}}/&width=460"/>
      </p>
      <h3>Kết quả tổng quan</h3>
      <table id="customers">
        <thead>
          <tr>
            <th>THỜI ĐIỂM</th>
            <th>TRẠNG THÁI</th>
            <th>GHI CHÚ</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="font-weight:bold">{{$created_at}}</td>
            <td>Bắt đầu giám sát</td>
            <td></td>
          </tr>
          @foreach($timeline as $time)
          <tr class="<?php
            if($time->type==1 && $time->time_diff_in_second > 600){
              echo 'danger';
            }elseif($time->type==1){
              echo 'inbound';
            }else{
              echo 'default';
            }

          ?>">
              <td>{{$time->time}}</td>
              <td>{{$time->type  == 1 ? '=> Vào trong ' : '<= Ra khỏi '}}{{$time->checkpoint_name}}</td>
              <td>{{$time->type ==1 ? 'Ở trong ' . $time->time_diff_formatted : ''}}</td>
          </tr>
          @endforeach
          <tr style="font-weight:bold">
            <td>{{$ended_at}}</td>
            <td>Kết thúc giám sát</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  </body>
</html>
