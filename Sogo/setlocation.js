import { tappedPos } from "./MarkersMan.js";
import { ChoseLocationFunction } from "./MarkersMan.js";


export function LocationPicked()
{
    okbutton.style.display = "block";
}


function OkPressed()
{
    let location = [tappedPos.x,tappedPos.y];
    localStorage.setItem(LocationKey, JSON.stringify(location));

    window.location = "Artist_Set_Genres.html"
}

let okbutton = document.getElementById("OkButton");
okbutton.onclick = OkPressed;
ChoseLocationFunction = LocationPicked;