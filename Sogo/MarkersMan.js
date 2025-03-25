import * as THREE from 'three';
import { camera } from "./MyThreeMan.js";
import { topleft } from "./MyThreeMan.js";
import { botright } from "./MyThreeMan.js";
import { container} from "./MyThreeMan.js";
import { NoOneSelected} from "./LinesMan.js";
import { ArtistSelected} from "./LinesMan.js";
import { UpdateLines} from "./LinesMan.js";
import { DecideWhichToShow} from "./MarkerColliderHandler.js";
import {ColliderStart} from "./MarkerColliderHandler.js";
import {ColliderArtistSelected} from "./MarkerColliderHandler.js";
import {ColliderArtistDeSelected} from "./MarkerColliderHandler.js";
//import { LocationPicked } from "./setlocation.js";


export let markersData;
export let DOMmarkers = [];
export let openArtistDetails = null;
let startX, startY;
let isDragging = false;

let icon = document.getElementById("WhereUserIs");
let debugtxt = document.getElementById("debugtxt");
let details = document.getElementById("ArtistInfo");
let DetailsName = document.getElementById("DetailsName");
let DetailsGenres = document.getElementById("DetailsGenres");
let DetailsBCLink = document.getElementById("DetailsBandCampLink");
let DetailsHereLink = document.getElementById("DetailsHereLink");

const markerZ = 0;
let tappedPos;
export let ChoseLocationFunction;

export function setChoseLocationFunction(fn)
{
    ChoseLocationFunction = fn;
}

//  Markers
//==================================================

function GetData()
{
    if( typeof MainMapPage === 'undefined') return;

    $.get(
        ServerUrl + "/GetArtistData",
        {},
        function(data)
        {
            markersData = data;
            //debugtxt.innerHTML = JSON.stringify(markersData);
            CreateMarkers(data);
            requestAnimationFrame(iconFollowPoint);
        }
    );
}

function CreateFakeData()
{
    markersData= {Artists:[]};

    const maxartists =500;

    for (let index = 0; index < maxartists; index++)
    {
        markersData.Artists.push(CreateFakeArtist(maxartists));       
    }
    CreateMarkers(markersData);
    requestAnimationFrame(iconFollowPoint);
}  

function CreateFakeArtist(maxartists)
{
    let artist = {};
    artist.location = [Math.random(),Math.random()];
    artist.featured = (Math.random() < 0.1);
    artist.friends = [];
    artist.genres =[];

    const numfriends = Math.floor(Math.random() * 9)+1;

    for (let index = 0; index < numfriends; index++)
    {
        artist.friends.push(Math.floor(Math.random() * maxartists))      
    }

    return artist;
}

function CreateMarkers(data)
{
    const node = document.getElementById("map");

    for (let i = 0; i < markersData.Artists.length; i++)
    {
        let clone = node.firstElementChild.cloneNode(true);
        DOMmarkers.push(clone);
        clone.style.display = "block";  
        clone.artistIndex = i;
        AddArtistImage(clone.firstElementChild,markersData.Artists[i]);
        //SetInteraction(clone);
        node.appendChild(clone); 
    } 

    node.firstElementChild.remove();
    ColliderStart();
}

function SetInteraction(div)
{   
    if( typeof MainMapPage === 'undefined') return;

    div.addEventListener('pointerdown', (e) => {
        startX = e.clientX;
        startY = e.clientY;
        isDragging = false; // Reset flag
    });

    div.addEventListener('pointermove', (e) => {
        const threshold = 5; // Allow small movements but not dragging
        if (Math.abs(e.clientX - startX) > threshold || Math.abs(e.clientY - startY) > threshold) {
            isDragging = true; // Mark as dragging
        }
    });

    div.addEventListener('pointerup', (e) => {
    if (!isDragging)
    {
        if(e.target.className === "ArtistMarkerImage")
        {
            OpenArtistDetails(e.target.parentNode.artistIndex);
        }
        else if(e.target instanceof HTMLCanvasElement)
        {
            CloseArtistDetails();
        }
    }
    });
    
    div.addEventListener('dragstart', (e) => {
        e.preventDefault(); // Prevent drag
    });    
}

