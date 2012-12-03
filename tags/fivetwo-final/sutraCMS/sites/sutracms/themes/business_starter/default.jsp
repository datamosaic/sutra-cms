<%@ page import = "java.util.*" %>
<% HashMap pageData = (HashMap)request.getAttribute("pageData");%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link href="<%=(String)request.getAttribute("themeDirectory")%>/css/style.css" type="text/css" rel="stylesheet" media="screen" />
<link href="<%=(String)request.getAttribute("themeDirectory")%>/css/css3.css" rel="stylesheet" type="text/css" />
<link href="<%=(String)request.getAttribute("themeDirectory")%>/fonts/stylesheet.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="http://code.jquery.com/jquery-latest.min.js"></script>
<script src="<%=(String)request.getAttribute("themeDirectory")%>/js/jquery.bxSlider.min.js" type="text/javascript"></script>
<script type="text/javascript">
$(function(){
  $('#slider1').bxSlider({
   auto: true,
    pager: true,
	speed:'5000'
  })
})
</script>
<!--[if IE]><link rel="stylesheet" type="text/css" href="<%=(String)request.getAttribute("themeDirectory")%>/css/ie.css"><![endif]-->
<jsp:include page='<%= (String)request.getAttribute("head") %>' />
</head>
<body>
<div class="layout">
<!--header starts-->
  <div id="header">
    <div class="logo"><a href="#"><img src="<%=(String)request.getAttribute("themeDirectory")%>/images/logo.jpg" alt="" /></a></div>
    <div class="search">
      <form action="#" method="post">
        <fieldset>
          <input class="text" type="text" value="" />
          <input class="submit" type="submit" value="" />
        </fieldset>
      </form>
    </div>
    <div class="login">
      <ul>
        <li><a href="">login</a></li>
        <li><a href="">register</a></li>
        <li class="last"><a href="">tools</a></li>
      </ul>
    </div>
  </div>
   <!--header ends-->
  <!--menu starts-->
  <div id="menu">
    <div class="menu_left">
      <ul>
        <li><a href="#"><span>home</span></a></li>
        <li><a href=""><span>about</span></a></li>
        <li><a href=""><span>centres</span></a></li>
        <li><a href=""><span>services</span></a></li>
        <li><a href=""><span>contact</span></a></li>
      </ul>
    </div>
    <div class="menu_right">
      <ul>
        <li><a class="first" href="#">A</a></li>
        <li><a class="sec" href="">A</a></li>
        <li><a class="third" href="">A</a></li>
      </ul>
    </div>
  </div>
  <!--menu ends-->
