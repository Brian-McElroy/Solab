
import {SetDirectlyLinkedArtistName} from "./MarkersMan.js";

function HandleDirectLink()
{
    const params = new URLSearchParams(window.location.search);
    let artist = params.get(ArtistKey);
    if(artist == null) return;

    SetDirectlyLinkedArtistName(decodeURI(artist));
}

HandleDirectLink();
window.history.replaceState({}, "", window.location.pathname);