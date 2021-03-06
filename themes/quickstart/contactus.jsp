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
								<h2>Contact Us<span class="tblue">.</span></h2>
								
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- Hero ends -->
		</div>
		<!-- Top Ends -->
		
		<!-- Contact starts -->
		<div class="contact">
			<div class="container">
				<div class="row">
					<div class="col-md-12">
						
						<!-- Map starts -->
						<div class="map">
							<iframe height="500" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.co.in/?ie=UTF8&amp;ll=16.200457,77.355809&amp;spn=0.022378,0.042272&amp;t=m&amp;z=15&amp;output=embed"></iframe>		
						</div>
						<!-- Map Ends -->
					</div>
				</div>
				<div class="row">
					<div class="col-md-6 col-sm-6">
						<div class="formdetails well">
							<form class="form-horizontal" role="form">
								<fieldset>
									<legend>Contact Form</legend>
									<div class="form-group">
										<label for="inputName" class="col-lg-3 control-label">Name</label>
										<div class="col-lg-9">
										  <input type="name" class="form-control" id="inputName" placeholder="">
										</div>
									</div>
									<div class="form-group">
										<label for="inputEmail" class="col-lg-3 control-label">Email</label>
										<div class="col-lg-9">
										  <input type="email" class="form-control" id="inputEmail" placeholder="">
										</div>
									</div>
									
									<div class="form-group">
										<label for="inputComment" class="col-lg-3 control-label">Comment</label>
										<div class="col-lg-9">
										  <textarea class="form-control" rows="3"></textarea>
										</div>
									</div>
									<div class="form-group">
										<div class="col-lg-offset-3 col-lg-9">
											<button type="submit" class="btn btn-primary">Submit</button>
											<button type="submit" class="btn btn-default">Reset</button>
										</div>
									</div>
								</fieldset>
							</form>
						</div>
					</div>
					<div class="col-md-6 col-sm-6">
						<div class="well">
							
								<fieldset>
									<legend>Address</legend>
									<address>
										  <strong>Hermit Web</strong><br>
										  Polar Bear Way<br>
										  Nuuk, Greenland 3900<br>
										  <abbr title="Phone">P:</abbr> (123) 456-7890
									</address>
									<address>
										  <strong>Full Name</strong><br>
										  <a href="mailto:#">first.last@yahoo.com</a>
									</address>
								</fieldset>
					
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- contact ends -->
		
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