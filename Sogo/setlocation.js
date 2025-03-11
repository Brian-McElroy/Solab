import { GetTappedLerped } from "./MarkersMan.js";
import { setChoseLocationFunction } from "./MarkersMan.js";


export function LocationPicked()
{
    okbutton.style.display = "block";
}


function OkPressed()
{
    let location =  GetTappedLerped();
    localStorage.setItem(LocationKey, JSON.stringify(location));

    console.log(JSON.stringify(location));

    //document.getElementById("debugtxt").innerHTML += JSON.stringify(location);
    window.location = "Artist_Set_Genres.html"
}

let okbutton = document.getElementById("OkButton");
okbutton.onclick = OkPressed;
setChoseLocationFunction(LocationPicked);