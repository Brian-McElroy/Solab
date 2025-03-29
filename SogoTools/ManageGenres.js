

function PopulateGenres()
{
    $.get(
        url + "GetGenresAndSuggestions",
        {},
        function(data)
        {
            let genrelist = document.getElementById("genreslist");
            let suglist = document.getElementById("suggestionslist");

            genrelist.innerHTML ="";
            suglist.innerHTML ="";

            for (const element of data.genres) {
                genrelist.innerHTML += element + "|||"
            }

            for (const element of data.suggestions) {
                suglist.innerHTML += element + "|||"
            }
        }
    );
}

function AddAGenre()
{
    let key = document.getElementById("AdminKeyField").value;
    let genre = document.getElementById("genreToAdd").value;

    if(genre == null) return;
    if(genre.length < 1) return;

    document.getElementById("genreToAdd").value = "";

    $.get(
        url + "AddAGenre",
        {key:key,genre:genre}
    )
    .done(function(data) {
        document.getElementById("error").innerHTML =  data;
        PopulateGenres();
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
        document.getElementById("error").innerHTML =  textStatus +" "+errorThrown;
    })
    .always(function() {

    });
}

function AddAName()
{
    let key = document.getElementById("AdminKeyField").value;
    let altname = document.getElementById("genreAltName").value;
    let maingenre = document.getElementById("mainGenre").value;

    if(altname == null) return;
    if(altname.length < 1) return;
    if(maingenre == null) return;
    if(maingenre.length < 1) return;

    document.getElementById("genreToAdd").value = "";

    $.get(
        url + "AddAName",
        {key:key,genre:genre}
    )
    .done(function(data) {
        document.getElementById("error").innerHTML =  data;
        PopulateGenres();
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
        document.getElementById("error").innerHTML =  textStatus +" "+errorThrown;
    })
    .always(function() {

    });
}

PopulateGenres();
