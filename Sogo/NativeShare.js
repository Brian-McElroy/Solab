import { markersData } from "./MarkersMan.js";
import { openArtistDetails } from "./MarkersMan.js";

function ShareSite()
{ 
    if (navigator.share)
    {
        navigator.share(
        {
            title: 'A cool way to discover music!',
            text: 'Sogo lets you find music on a world map and shows the connections between artists',
            url: SiteUrl,
        })
        .then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing', error));
    } 
    else
    {
        navigator.clipboard.writeText(SiteUrl);
        console.log('Share not supported on this browser, do it the old way.');
    }
}

function ShareArtist()
{
    let arturl =SiteUrl +"?"+ArtistKey+"=" + encodeURI(markersData.Artists[openArtistDetails].name);

    if (navigator.share)
    {
        navigator.share(
        {
            title: 'Check this artist out on Sogo',
            text: 'Sogo lets you find music on a world map and shows the connections between artists',
            url: arturl,
        })
        .then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing', error));
    } 
    else
    {
        navigator.clipboard.writeText(arturl);
    }
}

let sharebut = document.getElementById("LinkToHereButton");
let shareart = document.getElementById("DetailsHereLink");
shareart.onclick = ShareArtist;

if(OverrideMobileOnly || navigator.share)
{
    sharebut.onclick = ShareSite;
}
else
{
    sharebut.style.display = 'none';   
}



