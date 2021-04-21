$(document).ready(function() {

    $("header").hide();
    
    setTimeout(function(){
        $("header").fadeIn(); 
    }, 500);


    $("#search-btn").click(function() {
        var search = $("#search").val();
        reset();
        films(search);
        series(search);
        $(".risultati").show();
        $(".result").html(search);
    });

    $(".search").keyup(function(invio) {
        if(invio.which == 13) {
            var search = $("#search").val();
            reset();
            films(search);
            series(search);
            $(".risultati").show();
            $(".result").html(search);

        }    
    });

    $("main").on("click", ".fa-info-circle",
    function() {
        $(this).next().fadeIn();
    });

    $("main").on("click", ".fa-times-circle",
    function() {
        $(this).parent().fadeOut();

    });
    
});

function films(search) {
    $.ajax(
        {
            "url": "https://api.themoviedb.org/3/search/movie",
            "data": {
                "api_key": "a6adae1843502c7becfac80b53ca41ac",
                "query": search,
                "language": "it-IT",
            },
            "method": "GET",
            "success": function(data) {
                if(data.total_results != 0){
                    renderfilms(data.results);
                }else {
                    $(".not-found-film").show();
                }
            },
            "error": function(err) {
                alert("Errore!");
            }
        }
    );
}

function renderfilms(results) {
    var source = $("#movies-template").html();
    var template = Handlebars.compile(source);

    for(var i = 0; i < results.length; i++) {

        if(results[i].poster_path == null) {
            var poster = "img/movie-poster-coming-soon.png"
        }else {
            var poster = "https://images.tmdb.org/t/p/w342/" + results[i].poster_path;
        }

        var context = { 
            "poster_path": poster,
            "title": results[i].title,
            "original_title": results[i].original_title,
            "original_language": results[i].original_language,
            "release_date": results[i].release_date,
            "vote_average": results[i].vote_average,
            "overview": results[i].overview,
        };
        var html = template(context);
        $("#list-film").append(html);
    }
}


function series(search) {
    $.ajax(
        {
            "url": "https://api.themoviedb.org/3/search/tv",
            "data": {
                "api_key": "a6adae1843502c7becfac80b53ca41ac",
                "query": search,
                "language": "it-IT",
            },
            "method": "GET",
            "success": function(data) {
                if(data.total_results != 0){
                    renderseries(data.results);
                }else {
                    $(".not-found-series").show();
                }
            },
            "error": function(err) {
                alert("Errore!");
            }
        }
    );
}

function renderseries(results) {
    var source = $("#series-template").html();
    var template = Handlebars.compile(source);

    for(var i = 0; i < results.length; i++) {

        if(results[i].poster_path == null) {
            var poster = "img/movie-poster-coming-soon.png"
        }else {
            var poster = "https://images.tmdb.org/t/p/w342/" + results[i].poster_path;
        }

        var context = { 
            "poster_path": poster,
            "name": results[i].name,
            "original_name": results[i].original_name,
            "original_language": results[i].original_language,
            "release_date": results[i].release_date,
            "vote_average": results[i].vote_average,
            "overview": results[i].overview,
        };
        var html = template(context);
        $("#list-series").append(html);
    }
}

function reset() {
    $("#search").val("");
    $(".not-found-film").hide();
    $(".not-found-series").hide();
    $("#list-film").empty();
    $("#list-series").empty();
}


