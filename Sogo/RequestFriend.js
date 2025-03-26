import {markersData} from "./MarkersMan.js";
import {openArtistDetails} from "./MarkersMan.js";



function SendFriendRequest()
{
    let subjectName =  markersData.Artists[openArtistDetails].name;

    $.get(
        ServerUrl + "/RequestFriend",
        {requester:localStorage.getItem(MyIDKey),subject:subjectName}
    )
    .done(function(data) {
        console.log("Request successful:", data);
        // Handle success response here
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
        console.error("Request failed:", textStatus, errorThrown);
        // Handle error here
    })
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

