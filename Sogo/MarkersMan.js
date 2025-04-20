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
import {GetMarkerDiameter} from "./MarkerColliderHandler.js";
import {ColliderArtistSelected} from "./MarkerColliderHandler.js";
import {ColliderArtistDeSelected} from "./MarkerColliderHandler.js";
import {GotoPoint} from "./panzoom.js";
import {HandleIncomingFriendRequests} from "./FriendRequestNotifier.js";
import {HandleFriendButtons} from "./FriendRequestNotifier.js";

//import { LocationPicked } from "./setlocation.js";


export let markersData;
export let DOMmarkers = [];
export let openArtistDetails = null;
let DirectlyLinkedArtistName;
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

export function SetDirectlyLinkedArtistName(name)
{
    DirectlyLinkedArtistName = name;
}

export function GetArtistWithThisName(name)
{
    //console.log("myname: "+name);
    for (const element of markersData.Artists)
    {
        //console.log(element.name);
        if(element.name == name) return element;
    }
}

//  Markers
//==================================================

function GetData()
{
    if( typeof MainMapPage === 'undefined') return;



    $.get(
        ServerUrl + "/GetArtistData",
        {id:localStorage.getItem(MyIDKey)},
        function(data)
        {
            markersData = data;
            //debugtxt.innerHTML = JSON.stringify(markersData);
            CreateMarkers(data);
            HandleIncomingFriendRequests(data);
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
    let orig = node.firstElementChild;

    for (let i = 0; i < markersData.Artists.length; i++)
    {
        let clone = orig.cloneNode(true);
        DOMmarkers.push(clone);
        clone.artistIndex = i;
        AddArtistImage(clone.firstElementChild,markersData.Artists[i]);
        //SetInteraction(clone);
        node.appendChild(clone); 
    } 

    orig.style.display= "none";
    ColliderStart();
    OpenDirect();
}

export function OpenDirect()
{
    if(DirectlyLinkedArtistName == null) return;

    for (let i = 0; i< markersData.Artists.length; i++)
    {
        if(markersData.Artists[i].name == DirectlyLinkedArtistName)
        {
            OpenArtistDetails(i);
            GotoPoint(LerpPos(markersData.Artists[i].location));
            break;
        }       
    }
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
    if(openArtistDetails !== null)
    {
        DOMmarkers[openArtistDetails].classList.remove('show');
        details.classList.remove("doanimate");
        details.classList.add("hidedetails");
        details.offsetWidth;
    }

    //ShowHideDOMThing(details,true);
    DetailsName.innerHTML = markersData.Artists[index].name;
    SetGenres(index);
    openArtistDetails = index;
    DOMmarkers[index].classList.add('show');
    ColliderArtistSelected(index);
    HandleFriendButtons(index);
    requestAnimationFrame(iconFollowPoint);

    details.classList.add("doanimate");
    details.classList.remove("hidedetails");

    ArtistSelected(markersData.Artists[index]);
}

function SetGenres(index)
{
    for (let i = DetailsGenres.parentElement.children.length -1; i >0  ; i--)
    {
        DetailsGenres.parentElement.children[i].remove();               
    }

    DetailsGenres.style.display ="block";
    for (let i = 0; i < markersData.Artists[index].genres.length; i++)
    {
        let clone = DetailsGenres.cloneNode(true);
        clone.innerHTML = markersData.Genres[markersData.Artists[index].genres[i]];
        DetailsGenres.parentElement.appendChild(clone);
    }
    DetailsGenres.style.display ="none";
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


function CloseArtistDetails()
{
    if(openArtistDetails == null) return;
    
    DOMmarkers[openArtistDetails].classList.remove('show');
    //ShowHideDOMThing(details,false)
    details.classList.add("hidedetails");
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
        if(markersData == null) return;

        DecideWhichToShow();

        for (let i = 0; i < markersData.Artists.length; i++)
        {
            if(DOMmarkers[i].display =="none") continue;
            DrawOneIcon(DOMmarkers[i],LerpPos(markersData.Artists[i].location));
        } 
        if(openArtistDetails != null) DrawOneIcon(details,LerpPos(markersData.Artists[openArtistDetails].location));
    }

    if( typeof setlocationPage !== 'undefined') 
    {
        if(tappedPos == null) return;
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

export function worldToPixelSpace(point3D)
{
    let divspace = worldToDivSpace(point3D)
    divspace.x *= container.clientWidth;
    divspace.y *= container.clientHeight;
    return divspace;
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


SetInteraction(container);


if( typeof MainMapPage !== 'undefined')
{
    GetMarkerDiameter();
    GetData();
    //CreateFakeData();

    DetailsBCLink.onclick = DetailsGotoBCClicked;
    DetailsHereLink.onclick = DetailsHereLinkClicked;
}
