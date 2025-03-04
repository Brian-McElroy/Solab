function OkPressed()
{
    let location = [0.51094,0.59092];
    localStorage.setItem(LocationKey, JSON.stringify(location));

    window.location = "Artist_Get_Invite_Code.html"
}

document.getElementById("OkButton").onclick = OkPressed;