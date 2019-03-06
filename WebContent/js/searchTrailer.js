M.AutoInit();

//var SuggestionData = {"Apple": null, "Microsoft": null, "Google": 'https://placehold.it/250x250', "Goo": null,};
//var SuggestionData = {"Tong hau goo si":"N/A","Goo Goo Dolls Live in Buffalo":"N/A","Goo Goo Dolls: Live at Red Rocks":"N/A","Goo":"N/A","Goo Goo Goliath":"https://m.media-amazon.com/images/M/MV5BNTMyOTgzMmQtNWYwZi00OTM1LWJmZmEtNmU0ZTM5MTRiNzU5XkEyXkFqcGdeQXVyMDM0MzU2NA@@._V1_SX300.jpg","The Duke of Goo":"N/A","Lik goo lik goo dui dui pong":"https://images-na.ssl-images-amazon.com/images/M/MV5BOTVlYjgxYTUtMDc2MS00NjQ0LTllMDEtMzlkZTc3Yjk4OTcyXkEyXkFqcGdeQXVyMzU0NzkwMDg@._V1_SX300.jpg"};

/**
 * To replace {{keys}} from an HTML template with formatted JSON data.
 * @author Florian Fries
 */
function tplawesome(e,t){res=e;for(var n=0;n<t.length;n++){res=res.replace(/\{\{(.*?)\}\}/g,function(e,r){return t[n][r]})}return res}

/**
 * To update movie suggestions based on search key.
 * Called when input is changed on the search field.
 */
function updateMovieSuggestions(){
	var searchKeyValue = document.querySelector("input[name='search-input']").value;
	$.ajax({
		type: "GET",
		url: "/MovieTrailerSearch/searchMovieTrailer/*",
		data : {'searchKey' : searchKeyValue},
		contentType: "application/json; charset=utf-8",
		dataType: "html",
		success: function (resultData) {
			$(document).ready(function(){
				console.log("*******update*******\n"+resultData);
				$('input.autocomplete').autocomplete({
					data: resultData,
//					data: SuggestionData,
				});
			});
		},
		error: function(xhr, status, error){
			console.log(xhr.status);
		},
	});
}

/**
 * Search for video from Google's YouTube API.
 * This function is called on the click of search button.
 */
function searchVideo() {
	var searchKey = document.querySelector("input[name='search-input']").value.replace(/ /g, "+");
	console.log(searchKey);
	var request = gapi.client.youtube.search.list({
		q: searchKey+"+Trailer",
		type: "video",
		maxResults: 4,
		part: 'snippet'
	});

	request.execute(function(response) {
		var results = response.result;
		$('#video-container').empty();
		$.each(results.items, function(index, item) {
			var videoId = item.id.videoId;
			var videoTitle = item.snippet.title;
			$.get("displayVideo.html", function(data) {
				$('#video-container').append(tplawesome(data,[{"videoTitle":videoTitle, "videoId":videoId}]));
			});
		});
	});
}

/**
 * Initialize Google API Key and load YouTube
 */
function init(){
	gapi.client.setApiKey("AIzaSyA3Ep5CRQCngp2eBRxuycsKwgZug_KjGi4");
	gapi.client.load("youtube", "v3", function(){});	
}
