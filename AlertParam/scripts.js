
const artistidKey ="artistID"

function getArtistIDParam()
{
    const params = new URLSearchParams(window.location.search);
    let artistid = params.get(artistidKey);

    if(artistid == null)
    {
        alert("no param found");
        return;
    }

    localStorage.setItem(artistidKey, artistid);
    alert(artistid);
}

getArtistIDParam();

function AlertIDCookie()
{
    alert(localStorage.getItem(artistidKey));  
}



document.getElementById("AlertIdCookie").onclick = AlertIDCookie;

