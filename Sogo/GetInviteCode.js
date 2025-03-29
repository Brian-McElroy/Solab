let gotInviteCode = false;
let MyInviteCode;
let MyName;
let MyThing;

function RegisterOnServer(url)
{
  let req ={};
  req.invitecode =  localStorage.getItem(inviteCodeKey);
  req.trackurl = JSON.parse(localStorage.getItem(TrackUrlKey));
  req.location = JSON.parse(localStorage.getItem(LocationKey));
  req.genres = JSON.parse(localStorage.getItem(MyGenresKey));
  req.name = getArtistName(req.trackurl.href);

  if(req.trackurl.displayName != null) 
  {
    req.name = req.trackurl.displayName;
    delete req.trackurl.displayName;
  }

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
    MyThing = data.id;
    MyInviteCode = data.invite;
    localStorage.setItem(MyIDKey,MyThing);
    localStorage.setItem(MyInviteKey,MyInviteCode);
    localStorage.setItem(MyNameKey,MyName);
    document.getElementById("CopyLinkButton").style.display ="block";
    //document.getElementById('OkButton').innerHTML = GetInviteUrl();
    gotInviteCode = true;
}

function GetInviteUrl()
{
    return SiteUrl+"Welcome.html?invite="+ MyInviteCode+"&name="+encodeURI(MyName);
}

function getArtistName(url) {
    const match = url.match(/^https:\/\/([^\.]+)\.bandcamp\.com/);
    return match ? match[1] : null;
}

function RetrieveSavedInviteCode()
{
    MyName = localStorage.getItem(MyNameKey);
    MyInviteCode = localStorage.getItem(MyInviteKey);
    document.getElementById("CopyLinkButton").style.display ="block";
    document.getElementById("OkButton").style.display ="block";
    gotInviteCode = true;
}

function GetLinkPressed()
{
    if(!gotInviteCode) return;
    navigator.clipboard.writeText(GetInviteUrl());
    document.getElementById("copiedmessage").style.display ="block";
    document.getElementById("OkButton").style.display ="block";
}

function OkPressed()
{
    window.location = "index.html"
}

document.getElementById("CopyLinkButton").onclick = GetLinkPressed;
document.getElementById("OkButton").onclick = OkPressed;

if(localStorage.getItem(NewUserKey) == "true")
{
    RegisterOnServer();
    localStorage.setItem(NewUserKey,"false");
} 
else RetrieveSavedInviteCode();