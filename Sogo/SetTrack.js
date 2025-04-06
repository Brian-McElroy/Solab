
let urlInput = document.getElementById('trackInputField');
let okbutton = document.getElementById("OkButton");

function OkPressed()
{
  //let url = document.getElementById('trackInputField').value;
  let extracted = extractBandcampInfo(urlInput.value);

  if(!IsURLOk(extracted))
  {
    document.getElementById('error').innerHTML ="That doesnt seem right. Click the link above to find out where to get the right code.";
  }
  else
  {
     localStorage.setItem(TrackUrlKey,JSON.stringify(extracted));
     window.location = "Artist_Set_Location.html"
  }
}

function IsURLOk(extracted)
{
    if(extracted.album == null && extracted.track == null) return false;
    if(extracted.href == null ) return false;
    //if(extracted.hrefText == null ) return false;
    return true;
}

function extractBandcampInfo(html)
{
  return{
      album: html.match(/album=(\d+)/)?.[1] || null,
      track: html.match(/track=(\d+)/)?.[1] || null,
      href: html.match(/<a href="([^"]+)"/)?.[1] || null,
      displayName: html.match(/by\s+([^<]+)/)?.[1].trim() || null, 
  };
}

function generateBandcampIframe({ album, track, href, hrefText })
{
  return `<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=${album}/size=small/bgcol=333333/linkcol=e32c14/track=${track}/transparent=true/" seamless><a href="${href}">${hrefText}</a></iframe>`;
}

okbutton.onclick = OkPressed;
urlInput.addEventListener('input', () => 
{
   okbutton.disabled = !(urlInput.value);   
});