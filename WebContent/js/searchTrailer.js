M.AutoInit();

var suggestionData;

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
			suggestionData = resultData;
			$(document).ready(function(){
				$('input.autocomplete').autocomplete({
					data: JSON.parse(resultData),
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
	if(suggestionData === "null"){
		$('#video-container').empty();
		$('#video-container').append("<br></br><h5>Cound not match the movie name with given search key.</h5><br></br><i class='large material-icons'>sentiment_dissatisfied</i>");
	}else{
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
}

/**
 * Initialize Google API Key and load YouTube
 */
function init(){
	gapi.client.setApiKey("AIzaSyA3Ep5CRQCngp2eBRxuycsKwgZug_KjGi4");
	gapi.client.load("youtube", "v3", function(){});	
}
