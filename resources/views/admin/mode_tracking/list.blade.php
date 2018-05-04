<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title></title>
    <link rel="stylesheet" href="/css/bootstrap.min.css">
    <style media="screen">
      body{
        margin: 0;
        background: #ddd;
      }

      .root-drawer._open{
        width: 260px!important;
        transition: all 0.3s ease!important;
      }

      .root-drawer{
        z-index: 1000!important;
        width: 65px!important;
        overflow-x: hidden!important;
        transition: all 0.3s ease!important;
      }

      .root-drawer a{
        text-decoration:none!important;
      }

      .drawer-avatar{
        background-image: url('/images/background.jpg');
        transition: all 0.3s ease;
        height: 48px;
        width: 100%;
        background-size: cover;
      }

      .drawer-avatar._open{
        transition: all 0.3s ease;
        height: 250px;
      }

      .root-content{
        position: relative;
        transition: all 0.3s ease;
        margin:15px 15px 0 85px;
        padding-bottom: 100px;
      }

      .root-content._open{
        margin:15px 15px 0 285px;

      }

      .alert h4{
        margin-top:0;
        margin-bottom: 10px;
      }

      .alert {
        min-width: 150px;
        padding: 15px;
        margin-top: 15px;
        border: 1px solid transparent;
        border-radius: 3px;
      }

      .alert-success {
        background-color: #91cf91;
        border-color: #80c780;
        color: #3d8b3d;
      }
      .alert-warning {
        background-color: #ebc063;
        border-color: #e8b64c;
        color: #a07415;
      }

      .alert-danger {
        background-color: #e27c79;
        border-color: #dd6864;
        color: #9f2723;
      }

      .alert p {
        padding: 0;
        margin: 0;
      }
      .alert i {
        padding-right: 5px;
        vertical-align: middle;
        font-size: 24px;
      }
      .alert .close-alert {
        -webkit-appearance: none;
        position: relative;
        float: right;
        padding: 0;
        border: 0;
        cursor: pointer;
        color: inherit;
        background: 0 0;
        font-size: 21px;
        line-height: 1;
        font-weight: bold;
        text-shadow: 0 1px 0 rgba(255, 255, 255, 0.7);
        filter: alpha(opacity=40);
        opacity: 0.4;
      }
      .alert .close-alert:hover {
        filter: alpha(opacity=70);
        opacity: 0.7;
      }

      .shadow-1, .alert {
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
      }

      .shadow-2, .alert:hover {
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
      }

      .active .menu-item{
         background-color: rgb(0, 188, 212)!important;
         color:#fff!important;
      }

      .active svg{
        fill:#fff!important;
      }

      .row-danger{
        background: #F44336!important;
      }

      .btn-menu{
        border: none;
        background: #fff;
        border-radius: 50%;
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
        width: 40px;
        height:40px;
         outline:none;
      }


      ._uuu{
        background: #fff;
        padding: 25px;
        margin-top: 25px;
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
        border-radius: 5px; /* 5px rounded corners */
        min-height: 700px;
      }
      .admin-top-bar{
        width: 100%;
      }

      .admin-top-bar .topbar-right-item{
        float:right;
      }

      .tab-title{
        display: inline-block;
        position: absolute;
        top: 40px;
        right: 15px;
        border-radius: 5px;
        padding: 0 15px;
        color: #fff;
        background: rebeccapurple;
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
      }

      ._active svg{
        color: rebeccapurple!important;
      }

    </style>
  </head>
  <body>
    <div id="react-root"></div>
    <script
    src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
    integrity="sha256-3edrmyuQ0w65f8gfBsqowzjJe2iM6n0nKciPUp8y+7E="
    crossorigin="anonymous"></script>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDTlqW-_ymhhj0I6Ez1Jq_8Z87a_A9ZaCU"></script>
    <script type="text/javascript" src="/js/admin/admin-bundle.js"></script>
  </body>
</html>
