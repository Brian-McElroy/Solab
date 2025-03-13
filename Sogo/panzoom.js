
import { width } from "./MyThreeMan.js";
import { height } from "./MyThreeMan.js";
import { camera } from "./MyThreeMan.js";
import { iconFollowPoint } from "./MarkersMan.js";
import {ClickedHere } from "./MarkersMan.js";
import { container } from "./MyThreeMan.js";
import { topleftExtents } from "./MyThreeMan.js";
import { botrightExtents } from "./MyThreeMan.js";

let debugtxt = document.getElementById("debugtxt");

// Controls
let isDragging = false;
let previousMousePosition = { x: 0, y: 0 };
let startMousePosition = { x: 0, y: 0 };
let currentMousePosition = { x: 0, y: 0 };
let touchDistance = 0;
let multitouch = false;

const leeway = 0.065;

// Touch
//========================================

function getTouchDistance(touches) {
    const dx = touches[0].pageX - touches[1].pageX;
    const dy = touches[0].pageY - touches[1].pageY;
    return Math.sqrt(dx * dx + dy * dy);
}

function onTouchStart(event) {
    if (event.touches.length > 1) multitouch = true;

    if (event.touches.length === 2) {
        touchDistance = getTouchDistance(event.touches);
    } else if (event.touches.length === 1)
    {      
        startMousePosition ={ x: event.touches[0].clientX, y: event.touches[0].clientY };
        previousMousePosition = { x: event.touches[0].clientX, y: event.touches[0].clientY };
        currentMousePosition = { x: event.touches[0].clientX, y: event.touches[0].clientY };
    }
}

function onTouchMove(event) {
    if (event.touches.length === 2) {
        const newDistance = getTouchDistance(event.touches);
        const zoomFactor = touchDistance / newDistance;
        camera.left *= zoomFactor;
        camera.right *= zoomFactor;
        camera.top *= zoomFactor;
        camera.bottom *= zoomFactor;
        camera.updateProjectionMatrix();
        touchDistance = newDistance;
    } else if (event.touches.length === 1) {
        const deltaX = (event.touches[0].clientX - previousMousePosition.x) / width * 2;
        const deltaY = (event.touches[0].clientY - previousMousePosition.y) / height * 2;
        camera.position.x -= deltaX * camera.right;
        camera.position.y += deltaY * camera.top;
        currentMousePosition = { x: event.touches[0].clientX, y: event.touches[0].clientY };
        previousMousePosition = { x: event.touches[0].clientX, y: event.touches[0].clientY };
    }
    clampCameraToExtents(camera,topleftExtents,botrightExtents);
    requestAnimationFrame(iconFollowPoint);
}

function onTouchEnd(event)
{
    touchDistance = 0;

    if (event.touches.length < 1) multitouch = false;

    if (event.touches.length === 1)
    {
        previousMousePosition = { x: event.touches[0].clientX, y: event.touches[0].clientY };
        currentMousePosition = { x: event.touches[0].clientX, y: event.touches[0].clientY };
    }   
    if (event.touches.length === 0)
    {
        HandleTapToSetLocation(currentMousePosition.x,currentMousePosition.y)
    }   
}

// Mouse
//========================================

function onMouseDown(event) {
    isDragging = true;
    previousMousePosition = { x: event.clientX, y: event.clientY };
    startMousePosition = { x: event.clientX, y: event.clientY };
}

function onMouseMove(event) {
    if (!isDragging) return;
    const deltaX = (event.clientX - previousMousePosition.x) / width * 2;
    const deltaY = (event.clientY - previousMousePosition.y) / height * 2;
    camera.position.x -= deltaX * camera.right;
    camera.position.y += deltaY * camera.top;
    previousMousePosition = { x: event.clientX, y: event.clientY };
    clampCameraToExtents(camera,topleftExtents,botrightExtents);
    requestAnimationFrame(iconFollowPoint);
}

