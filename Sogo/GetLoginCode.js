

function GetLoginUrl()
{
    let myid = localStorage.getItem(MyIDKey);
    let myinvite = localStorage.getItem(MyInviteKey);
    let myname = localStorage.getItem(MyNameKey);

    return SiteUrl+"?"+MyIDKey+"="+myid+"&"+MyInviteKey+"="+myinvite+"&"+MyNameKey+"="+encodeURI(myname);
}

function GetLinkPressed()
{
    navigator.clipboard.writeText(GetLoginUrl());
    document.getElementById("copiedmessage").style.display ="block";
}

function OkPressed()
{
    window.location = "index.html"
}

document.getElementById("CopyLinkButton").onclick = GetLinkPressed;
document.getElementById("OkButton").onclick = OkPressed;
