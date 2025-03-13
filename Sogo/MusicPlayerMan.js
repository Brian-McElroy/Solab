import { openArtistDetails} from "./MarkersMan.js";
import { markersData} from "./MarkersMan.js";

let debugtxt = document.getElementById("debugtxt");
let player = document.getElementById("MusicPlayer");

export function PlayButtonClicked()
{
    if(openArtistDetails == null) return;   
    let data =  markersData.Artists[openArtistDetails].track;
    if(typeof data.track === 'undefined' && typeof data.album === 'undefined') return;

    player.src = GetSource(data);
    player.style.display ="block";
}

function GetSource(data)
{
    if(typeof data.track === 'undefined') 
        return "https://bandcamp.com/EmbeddedPlayer/album="+data.album+"/size=small/bgcol=333333/linkcol=e32c14/transparent=true/";
    if(typeof data.album === 'undefined') 
        return "https://bandcamp.com/EmbeddedPlayer/track="+data.track+"/size=small/bgcol=ffffff/linkcol=0687f5/transparent=true/";

    return "https://bandcamp.com/EmbeddedPlayer/album="+data.album+"/size=small/bgcol=333333/linkcol=e32c14/track="+data.track+"/transparent=true/";
}


document.getElementById("PlayMusicButton").onclick = PlayButtonClicked;