function OpenArtistDetails(index)
{
    details.style.display = "block"; 
    DetailsName.innerHTML = markersData.Artists[index].name;
    DetailsGenres.innerHTML = GenresToString(index);
    openArtistDetails = index;

    AddArtistImage(document.getElementById("ArtistDetailsImage"),markersData.Artists[index]);
    ColliderArtistSelected(markersData.Artists[index]);
    requestAnimationFrame(iconFollowPoint);
    ArtistSelected(markersData.Artists[index]);
}

function DetailsGotoBCClicked()
{
    let bcurl = markersData.Artists[openArtistDetails].track.href;
    if(typeof bcurl === 'undefined') return;

    window.open(bcurl);
}

function DetailsHereLinkClicked()
{
    console.log("not done yet!! - Brian");
}


function GenresToString(index)
{
    let answer ="";
    for (let i = 0; i < markersData.Artists[index].genres.length; i++)
    {
        if(i > 0) answer +=",";
        answer += markersData.Genres[markersData.Artists[index].genres[i]];
    }
    return answer;    
}

function CloseArtistDetails(index)
{
    details.style.display = "none"; 
    openArtistDetails = null;
    ColliderArtistDeSelected();
    NoOneSelected();
}

function AddArtistImage(node,artistdata)
{
    node.src = "./Images/user.jpg";
    if(typeof(artistdata.image) === "undefined") return;
    if(artistdata.image == null) return;
    node.src =artistdata.image;
}

export function ClickedHere(here)
{
    tappedPos = DivToWorldSpace(here);
    requestAnimationFrame(iconFollowPoint);
    if(ChoseLocationFunction != null) ChoseLocationFunction();
    icon.style.display = "block";
}

export function GetTappedLerped()
{
    let answer =[];
    answer.push(inverseLerp(topleft.position.x,botright.position.x,tappedPos.x));
    answer.push(inverseLerp(topleft.position.y,botright.position.y,tappedPos.y));
    return answer;
}

export function iconFollowPoint()
{
    if( typeof MainMapPage !== 'undefined') 
    {
        for (let i = 0; i < markersData.Artists.length; i++)
        {
            if(DOMmarkers[i].display =="none") continue;
            DrawOneIcon(DOMmarkers[i],LerpPos(markersData.Artists[i].location));
        } 
        if(openArtistDetails != null) DrawOneIcon(details,LerpPos(markersData.Artists[openArtistDetails].location));
    }

    if( typeof setlocationPage !== 'undefined') 
    {
        DrawOneIcon(icon,tappedPos)
    }
    return;
}   

export function LerpPos(location)
{
    let vec = new THREE.Vector3(MylerpUnclamped(topleft.position.x,botright.position.x,location[0])
    ,MylerpUnclamped(topleft.position.y,botright.position.y,location[1]), markerZ);
    //console.log(JSON.stringify(vec));
    return vec;
}

function DrawOneIcon(icon,worldpos)
{
    let pos = worldToDivSpace(worldpos);
    icon.style.top = pos.y*100 +"%";
    icon.style.left = pos.x*100 +"%";
}

// Transformations
//===================================================

export function worldToDivSpace(point3D)
 {
    // Clone the point to avoid modifying the original
    if (!point3D) return;
    const projected = point3D.clone().project(camera);
    const x = (projected.x * 0.5 + 0.5) ;
    const y = (1 - (projected.y * 0.5 + 0.5)); // Flip Y for screen coordinates
    return { x, y };
}

function DivToWorldSpace(screenPos) {
    // Convert screen coordinates back to NDC (-1 to 1)
    const ndcX = screenPos.x * 2 - 1;
    const ndcY = (1 - screenPos.y) * 2 - 1; // Flip Y back

    // Create a 3D vector at the given depth
    const ndcPoint = new THREE.Vector3(ndcX, ndcY, markerZ);
    // Unproject the point from screen space back to world space
    ndcPoint.unproject(camera);
    return ndcPoint;
}

//GetData();
CreateFakeData();
SetInteraction(container);


if( typeof MainMapPage !== 'undefined')
{
    DetailsBCLink.onclick = DetailsGotoBCClicked;
    DetailsHereLink.onclick = DetailsHereLinkClicked;
}
