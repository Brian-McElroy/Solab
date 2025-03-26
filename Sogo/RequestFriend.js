import {markersData} from "./MarkersMan.js";
import {openArtistDetails} from "./MarkersMan.js";



function SendFriendRequest()
{

}

let friendbutton = document.getElementById("FriendMe");

if (localStorage.getItem(MyIDKey) == null)
{
    friendbutton.style.display = "none";
}
else
{
    friendbutton.onclick = SendFriendRequest;
}

