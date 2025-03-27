import { markersData} from "./MarkersMan.js";
import {SetDirectlyLinkedArtistName} from "./MarkersMan.js";
import {OpenDirect} from "./MarkersMan.js";
import {openArtistDetails} from "./MarkersMan.js";


let AcceptFriend = document.getElementById("AcceptFriend");
let DenyFriend = document.getElementById("DenyFriend");
let FriendMe = document.getElementById("FriendMe");
let FriendRequestList = document.getElementById("FriendRequestList");
let OneFriendRequest = document.getElementById("OneFriendRequest");

let frs;
let requesting;

export function HandleIncomingFriendRequests(data)
{
    if (data.FriendRequests == null ) return;
    if (data.FriendRequests.length < 1 ) return;
    
    FriendRequestList.style.display ="block";
  
    frs = data.FriendRequests.length;
    let count =0;
    for (let i = data.FriendRequests.length-1; i >-1 ; i--)
    {
        let name = data.FriendRequests[i];
        let clone = OneFriendRequest.cloneNode(true);
        clone.artistname = name;
        clone.innerHTML = name;
        clone.onclick = ()=>{FriendRequestClicked(name,clone);};
        FriendRequestList.appendChild(clone);
        //data.FriendRequests.splice(i, 1);
        count++;
        if(count > 3) break;      
    }

    OneFriendRequest.remove();
}

function FriendRequestClicked(name,clone)
{
    SetDirectlyLinkedArtistName(name);
    OpenDirect();
    clone.remove();
    frs--;
    if(frs <= 0) FriendRequestList.style.display ="none";
}

function AcceptClicked()
{
    ResolveRequest(true);
}

function DenyClicked()
{
    ResolveRequest(false);
}

function ResolveRequest(doaccept)
{
    if(requesting) return;
    requesting = true;

    $.get(
        ServerUrl + "/ResolveFriendRequest",
        {subject:localStorage.getItem(MyIDKey),requester:markersData.Artists[openArtistDetails].name,accept:doaccept}
    )
    .done(function(data) {
        console.log("Request successful:", data);
        AcceptFriend.style.display = "none";
        DenyFriend.style.display = "none";
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

//-----------------------------------

export function IJustSentOne(name)
{
    markersData.YourFriendRequests.push(name);
}


export function HandleFriendButtons(index)
{
    if (localStorage.getItem(MyIDKey) == null)
    {
        FriendMe.style.display = "none";
        AcceptFriend.style.display = "none";
        DenyFriend.style.display = "none";
        return;
    }

    let name = markersData.Artists[index].name;

    if(markersData.YourFriendRequests == undefined) markersData.YourFriendRequests =[];
    if(markersData.FriendRequests == undefined) markersData.FriendRequests =[];

    if(markersData.YourFriendRequests.includes(name))
    {
        FriendMe.style.display = "none";
        AcceptFriend.style.display = "none";
        DenyFriend.style.display = "none";
    }
    else if(markersData.FriendRequests.includes(name))
    {
        AcceptFriend.style.display = "block";
        DenyFriend.style.display = "block";
        FriendMe.style.display = "none";
    }
    else
    {
        FriendMe.style.display = "block";
        AcceptFriend.style.display = "none";
        DenyFriend.style.display = "none";
    }

    if(name == localStorage.getItem(MyNameKey)) FriendMe.style.display = "none";
}



AcceptFriend.onclick =AcceptClicked;
DenyFriend.onclick =DenyClicked;

