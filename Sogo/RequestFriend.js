import {markersData} from "./MarkersMan.js";
import {openArtistDetails} from "./MarkersMan.js";
import {IJustSentOne} from "./FriendRequestNotifier.js";

let requesting = false;

function SendFriendRequest()
{
    if(requesting) return;
    requesting = true;
    let subjectName =  markersData.Artists[openArtistDetails].name;

    $.get(
        ServerUrl + "/RequestFriend",
        {requester:localStorage.getItem(MyIDKey),subject:subjectName}
    )
    .done(function(data) {
        console.log("Request successful:", data);
        friendbutton.style.display = "none";
        IJustSentOne(subjectName);
        // Handle success response here
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
        console.error("Request failed:", textStatus, errorThrown);
        // Handle error here
    })
    .always(function() {
        requesting = false;
    });
}

let friendbutton = document.getElementById("FriendMe");


friendbutton.onclick = SendFriendRequest;