<!--banner starts-->
  <div id="banner">
    <div class="bx-pager"> <a href="#"></a> <a href="#"></a> <a href="#"></a> <a href="#"></a> <a href="#"></a> </div>
    <ul id="slider1">
      <li><img src="<%=(String)request.getAttribute("themeDirectory")%>/images/banner1.jpg" alt=""/>
        <div class="info">
          <p>In some places the grass <span>really is</span> greener... </p>
        </div>
      </li>
      <li><img src="<%=(String)request.getAttribute("themeDirectory")%>/images/banner1.jpg" alt=""/>
        <div class="info">
          <p>In some places the grass <span>really is</span> greener... </p>
        </div>
      </li>
      <li><img src="<%=(String)request.getAttribute("themeDirectory")%>/images/banner1.jpg" alt=""/>
        <div class="info">
          <p>In some places the grass <span>really is</span> greener... </p>
        </div>
      </li>
      <li><img src="<%=(String)request.getAttribute("themeDirectory")%>/images/banner1.jpg" alt=""/>
        <div class="info">
          <p>In some places the grass <span>really is</span> greener... </p>
        </div>
      </li>
      <li><img src="<%=(String)request.getAttribute("themeDirectory")%>/images/banner1.jpg" alt=""/>
        <div class="info">
          <p>In some places the grass <span>really is</span> greener... </p>
        </div>
      </li>
    </ul>
  </div>
   <!--banner ends-->
   <!--body_container starts-->
  <div id="body_container">
    <div id="body_nav" >
      <ul>
        <li><a href="">Home</a></li>
        <li><a href="">About</a></li>
        <li class="last"><a class="active" href="">Heading 1</a></li>
      </ul>
    </div>
    <div class="col_01">
      <div class="inner"> <small><img src="<%=(String)request.getAttribute("themeDirectory")%>/images/istock_photo.jpg" alt="istock photo"/></small>
        <p>Health and Safety Standards Report August, 2010</p>
        <a href="#"><span>Read more</span></a> </div>
    </div>
    <div class="col_02">
      <div class="inner">
        <h1>Heading1</h1>
        <p>Lorem ipsum dolor sit amet, mi lacus luctus, etiam dui quisque placerat. Tortor nec. Posuere quisque rutrum vivamus vulputate quis, pretium viverra augue luctus volutpat, sollicitudin nibh sit, amet wisi quis suspendisse massa, magna cras amet varius maecenas nunc lorem. Volutpat vel ipsum praesent pharetra rutrum consectetuer, purus posuere erat semper, rutrum in eget curabitur. Accumsan cras vitae nibh. Porttitor mauris est. Dis rhoncus. Nibh amet. A rhoncus ut </p>
        <a href="#"><span>Read more</span></a></div>
    </div>
    <div class="right_container">
      <ul id="content2_right">
        <li class="news">
          <h4>News</h4>
          <h5>Dummy Headline</h5>
          <p>Lorem ipsum dolor sit amet, mi lacus luctus, etiam dui quisque placerat. Tortor nec. Posuere quisque rutrum vivamus vulputate quis, pretium viverra augue luctus volutpat, sollicitudin nibh sit, amet wisi quis suspendisse massa, magna. </p>
        </li>
      </ul>
    </div>
  </div>
    <!--body_container ends-->
  <!--footer starts-->
  <div id="footer">
    <ul id="upper_footer">
      <li>
        <h6>Latest News </h6>
        <ul>
          <li><a href="#">Lorem ipsum dolor </a></li>
          <li><a href="#">Amet varius</a></li>
          <li><a href="#">Magna cras</a></li>
          <li><a href="#">Lorem ipsum dolor sit </a></li>
          <li><a href="#">Amet varius </a></li>
          <li><a href="#">Magna cras</a></li>
        </ul>
      </li>
      <li>
        <h6>Most Popular</h6>
        <ul>
          <li><a href="#">Lorem ipsum dolor </a></li>
          <li><a href="#">Amet varius</a></li>
          <li><a href="#">Magna cras</a></li>
          <li><a href="#">Lorem ipsum dolor sit </a></li>
          <li><a href="#">Amet varius </a></li>
          <li><a href="#">Magna cras</a></li>
        </ul>
      </li>
      <li>
        <h6>Latest News </h6>
        <ul>
          <li><a href="#">Lorem ipsum dolor </a></li>
          <li><a href="#">Amet varius</a></li>
          <li><a href="#">Magna cras</a></li>
          <li><a href="#">Lorem ipsum dolor sit </a></li>
          <li><a href="#">Amet varius </a></li>
          <li><a href="#">Magna cras</a></li>
        </ul>
      </li>
      <li class="last">
        <h6>Most Popular</h6>
        <ul>
          <li><a href="#">Lorem ipsum dolor </a></li>
          <li><a href="#">Amet varius</a></li>
          <li><a href="#">Magna cras</a></li>
          <li><a href="#">Lorem ipsum dolor sit </a></li>
          <li><a href="#">Amet varius </a></li>
          <li><a href="#">Magna cras</a></li>
        </ul>
      </li>
    </ul>
    <div id="lower_footer">
      <ul id="footer_nav">
        <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Services</a></li>
        <li><a href="#">Staff</a></li>
        <li class="last"><a href="#">Contact</a></li>
      </ul>
      <p>Template Design © Copyright 4Community. All rights reserved.</p>
    </div>
  </div>
   <!--footer ends-->
</div>
<jsp:include page='<%= (String)request.getAttribute("foot") %>' />
</body>
</html>