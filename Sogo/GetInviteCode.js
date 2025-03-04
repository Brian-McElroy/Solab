

let gotInviteCode = false;

function RegisterOnServer(url)
{
  let req ={};
  req.invitecode =  localStorage.getItem(inviteCodeKey);
  req.trackurl = localStorage.getItem(TrackUrlKey);
  req.location = JSON.parse(localStorage.getItem(LocationKey));
  req.name = getArtistName(req.trackurl);

  $.get(
    ServerUrl+"/AcceptInvite",
    req,
    function(data){
      alert(data);
    }
  ); 
}

function getArtistName(url) {
    const match = url.match(/^https:\/\/([^\.]+)\.bandcamp\.com/);
    return match ? match[1] : null;
}

function OkPressed()
{
    RegisterOnServer();
}

document.getElementById("OkButton").onclick = OkPressed;
RegisterOnServer();