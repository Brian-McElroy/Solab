let codeok = false;

function WelcomeSetup()
{
  const params = new URLSearchParams(window.location.search);
  let invitecode = params.get(inviteCodeKey);
  let name = params.get(nameKey);

  codeok = CheckInviteCode(invitecode);

  if(codeok) localStorage.setItem(inviteCodeKey, invitecode);

  SetNameInWelcomeMsg(name);
}

function CheckInviteCode(invitecode)
{
  if(invitecode == null) return false;
  if(invitecode.length < 5) return false;
  return true;
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