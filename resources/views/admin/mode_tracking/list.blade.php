<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title></title>
    <style media="screen">
      body{
        margin: 0;
      }

      .root-drawer{
        z-index: 1000!important;
      }

      .root-drawer a{
        text-decoration:none!important;
      }

      .drawer-avatar{
        background-image: url('/images/background.jpg');
        width: 100%;
        height: 250px;
        background-size: cover;
      }

      .root-content{
        margin:100px 15px 0 315px;
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

    </style>
  </head>
  <body>
    <div id="react-root"></div>
    <script
    src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
    integrity="sha256-3edrmyuQ0w65f8gfBsqowzjJe2iM6n0nKciPUp8y+7E="
    crossorigin="anonymous"></script>
    <script type="text/javascript" src="/js/admin/admin-bundle.js"></script>  
  </body>
</html>