function onMouseUp(event) 
{
    isDragging = false;
    HandleTapToSetLocation(event.clientX,event.clientY )
}

function onWheel(event) {
    const zoomFactor = 1.1;
    const scale = event.deltaY > 0 ? zoomFactor : 1 / zoomFactor;
    camera.left *= scale;
    camera.right *= scale;
    camera.top *= scale;
    camera.bottom *= scale;
    clampCameraToExtents(camera,topleftExtents,botrightExtents);
    //camera.updateProjectionMatrix();
    requestAnimationFrame(iconFollowPoint);
}

// Both
//=======================================

function HandleTapToSetLocation(eventX,eventY)
{
    if(multitouch) return;
    if( typeof setlocationPage === 'undefined') return;
    if(!isMouseUpInsideDiv(eventX,eventY)) return;

    const dx = (eventX - startMousePosition.x) / width * 2;
    const dy = (eventY - startMousePosition.y) / height * 2;
    let dist = Math.sqrt(dx * dx + dy * dy);
    //debugtxt.innerHTML = dist;
    if(dist <= leeway)
    {   
        const rect = container.getBoundingClientRect(); 
        const x = (eventX - rect.left) / rect.width;  
        const y = (eventY - rect.top) / rect.height;  
        ClickedHere({x:x,y:y })
    }
}

function isMouseUpInsideDiv(eventX,eventY)
{
    const rect = container.getBoundingClientRect();
    return(
        eventX >= rect.left &&
        eventX <= rect.right &&
        eventY >= rect.top &&
        eventY <= rect.bottom
    );
}

// Panzoom limits

function clampCameraToExtents(camera, topleft, botright)
 {
    let maxZoomIn = 0.05;

    // Calculate available space in extents
    const maxWidth = botright.position.x - topleft.position.x;
    const maxHeight = topleft.position.y - botright.position.y;

    // Get current frustum size
    let width = camera.right - camera.left;
    let height = camera.top - camera.bottom;

    // Determine max zoom out limit (letterboxing)
    const zoomOutX = maxWidth / width;
    const zoomOutY = maxHeight / height;
    const maxZoomOut = Math.min(zoomOutX, zoomOutY);

    // Determine max zoom in limit (arbitrary limit)
    const minWidth = maxWidth * maxZoomIn;
    const minHeight = maxHeight * maxZoomIn;
    const zoomInX = minWidth / width;
    const zoomInY = minHeight / height;
    const maxZoomInFactor = Math.max(zoomInX, zoomInY); // Ensures it doesn't zoom in past the limit

    // Apply zoom limits
    const zoomFactor = Math.min(Math.max(maxZoomInFactor, 1), maxZoomOut);
    width *= zoomFactor;
    height *= zoomFactor;
    camera.left = -width / 2;
    camera.right = width / 2;
    camera.top = height / 2;
    camera.bottom = -height / 2;

    // Recalculate camera width/height after zoom correction
    width = camera.right - camera.left;
    height = camera.top - camera.bottom;

    // Clamp X position
    const minX = topleft.position.x + width / 2;
    const maxX = botright.position.x - width / 2;
    camera.position.x = Math.max(minX, Math.min(maxX, camera.position.x));

    // Clamp Y position
    const minY = botright.position.y + height / 2;
    const maxY = topleft.position.y - height / 2;
    camera.position.y = Math.max(minY, Math.min(maxY, camera.position.y));

    // Update projection matrix
    camera.updateProjectionMatrix();
}


window.addEventListener('mousedown', onMouseDown);
window.addEventListener('mousemove', onMouseMove);
window.addEventListener('mouseup', onMouseUp);
window.addEventListener('wheel', onWheel, { passive: false });
window.addEventListener('touchstart', onTouchStart, { passive: false });
window.addEventListener('touchmove', onTouchMove, { passive: false });
window.addEventListener('touchend', onTouchEnd);
