

let flist = document.getElementById("FriendsList");

let requesting =false;

function Populate(data)
{

    let orig = flist.firstElementChild;
    orig.display ="none";

    for (let i = 0; i < data.length; i++)
    {
        let clone = orig .cloneNode(true);
        clone.innerHTML = data[i].name;
        clone.display ="block";
        clone.origIndex = i;
        flist.appendChild(clone);        
    }    
    orig.remove();
    SetTopFive();
}

function SetTopFive()
{
    for (let i = 0; i < flist.children.length; i++)
    {
        let highlight = i < TopFriendsNum;

        if(highlight)
        {
            if(!flist.children[i].classList.contains("topFive")) flist.children[i].classList.add("topFive");
        }
        else
        {
            if(flist.children[i].classList.contains("topFive")) flist.children[i].classList.remove("topFive");
        }
    }
}

function OkPressed()
{
    SendFriendsList();
}

function GetNewOrder()
{
    let neworder =[];

    for (let i = 0; i < flist.children.length; i++)
    {
        neworder.push(flist.children[i].origIndex);
    }
    return neworder;
}

//------------

function GetFriendsList()
{
    if(requesting) return;
    requesting = true;

    $.get(
        ServerUrl + "/GetMyFriendsList",
        {id:localStorage.getItem(MyIDKey)}
    )
    .done(function(data) {
        console.log("Request successful:", data);
        Populate(data);
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
        console.error("Request failed:", textStatus, errorThrown);
        // Handle error here
    })
    .always(function() {
        requesting = false;
    });
}

function SendFriendsList()
{
    if(requesting) return;
    requesting = true;

    $.get(
        ServerUrl + "/OrderMyFriendsList",
        {id:localStorage.getItem(MyIDKey),order:GetNewOrder()}
    )
    .done(function(data) {
        console.log("Request successful:", data);
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
        console.error("Request failed:", textStatus, errorThrown);
        // Handle error here
    })
    .always(function() {
        window.location = "index.html";
        requesting = false;
    });
}

//-------------

document.getElementById("OkButton").onclick = OkPressed;
GetFriendsList();