let codeok = false;

function WelcomeSetup()
{
  const params = new URLSearchParams(window.location.search);
  let invitecode = params.get(inviteCodeKey);
  let name = decodeURI(params.get(nameKey));

  codeok = CheckCode(invitecode);

  if(codeok) localStorage.setItem(inviteCodeKey, invitecode);

  SetNameInWelcomeMsg(name);
}

function SetNameInWelcomeMsg(name)
{
  let p = document.getElementById('welcomeTxt');
  p.innerHTML = p.innerHTML.replace("Inviter",name);
}

function OkPressed()
{
  if(!codeok)
  {
    document.getElementById('error').innerHTML ="Something went wrong. Try opening the invite link again.";
  }
  else window.location = "Artist_Set_Track.html"
}

document.getElementById("OkButton").onclick = OkPressed;
WelcomeSetup();
localStorage.setItem(NewUserKey,"true");