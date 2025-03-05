

let gotInviteCode = false;
let MyInviteCode;
let MyID;
let MyName;

function RegisterOnServer(url)
{
  let req ={};
  req.invitecode =  localStorage.getItem(inviteCodeKey);
  req.trackurl = localStorage.getItem(TrackUrlKey);
  req.location = JSON.parse(localStorage.getItem(LocationKey));
  req.name = getArtistName(req.trackurl);
  MyName = req.name;

  $.get(ServerUrl+"/AcceptInvite",req)
  .done(function(data)
   {
      HandleRegistrySuccess(data);
    })
    .fail(function(jqXHR)
    {
        document.getElementById('error').innerHTML ="Something went wrong. " +jqXHR.responseText;
    });
}

function HandleRegistrySuccess(data)
{
    alert(JSON.stringify(data));

    MyID = data.id;
    MyInviteCode = data.invite;
    localStorage.setItem(MyIDKey,MyID);
    localStorage.setItem(MyInviteKey,MyInviteCode);
    localStorage.setItem(MyNameKey,MyName);
    document.getElementById('OkButton').innerHTML = GetInviteUrl();
    gotInviteCode = true;
}

function GetInviteUrl()
{
    return SiteUrl+"?invite="+ MyInviteCode+"&name="+MyName;
}

function getArtistName(url) {
    const match = url.match(/^https:\/\/([^\.]+)\.bandcamp\.com/);
    return match ? match[1] : null;
}

function OkPressed()
{
    if(!gotInviteCode) return;
    navigator.clipboard.writeText(GetInviteUrl());
    window.location = "index.html"
}

document.getElementById("OkButton").onclick = OkPressed;
RegisterOnServer();