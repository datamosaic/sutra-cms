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
		<link href="<%=(String)request.getAttribute("themeDirectory")%>/css/bootstrap.min.css" rel="stylesheet">
		<!-- Font awesome CSS -->
		<link href="<%=(String)request.getAttribute("themeDirectory")%>/css/font-awesome.min.css" rel="stylesheet">		
		<!-- Custom CSS -->
		<link href="<%=(String)request.getAttribute("themeDirectory")%>/css/style.css" rel="stylesheet">
		
		<!-- Favicon -->
		<link rel="shortcut icon" href="#">
		<jsp:include page='<%= (String)request.getAttribute("head") %>' />
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
			<div class="hero">
				<div class="container">
					<div class="row">
						<div class="col-md-8">
							<div class="intro">
								<h2>Simple<span class="tblue">.</span> Minimal<span class="tblue">.</span> Cloud<span class="tblue">.</span></h2>
								<p>Nullam nec purus mollis, interdum quam vel, viverra urna. Sed dictum orci sed velit ornare, ac venenatis. </p><br />
								<a href="#" class="download"><i class="icon-cloud-download"></i> Download</a> <strong>or Try It</strong>
								<div class="applinks">
									<a href="#"><i class="icon-android"></i></a>
									<a href="#"><i class="icon-apple"></i></a>
									<a href="#"><i class="icon-windows"></i></a>
								</div>
							</div>
						</div>
						<div class="col-md-4">
							<div class="shot">
								<img src="<%=(String)request.getAttribute("themeDirectory")%>/img/phone1.png" alt="image" class="img-responsive"/>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- Hero ends -->
		</div>
		<!-- Top Ends -->
		
		<!-- Feature Starts -->
		<div class="features">
			<div class="container">
				<%=pageData.get("Features")%>
			</div>
		</div>
		
		<!-- Feature Ends -->
		
		<!-- Shots starts -->
		<div class="shots">
			<div class="container">
				<!-- shot1-->
				<div class="row">
					<div class="col-md-4">
						<div class="screenshot">
							<img src="<%=(String)request.getAttribute("themeDirectory")%>/img/f2.png" alt="image" class="img-responsive"/>
						</div>
					</div>
					<div class="col-md-8">
						<div class="shotcontent">
							<h3>Praesent Tincidunt <span class="text-muted"> Tellus Augue</span></h3>
							<p class="shot-para">Dapibus vitae velit. Pellentesque vel venenatis leo, vel egestas velit.In ullamcorper dolor ut odio facilisis tempus. Duis id erat erat. </p> 
							<hr>
							
							<div class="row">
								<div class="col-md-6 col-xs-6">
									<div class="shot-content-body">
										<h4><i class="icon-cloud tblue"></i> Envelope</h4>
										<p> Cras tincidunt ligula orci, ac sodales urna tincidunt eu. Nullam lacinia placerat justo. </p>
									</div>
								</div>
								<div class="col-md-6 col-xs-6">
									<div class="shot-content-body">
										<h4><i class="icon-camera tblue"></i> Facebook</h4>
										<p> Praesent tincidunt tellus augue, a tempor massa iaculis non. Phasellus et mi ante. </p>
									</div>
								</div>
							</div>
							<hr>
							<a href="#" class="download"><i class="icon-cloud-download"></i> Download</a>
						</div>
					</div>
					
				</div>
				<hr>
				<!-- shot1 ends -->
				
				<!-- shot2 -->
				<div class="row">
					<div class="col-md-8">
						<div class="shotcontent">
							<h3>Vivamus Sed <span class="text-muted">Fringilla Tellus Tellus</span></h3>
							<p class="shot-para">Dapibus vitae velit. Pellentesque vel venenatis leo, vel egestas velit.In ullamcorper dolor ut odio facilisis tempus. Duis id erat erat. </p> 
							<hr>
							
							<div class="row">
								<div class="col-md-6 col-xs-6">
									<div class="shot-content-body">
										<h4><i class="icon-linux tblue"></i> Envelope</h4>
										<p> Cras tincidunt ligula orci, ac sodales urna tincidunt eu. Nullam lacinia placerat justo. </p>
									</div>
								</div>
								<div class="col-md-6 col-xs-6">
									<div class="shot-content-body">
										<h4><i class="icon-apple tblue"></i> Facebook</h4>
										<p> Praesent tincidunt tellus augue, a tempor massa iaculis non. Phasellus et mi ante. </p>
									</div>
								</div>
							</div>
							<hr>
							<a href="#" class="download"><i class="icon-cloud-download"></i> Download</a>
						</div>
					</div>
					<div class="col-md-4">
						<div class="screenshot">
							<img src="<%=(String)request.getAttribute("themeDirectory")%>/img/f3.png" alt="image" class="img-responsive"/>
						</div>
					</div>
				</div>
				<hr>
				<!-- shot2 ends -->
				
				<!-- shot3 -->
				<div class="row">
					<div class="col-md-4">
						<div class="screenshot">
							<img src="<%=(String)request.getAttribute("themeDirectory")%>/img/f4.png" alt="image" class="img-responsive"/>
						</div>
					</div>
					<div class="col-md-8">
						<div class="shotcontent">
							<h3>Morbi Blandi<span class="text-muted"> Sed Tincidunt.</span></h3>
							<p class="shot-para">Dapibus vitae velit. Pellentesque vel venenatis leo, vel egestas velit.In ullamcorper dolor ut odio facilisis tempus. Duis id erat erat. </p> 
							<hr>
							
							<div class="row">
								<div class="col-md-6 col-xs-6">
									<div class="shot-content-body">
										<h4><i class="icon-twitter tblue"></i> Envelope</h4>
										<p> Cras tincidunt ligula orci, ac sodales urna tincidunt eu. Nullam lacinia placerat justo. </p>
									</div>
								</div>
								<div class="col-md-6 col-xs-6">
									<div class="shot-content-body">
										<h4><i class="icon-google-plus tblue"></i> Facebook</h4>
										<p> Praesent tincidunt tellus augue, a tempor massa iaculis non. Phasellus et mi ante. </p>
									</div>
								</div>
							</div>
							<hr>
							<a href="#" class="download"><i class="icon-cloud-download"></i> Download</a>
						</div>
					</div>
				</div>
				<!-- shot3 ends -->
				<hr>
			</div>
			
		</div>
		
		<!-- Shots Ends -->	
		
		<!-- Footer starts -->
		<footer>
			<div class="container">
				
				
				<div class="row">
					<div class="col-md-3  col-xs-6">
						<div class="footer-link">
							<h5>Phasellus</h5>
							<a href="#">Nullam pharetra nec</a><br>
							<a href="#">Vulputate vitae</a><br>
							<a href="#">Phasellus</a>
						</div>
					</div>
					<div class="col-md-3  col-xs-6">
						<div class="footer-link">
							<h5>Pulvinar</h5>
							<a href="#">Aliquam nec</a><br>
							<a href="#">Nam pulvinar massa</a><br>
							<a href="#">Maecenas fringilla nec</a>
						</div>
					</div>
					<div class="col-md-3  col-xs-6">
						<div class="footer-link">
							<h5>Commodo</h5>
							<a href="#">Consectetur adipiscing elit</a><br>
							<a href="#">Commodo a fermentum vel</a><br>
							<a href="#">Eleifend neque</a>
						</div>
					</div>
					<div class="col-md-3  col-xs-6">
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
		<script src="<%=(String)request.getAttribute("themeDirectory")%>/js/jquery.js"></script>
		<!-- Bootstrap JS -->
		<script src="<%=(String)request.getAttribute("themeDirectory")%>/js/bootstrap.min.js"></script>
		<!-- Respond JS for IE8 -->
		<script src="<%=(String)request.getAttribute("themeDirectory")%>/js/respond.min.js"></script>
		<!-- HTML5 Support for IE -->
		<script src="<%=(String)request.getAttribute("themeDirectory")%>/js/html5shiv.js"></script>
		<!-- Custom JS -->
		<script src="<%=(String)request.getAttribute("themeDirectory")%>/js/custom.js"></script>
		<jsp:include page='<%= (String)request.getAttribute("foot") %>' />
	</body>	
</html>