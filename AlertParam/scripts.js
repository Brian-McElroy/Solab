
const artistidKey ="artistID"

function WelcomeSetup()
{
    const params = new URLSearchParams(window.location.search);
    let artistid = params.get(inviteCodeKey);

    if(artistid == null)
    {
        alert("no param found");
        return;
    }

    localStorage.setItem(inviteCodeKey, artistid);
    alert(artistid);
}

WelcomeSetup();

function AlertIDCookie()
{
    alert(localStorage.getItem(inviteCodeKey));  
}



document.getElementById("AlertIdCookie").onclick = AlertIDCookie;

