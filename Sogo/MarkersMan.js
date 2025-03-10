import * as THREE from 'three';
import { camera } from "./MyThreeMan.js";
//import { LocationPicked } from "./setlocation.js";


let icon = document.getElementById("WhereUserIs");
let debugtxt = document.getElementById("debugtxt");

const markerZ = 0;
export let tappedPos;
export let ChoseLocationFunction;

//  Markers
//==================================================

export function ClickedHere(here)
{
    tappedPos = DivToWorldSpace(here);
    requestAnimationFrame(iconFollowPoint);
    if(ChoseLocationFunction != null) ChoseLocationFunction();
    icon.style.display = "block";
}

export function iconFollowPoint()
{
    let pos = worldToDivSpace(new THREE.Vector3( 0, 0, markerZ ));

    if(tappedPos != null) pos = worldToDivSpace(tappedPos);

    icon.style.top = pos.y*100 +"%";
    icon.style.left = pos.x*100 +"%";
}   


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