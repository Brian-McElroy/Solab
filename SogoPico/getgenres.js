let selectedGenres =[];

function GetGenres(url)
{
    $.get(ServerUrl+"/GetGenres",{})
    .done(function(data)
    {
      GotGenres(data);
    })
    .fail(function(jqXHR)
    {
        document.getElementById('error').innerHTML ="Something went wrong. " +jqXHR.responseText;
    });
}

function GotGenres(data)
{
    data.genres.forEach(genre =>
    {
        CreateGenreButton(genre)
    }); 
    
    const node = document.getElementById("genreslist").firstElementChild;
    node.remove();
}

function CreateGenreButton(genre)
{   
    const node = document.getElementById("genreslist").firstElementChild;
    const clone = node.cloneNode(true);
    clone.innerHTML = genre;
    clone.addEventListener("click", function(){GenrePressed(genre);});
    document.getElementById("genreslist").appendChild(clone);
}

function GenrePressed(genre)
{
    if(selectedGenres.includes(genre))
    {
        selectedGenres.splice($.inArray(genre, selectedGenres), 1 );
        document.getElementById('error').innerHTML ="";
    }
    else
    {
        if(selectedGenres.length > 2)
        {
            document.getElementById('error').innerHTML ="You can have 3 genres max.";
        }
        else
        {
            selectedGenres.push(genre);
            document.getElementById('error').innerHTML ="";
        } 
    }
    SetGenresDisplay();
}

function SetGenresDisplay()
{
    let nodes = document.getElementById("genreslist").children;
    for (let i = 0; i < nodes.length; i++)
    {   
        if(selectedGenres.includes(nodes[i].innerHTML)) nodes[i].className = "selectedgenreButton";
        else nodes[i].className = "genreButton";
    }
}

function OkPressed()
{
    if(selectedGenres.length < 1)
    {
        document.getElementById('error').innerHTML ="You must pick at least one genre";
        return;
    }

    localStorage.setItem(MyGenresKey, JSON.stringify(selectedGenres));
   window.location = "Artist_Get_Invite_Code.html"
}

document.getElementById("OkButton").onclick = OkPressed;
GetGenres();