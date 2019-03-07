<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="ISO-8859-1">
	<title>Search Movie Trailer</title>
	<h4><center>Search Movie Trailers here !!!</center></h4>
	
	<!-- Compiled and minified CSS -->
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.0/css/materialize.min.css">
	<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
</head>
<body>
	<!-- Import jQuery, Materialize, Google API js -->
	<script type="text/javascript" src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
	<script	src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
	<script type="text/javascript" src="js/searchTrailer.js"></script>
	<script src="https://apis.google.com/js/api.js"></script>
	<script src="https://apis.google.com/js/client.js?onload=init"></script>

	<div class="row">
		<form class="col s12" autocomplete="off">
			
			<!-- Search Input Container -->
			<div class="row">
				<div class="col s12 m4 l3"></div>
				<div class="input-field col s12 m4 l6">
					<input name="search-input" type="text" id="autocomplete-input"
						class="autocomplete" onInput="updateMovieSuggestions()"> 
					<label for="icon_prefix">Movie Title</label>
					<center><a id="search-button" class="waves-effect waves-light btn"
							onclick="searchVideo()"><i class="material-icons right">search</i>search</a></center>
				</div>
				<div class="col s12 m4 l3"></div>
			</div>
			
			<!-- Video Container -->
			<div class="row">
				<div class="col s12 m4 l2"></div>
				<div class="input-field col s12 m4 l8">
					<center>
						<div id="video-container"></div>
					</center>
				</div>
				<div class="col s12 m4 l2"></div>
			</div>
			
		</form>
	</div>
</body>
</html>