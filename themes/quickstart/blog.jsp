<%@ page import = "java.util.*" %>
<% HashMap pageData = (HashMap)request.getAttribute("pageData");%>
<!DOCTYPE html>
<html>
	<head>
		
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<link href='http://fonts.googleapis.com/css?family=Open+Sans:400,600,700' rel='stylesheet' type='text/css'>
		<link href='http://fonts.googleapis.com/css?family=Lobster+Two' rel='stylesheet' type='text/css'>
		
		<link href='http://fonts.googleapis.com/css?family=Droid+Serif:400,400italic' rel='stylesheet' type='text/css'>
		
		
		<!-- Styles -->
		<!-- Bootstrap CSS -->
		<link href="css/bootstrap.min.css" rel="stylesheet">
		<!-- Font awesome CSS -->
		<link href="css/font-awesome.min.css" rel="stylesheet">		
		<!-- Custom CSS -->
		<link href="css/style.css" rel="stylesheet">
		
		<!-- Favicon -->
		<link rel="shortcut icon" href="#">
	</head>
	
	<body>
		
		<!-- Top Starts -->
		<div class="top">
			
			
			<!-- Header Starts -->
			<header>
				<div class="container">
					<div class="row">
						<div class="col-md-6">
							<div class="logo">
								<h1><a href="#">Quickstart <span class="tblue">.</span></a></h1>
							</div>
						</div>
						<div class="navigation pull-right">
							<a href="index.html">Home</a>
							<a href="about.html">About</a>
							<a href="blog.html">Blog</a>
							<a href="contactus.html">Contact</a>
						</div>
					</div>
				</div>
			</header>
			<!-- Header Ends -->
			
			<!-- Hero starts -->
			<div class="hero inner-page">
				<div class="container">
					<div class="row">
						<div class="col-md-12">
							<div class="intro">
								<h2>Blog<span class="tblue">.</span></h2>
								
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- Hero ends -->
		</div>
		<!-- Top Ends -->
		
		<!-- Blog starts -->
		<div class="blog">
			<div class="container">
				<div class="row">
					<div class="col-md-8 col-sm-8">
						<div class="posts">
							
							<h3><a href="#">Sed justo  ut constur scelerisque</a></h3>
							<div class="post-meta">
								<i class="icon-calendar"></i> 23-8-2013
								<i class="icon-user"></i> Admin
								<i class="icon-folder-open"></i>
								<a href="#"> General</a>
								<span class="pull-right">
									<i class="icon-comment"></i><a href="#"> 2 COMMENTS</a>
								</span>
							</div>
							<div class="post-content">
								<img src="img/blogimage1.jpg" alt="" class="img-responsive"/>
								<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum pellentesque suscipit metus nec blandit. Praesent consectetur feugiat eros eu rhoncus. Phasellus mattis tortor ac nisl pretium, in molestie lectus adipiscing. Nulla in scelerisque enim, sed lobortis nunc. Nullam porttitor porttitor leo at interdum. Aliquam erat volutpat. Nullam nec lectus ligula. Integer ligula tellus, placerat id gravida nec, venenatis ac arcu.</p>
								<a href="#" class="btn btn-primary">Read More...</a>
							</div>
							<hr>
						
							<h3><a href="#">Ut commo ullarper risus nec  mattis</a></h3>
							<div class="post-meta">
								<i class="icon-calendar"></i> 23-8-2013
								<i class="icon-user"></i> Admin
								<i class="icon-folder-open"></i>
								<a href="#"> General</a>
								<span class="pull-right">
									<i class="icon-comment"></i> 2 COMMENTS
								</span>
							</div>
							<div class="post-content">
								<img src="img/blogimage2.jpg" alt="" class="img-responsive"/>
								<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum pellentesque suscipit metus nec blandit. Praesent consectetur feugiat eros eu rhoncus. Phasellus mattis tortor ac nisl pretium, in molestie lectus adipiscing. Nulla in scelerisque enim, sed lobortis nunc. Nullam porttitor porttitor leo at interdum. Aliquam erat volutpat. Nullam nec lectus ligula. Integer ligula tellus, placerat id gravida nec, venenatis ac arcu.  </p>
								<a href="#" class="btn btn-primary">Read More...</a>
							</div>
							<hr>
							<ul class="pagination">
								<li><a href="#">&laquo;</a></li>
								<li><a href="#">1</a></li>
								<li><a href="#">2</a></li>
								<li><a href="#">3</a></li>
								<li><a href="#">4</a></li>
								<li><a href="#">5</a></li>
								<li><a href="#">&raquo;</a></li>
							</ul>
						</div>
					</div>
					<div class="col-md-4 col-sm-4 col-xs-8">
						<div class="sidebar well">
							<div class="widget">
								<h3>Recent Post</h3>
								<ul>
									<li>Etiam adipiscing posuere justo, nec iaculis justo dictum non</li>
									<li>Etiam adipiscing posuere justo, nec iaculis justo dictum non</li>
									<li>Aenean ullamcorper justo tincidunt justo aliquet et lobortis diam faucibus</li>
									<li>Maecenas hendrerit neque id ante dictum mattis</li>
									<li>Maecenas hendrerit neque id ante dictum mattis</li>
								</ul>
							</div>
							<hr>
							<div class="widget">
								<h3>About</h3>
								<p>Nullam porttitor porttitor leo at interdum. Aliquam erat volutpat. Nullam nec lectus ligula. Integer ligula tellus, placerat id gravida nec, venenatis ac arcu.</p>
							</div>
							<hr>
							<div class="widget">
								<a href="#" class="facebook"><i class="icon-facebook"></i></a>
								<a href="#" class="twitter"><i class="icon-twitter"></i></a>
								<a href="#" class="google"><i class="icon-google-plus"></i></a>
								<a href="#" class="pinterest"><i class="icon-pinterest"></i></a>
								<a href="#" class="linkedin"><i class="icon-linkedin"></i></a>
							</div>
							
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- Blog ends -->
		
		<!-- Footer starts -->
		<footer>
			<div class="container">
				
				
				<div class="row">
					<div class="col-md-3 col-xs-6">
						<div class="footer-link">
							<h5>Phasellus</h5>
							<a href="#">Nullam pharetra nec</a><br>
							<a href="#">Vulputate vitae</a><br>
							<a href="#">Phasellus</a>
						</div>
					</div>
					<div class="col-md-3 col-xs-6">
						<div class="footer-link">
							<h5>Pulvinar</h5>
							<a href="#">Aliquam nec</a><br>
							<a href="#">Nam pulvinar massa</a><br>
							<a href="#">Maecenas fringilla nec</a>
						</div>
					</div>
					<div class="col-md-3 col-xs-6">
						<div class="footer-link">
							<h5>Commodo</h5>
							<a href="#">Consectetur adipiscing elit</a><br>
							<a href="#">Commodo a fermentum vel</a><br>
							<a href="#">Eleifend neque</a>
						</div>
					</div>
					<div class="col-md-3 col-xs-6">
						<div class="footer-link">
							<h5>Start</h5>
							<a href="#">Pellentesque</a><br>
							<a href="#">Startups</a><br>
							<a href="#">Habitasse platea dictumst</a>
						</div>
					</div>
				</div>
				
				
				
				<div class="row">
					<div class="col-md-12">
						
						<hr>
						<div class="copy text-center">
							&copy; 2013 <a href="http://www.data-sutra.com/sutra-cms">Quickstart</a> - A default <a href="http://www.data-sutra.com/sutra-cms">Sutra CMS</a> theme.
						</div>
					</div>
				</div>
				
			</div>
		</footer>
		<!-- Footer Ends -->
			
		<!-- Javascript files -->
		<!-- jQuery -->
		<script src="js/jquery.js"></script>
		<!-- Bootstrap JS -->
		<script src="js/bootstrap.min.js"></script>
		<!-- Respond JS for IE8 -->
		<script src="js/respond.min.js"></script>
		<!-- HTML5 Support for IE -->
		<script src="js/html5shiv.js"></script>
		<!-- Custom JS -->
		<script src="js/custom.js"></script>
	</body>	
</html>