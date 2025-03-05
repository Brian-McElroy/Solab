
function OkPressed()
{
    let location = [0.51094,0.59092];
    localStorage.setItem(LocationKey, JSON.stringify(location));

    window.location = "Artist_Set_Genres.html"
}

document.getElementById("OkButton").onclick = OkPressed;