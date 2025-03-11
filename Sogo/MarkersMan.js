import * as THREE from 'three';
import { camera } from "./MyThreeMan.js";
import { topleft } from "./MyThreeMan.js";
import { botright } from "./MyThreeMan.js";
//import { LocationPicked } from "./setlocation.js";

let markersData;
let DOMmarkers = [];

let icon = document.getElementById("WhereUserIs");
let debugtxt = document.getElementById("debugtxt");

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
            CreateMarkers(data);
            requestAnimationFrame(iconFollowPoint);
        }
    );
}

function CreateMarkers(data)
{
    const node = document.getElementById("map");

    for (let i = 0; i < markersData.Artists.length; i++)
    {
        const clone = node.firstElementChild.cloneNode(true);
        DOMmarkers.push(clone);
        clone.style.display = "block";     
        node.appendChild(clone); 
    } 

    node.firstElementChild.remove();
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
    return [answer];
}

export function iconFollowPoint()
{
    if( typeof MainMapPage !== 'undefined') 
    {
        for (let i = 0; i < markersData.Artists.length; i++)
        {
            DrawOneIcon(DOMmarkers[i],LerpPos(markersData.Artists[i].location));
        } 
    }

    if( typeof setlocationPage !== 'undefined') 
    {
        DrawOneIcon(icon,tappedPos)
    }
    return;
}   

function LerpPos(location)
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

function worldToDivSpace(point3D)
 {
    // Clone the point to avoid modifying the original
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

GetData();