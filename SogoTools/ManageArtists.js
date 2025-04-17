

function PopulateArtistData()
{
    //location.reload();

    let key = document.getElementById("AdminKeyField").value;

    $.get(
        url + "GetAllArtistData",
        {key:key},
        function(data)
        {
            let artistlist = document.getElementById("artistList");

            for (let i = artistlist.children.length -1; i >0  ; i--)
            {
                artistlist.children[i].remove();               
            }

            for (const element of data)
            {
                //console.log(JSON.stringify(element));
                let clone = artistlist.firstElementChild.cloneNode(true);
                let featuredString = (element.featured == true) ? "true":"false";
                clone.style.display = "block";  
                clone.children[0].innerHTML = "Name: " + element.name + "  ID: " + element.id + "  Invite code: " + element.inviteCode + "  Featured: " + featuredString;
                clone.children[1].innerHTML = "Friends:"
                for (const friend of element.friends) clone.children[1].innerHTML += "   " +friend;

                artistlist.appendChild(clone); 
            }
        }
    );
}

function RemoveArtist()
{
    let key = document.getElementById("AdminKeyField").value;
    let id = document.getElementById("removeid").value;

    if(!id) return;

    document.getElementById("removeid").value = "";

    $.get(
        url + "RemoveAnArtist",
        {key:key,id:id}
    )
    .done(function(data) {
        document.getElementById("error").innerHTML =  data;
        PopulateArtistData();
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
        document.getElementById("error").innerHTML =  textStatus +" "+errorThrown;
    })
    .always(function() {
    });
}

function SetArtistFeatured()
{
    let key = document.getElementById("AdminKeyField").value;
    let id = document.getElementById("featureid").value;
    let dofeature = document.getElementById("isfeatured").checked;

    //console.log(dofeature + " " + typeof dofeature);

    if(!id) return;

    document.getElementById("featureid").value = "";

    $.get(
        url + "SetFeatured",
        {key:key,id:id,isFeatured:dofeature}
    )
    .done(function(data) {
        document.getElementById("error").innerHTML =  data;
        PopulateArtistData();
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
        document.getElementById("error").innerHTML =  textStatus +" "+errorThrown;
    })
    .always(function() {
    });
}

function AddAFriend()
{
    let key = document.getElementById("AdminKeyField").value;
    let id1 = document.getElementById("friendshipA").value;
    let id2 = document.getElementById("friendshipB").value;

    if(!id1) return;
    if(!id2) return;

    document.getElementById("friendshipA").value = "";
    document.getElementById("friendshipB").value = "";

    $.get(
        url + "CreateFriendship",
        {key:key,id1:id1,id2:id2}
    )
    .done(function(data) {
        document.getElementById("error").innerHTML =  data;
        PopulateArtistData();
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
        document.getElementById("error").innerHTML =  textStatus +" "+errorThrown;
    })
    .always(function() {
    });
}

function RemoveAFriend()
{
    let key = document.getElementById("AdminKeyField").value;
    let id1 = document.getElementById("removefriendshipA").value;
    let id2 = document.getElementById("removefriendshipB").value;

    if(!id1) return;
    if(!id2) return;

    document.getElementById("removefriendshipA").value = "";
    document.getElementById("removefriendshipB").value = "";

    $.get(
        url + "RemoveFriendship",
        {key:key,id1:id1,id2:id2}
    )
    .done(function(data) {
        document.getElementById("error").innerHTML =  data;
        PopulateArtistData();
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
        document.getElementById("error").innerHTML =  textStatus +" "+errorThrown;
    })
    .always(function() {
    });
}

document.getElementById("GetArtistData").onclick =PopulateArtistData;