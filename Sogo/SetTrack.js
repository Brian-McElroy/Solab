




function OkPressed()
{
  let url = document.getElementById('trackInputField').value;

  if(!IsURLOk(url))
  {
    document.getElementById('error').innerHTML ="Your track url doesnt seems right. It should be like this...<br>https://ARTISTNAME.bandcamp.com/track/TRACKNAME";
  }
  else
  {
    localStorage.setItem(TrackUrlKey, url);
    window.location = "Artist_Set_Location.html"
  }
}

function IsURLOk(url)
{
    const regex = /^https:\/\/([a-zA-Z0-9-]+)\.bandcamp\.com\/track\/([\w-]+)$/;
    return regex.test(url);
}

document.getElementById("OkButton").onclick = OkPressed;
WelcomeSetup();