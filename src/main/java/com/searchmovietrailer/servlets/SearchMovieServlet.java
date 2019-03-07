package com.searchmovietrailer.servlets;
import java.io.IOException;

import com.fasterxml.jackson.core.JsonGenerationException;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.InputStream;
import java.io.StringWriter;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.commons.io.IOUtils;


/**
 * SearchMovieServlet class is used to receive requests from web server, process the data and send movie title data based on search key.
 * 
 * @author Madhuri Pothulaboguda
 */

@WebServlet(name="searchMovieTrailer", urlPatterns = { "/searchMovieTrailer/*" })
public class SearchMovieServlet extends HttpServlet{

	private static final long serialVersionUID = 1L;

	/**
	 * The doGet to receive requests from web server.
	 *
	 * @param request
	 * @param response
	 * @throws ServletException, IOException
	 */
	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) 
			throws ServletException, IOException {
		String searchKey = request.getParameter("searchKey");
		Map<String, String> moviePosterMap = getRelevantMovieList(getOMDBDataFromSearchKey(searchKey));
		ObjectMapper mapper = new ObjectMapper();
		String movieJson = mapper.writeValueAsString(moviePosterMap);
		response.getWriter().write(movieJson);
		response.setContentType("application/json; charset=utf-8");
	}

	/**
	 * The getRelevantMovieList program filters the type movie from search data and returns relevant movie list.
	 *
	 * @param rawDataString
	 * @throws JsonParseException, IOException
	 * @return movieTitleList
	 */
	private Map<String, String> getRelevantMovieList(String rawDataString) throws JsonParseException, IOException {
		ObjectMapper mapper = new ObjectMapper();
		try {
			Map<String,List<Map<String,String>>> rawResultMap = mapper.readValue(rawDataString, Map.class);
			List<Map<String,String>> omdbDataList = rawResultMap.get("Search");
			if(Objects.isNull(omdbDataList) && String.valueOf(rawResultMap.get("Response")).equalsIgnoreCase("False")) {
				//{"Response":"False","Error":"Movie not found!"}
				if(String.valueOf(rawResultMap.get("Error")).equalsIgnoreCase("Movie not found!")) {
					return null;
				}
				//{"Response":"False","Error":"Too many results."}
				else { 	
					return Collections.emptyMap();
				}
			}else {
				Map<String, String> movieTitlePosterMap = omdbDataList.stream()
						.filter(omdbData -> omdbData.get("Type").equalsIgnoreCase("Movie"))
						.collect(Collectors.toMap(data-> data.get("Title"), data->data.get("Poster")));
				return movieTitlePosterMap;
			}
		} catch (JsonGenerationException | JsonMappingException jsonException ) {
			System.out.println(jsonException);
			return Collections.emptyMap();
		}
	}


	/**
	 * The getOMDBDataFromSearchKey program retrieves the OMDB from given searchKey.
	 *
	 * @param searchKey
	 * @throws MalformedURLException, IOException
	 * @return rawDataString
	 */
	private String getOMDBDataFromSearchKey(String searchKey) throws MalformedURLException, IOException {
		InputStream searchKeyResults = new URL("http://www.omdbapi.com/?apikey=36e4e773&s="+searchKey).openStream();
		StringWriter writer = new StringWriter();
		IOUtils.copy(searchKeyResults, writer, "UTF-8");
		return writer.toString();
	}
}