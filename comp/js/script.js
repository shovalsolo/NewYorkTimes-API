
// $('#dropDown').change(function() {      
// $("#dropDown option selected").val();  
// });

function apiget(){
	var choice = $('#dropDown').val(); //getting the value from the dropdown to change category
	var url = "https://api.nytimes.com/svc/topstories/v2/"+choice+".json"; //saving in url the url with the category
	url += '?' + $.param({'api-key': "bc26c8e91bf445e388e87441a3b3219d"}); //concatinating to url the api key to connect to the NYT api
	$.ajax({
	  url: url,
	  method: 'GET',
	}).done(function(result) {	//connecting to api with ajax and the parameters
	 
// remove any div with class of article to not add for each change of category
	  $( ".article" ).remove();

	  var res = result.results;
	  var count = 1;

	  for(var i=0; i< res.length;i++){ //going over the results from the ajax request

		if (count<=12) { //less then 12 because we want to present only 12 each page

		  	if (res[i].multimedia.length>0) { //chacking in the img cell is not empty

			  //var para = $("<div class='article'><p class='title'>"+res[i].title+"</p>"+"<a href="+res[i].url+">"+"<img src="+res[i].multimedia[0].url+">"+"</a>"+"<br>"+"<p class='abstract'>"+res[i].abstract+"</p>"+"</div>");

			  //var para = $("<div class='article'><p class='title'>"+res[i].title+"</p>"+$(".article").css("background", "url("+res[i].multimedia[0].url+")", "background-repeat": "no-repeat")+"<br>"+"<p class='abstract'>"+res[i].abstract+"</p>"+"</div>");

			  //var para = $("<div class='article'><p class='title'>"+res[i].title+"</p>"+$(".article").css("background", "url("+res[i].multimedia[0].url+")")+"<br>"+"<p class='abstract'>"+res[i].abstract+"</p>"+"</div>");
			  //$("#artRes").append(para);

			  $(".select-section").addClass("minifed"); //adding class to class to add style
			  
			  var artAbs = res[i].abstract; //inderting results in to parameters
			  var artImg = res[i].multimedia[4].url;
			  var artLink = res[i].url;

			  var newElement = document.createElement("div"); //creating new div and inserting into a parameter
			  
			  $(newElement).css("background", "url("+artImg+")"); //adding style to the div with the img parameter
			  //$(newElement).append(artAbs);

			  $(newElement).append("<a class='artLink font-open-sans-lig' href="+artLink+">"+artAbs+"</a>"); //adding the link and the text
			  $(newElement).addClass("dt-art tab-art article min-height flex flex-ali-end"); // adding more style to the div
			  $(".artRes").append(newElement); //adding the div to the div that will hold everything
			  count++;

		  }
		}else{ //if there are no image break the loop and dont add the img
			break;
		}

	}

	}).fail(function(err) {
	  throw err;
	});
	
}
