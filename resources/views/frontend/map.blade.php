<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Realtime location tracking</title>
  </head>
  <style media="screen">
    body{
      margin: 0;
    }

    <style media="screen">
      .ic-setting{
        color:red!important;
      }

      .devider{
        margin-top:1rem!important;
        margin-bottom: :1rem!important;
      }

      .content-wrapper{
        margin:100px 15px 0 315px;
      }

      .avatar{
        width: 100%;
        height: 250px;
        background-image: url("/images/bg.jpg");
        background-size: cover;
      }

      .root-appbar-class{
        z-index: 1500!important;
        position:fixed!important;
        top:0;
      }
      .muidocs-icon-custom-github:before {
          content: "\e625";
          font-family: 'Material Icons';
      }
      #map-canvas{
        width: 100vw;
        height:100vh;
      }
      ._tt{
        width: 20px;
        height:20px;
        background:red;
        border-radius: 50%;
      }
      .menu-master,.menu-item{
        cursor: pointer;
        position: fixed;
        bottom: 50px;
        right: 50px;
      }

      .btn-circle{
          border-radius: 50%;
          box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
          width: 49px;
          height:49px;
          background: rgb(42, 201, 170);
      }

      .menu-item{
        z-index: 9;
        transition: all 0.3s ease;
      }
      ._label{
        position: absolute;
        top:50%;
        left: 50%;
        color: #fff;
        font-weight: bold;
        transform: translate(-50%,-50%);
      }
      .item-title{
        position: absolute;
        right :110%;
        white-space: nowrap;
        top:50%;
        transform: translate(0,-50%);
        background: rgba(0,0,0,0.8);
        padding: 3px 5px;
        color: rgba(255,255,255,0.8);
        font-size: 12px;
        border-radius: 15px;
      }
      .menu-master{
        border-radius: 50%;
        width: 50px;
        height:50px;
        background: rgb(42, 201, 170);
        z-index: 10;
      }

      .mornitor-master-wrapper{
        z-index: 8;
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 50vh;
        overflow-y: auto;
        background: rgba(53, 53, 53, 0.8);
        -webkit-font-smoothing:antialiased;
      	font-style: normal;
      	font-variant: normal;
      	font-weight: 500;
      	line-height: 26.4px;
        transition:all 0.3s ease;
      }

      .monitor-content{
        color:#fff;
      }

      .mornitor-master-wrapper::-webkit-scrollbar-track
      {
      	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
      	border-radius: 10px;
      	background-color: #F5F5F5;
      }

      .mornitor-master-wrapper::-webkit-scrollbar
      {
      	width: 10px;
      	background-color: #F5F5F5;
      }

      .mornitor-master-wrapper::-webkit-scrollbar-thumb
      {
      	border-radius: 10px;
      	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
      	background-color: #555;
      }
      .dashboard-table tbody {
          display:block;
          height:40vh;
          overflow:auto;
          font-size: 12px;
          cursor: pointer;
      }
      .dashboard-table tbody::-webkit-scrollbar {
      display: none;
      }

      .dashboard-table thead, .dashboard-table tbody tr {
          font-size: 13px;
          display:table;
          width:100%;
          table-layout:fixed;/* even columns width , fix width of table too*/
      }

      .dashboard-table table {
          width:400px;
      }

      .dashboard-table table td{
        padding:0.5rem!important;
        text-shadow: none;
      }
      .row-active{
        background: #4CAF50!important;
      }

      .row-stop{
        background: #D4E157!important;
      }

      .row-danger{
        background: #F44336!important;
      }

  </style>
  <body>
    <div id="react-root"></div>
    <script
    src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
    integrity="sha256-3edrmyuQ0w65f8gfBsqowzjJe2iM6n0nKciPUp8y+7E="
    crossorigin="anonymous"></script>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDTlqW-_ymhhj0I6Ez1Jq_8Z87a_A9ZaCU"></script>
    <script src="http://113.160.215.214:3000/socket.io/socket.io.js"></script>
    <script type="text/javascript" src="/js/frontend/frontend-bundle.js"></script>
  </body>
</html>
