<!DOCTYPE html>
<html lang="en" >

<head>
  <meta charset="UTF-8">
  <title>LogIn Form</title>
  <link href='https://fonts.googleapis.com/css?family=Pacifico' rel='stylesheet' type='text/css'>
  <link href='https://fonts.googleapis.com/css?family=Arimo' rel='stylesheet' type='text/css'>
  <link href='https://fonts.googleapis.com/css?family=Hind:300' rel='stylesheet' type='text/css'>
  <link href='https://fonts.googleapis.com/css?family=Open+Sans+Condensed:300' rel='stylesheet' type='text/css'>
  <link rel="stylesheet" href="/css/login.css">
</head>

<body>
  <div id="login-button">
    <img src="https://dqcgrsy5v35b9.cloudfront.net/cruiseplanner/assets/img/icons/login-w-icon.png">
    </img>
  </div>
  <div id="container">
    <h1>Log In</h1>
    <span class="close-btn">
      <img src="https://cdn0.iconfinder.com/data/icons/basic-ui-elements-colored/700/010_x-3-256.png"></img>
    </span>

    <form>
      <input type="email" name="email" placeholder="E-mail">
      <input type="password" name="pass" placeholder="Password">
      <a href="#">Log in</a>
      <div id="remember-container">
        <input type="checkbox" id="checkbox-2-1" class="checkbox" checked="checked"/>
        <span id="remember">Remember me</span>
        <span id="forgotten">Forgotten password</span>
      </div>
  </form>
  </div>

  <!-- Forgotten Password Container -->
  <div id="forgotten-container">
     <h1>Forgotten</h1>
    <span class="close-btn">
      <img src="https://cdn4.iconfinder.com/data/icons/miu/22/circle_close_delete_-128.png"></img>
    </span>

    <form>
      <input type="email" name="email" placeholder="E-mail">
      <a href="#" class="orange-btn">Get new password</a>
  </form>
  </div>
  <script src='http://cdnjs.cloudflare.com/ajax/libs/gsap/1.16.1/TweenMax.min.js'></script>
  <script src='http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js'></script>
  <script type="text/javascript">
    $('#login-button').click(function(){
      $('#login-button').fadeOut("slow",function(){
        $("#container").fadeIn();
        TweenMax.from("#container", .3, { scale: 0, ease:Sine.easeInOut});
        TweenMax.to("#container", .3, { scale: 1, ease:Sine.easeInOut});
      });
      });

      $(".close-btn").click(function(){
      TweenMax.from("#container", .3, { scale: 1, ease:Sine.easeInOut});
      TweenMax.to("#container", .3, { left:"0px", scale: 0, ease:Sine.easeInOut});
      $("#container, #forgotten-container").fadeOut(400, function(){
        $("#login-button").fadeIn(400);
      });
      });

      /* Forgotten Password */
      $('#forgotten').click(function(){
      $("#container").fadeOut(function(){
        $("#forgotten-container").fadeIn();
      });
    });
  </script>
</body>

</html>
