<!DOCTYPE html>
<html lang="en" >

<head>
  <meta charset="UTF-8">
  <title>HTML5 CSS-Driven Responsive Image Slider With Captions</title>



      <style>
      /* NOTE: The styles were added inline because Prefixfree needs access to your styles and they must be inlined if they are on local disk! */
      @import url(https://fonts.googleapis.com/css?family=Istok+Web);
@keyframes slidy {
0% { left: 0%; }
20% { left: 0%; }
25% { left: -100%; }
45% { left: -100%; }
50% { left: -200%; }
70% { left: -200%; }
75% { left: -300%; }
95% { left: -300%; }
100% { left: -400%; }
}
* {
  box-sizing: border-box;
}
body, figure {
  margin: 0; background: #101010;
  font-family: Istok Web, sans-serif;
  font-weight: 100;
}
div#captioned-gallery {
  width: 100%; overflow: hidden;
}
figure.slider {
  position: relative; width: 500%;
  font-size: 0; animation: 30s slidy infinite;
}
figure.slider figure {
  width: 20%; height: auto;
  display: inline-block;  position: inherit;
}
figure.slider img { width: 100%; height: auto; }
figure.slider figure figcaption {
  position: absolute; bottom: 0;
  background: rgba(0,0,0,0.4);
  color: #fff; width: 100%;
  font-size: 2rem; padding: .6rem;
}


    </style>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/prefixfree/1.0.7/prefixfree.min.js"></script>

</head>

<body>

<div id="captioned-gallery">
	<figure class="slider">
		<figure>
			<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/wanaka-drowned-tree.jpg" alt>
			<figcaption>Hobbiton, New Zealand</figcaption>
		</figure>
		<figure>
			<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/hobbiton-lake.jpg" alt>
			<figcaption>Wanaka, New Zealand</figcaption>
		</figure>
		<figure>
			<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/bryce-canyon-utah.jpg" alt>
			<figcaption>Utah, United States</figcaption>
		</figure>
		<figure>
			<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/utah-peak.jpg" alt>
			<figcaption>Bryce Canyon, Utah, United States</figcaption>
		</figure>
		<figure>
			<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/wanaka-drowned-tree.jpg" alt>
			<figcaption>Hobbiton, New Zealand</figcaption>
		</figure>
	</figure>
</div>
  <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"> </script>
  <script src="/js/jquery.fullscreen.js"></script>

  <script type="text/javascript">
  var onFullScreen = false;
  $(function() {
      $('body').click(function() {
          // return false;
          if(!onFullScreen){
            $('body').fullscreen();
          }else{
              $.fullscreen.exit();
          }
          onFullScreen = !onFullScreen;
      });

  });

  </script>

</body>

</html>
