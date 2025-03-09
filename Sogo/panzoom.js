
import { width } from "./MyThreeMan.js";
import { height } from "./MyThreeMan.js";
import { camera } from "./MyThreeMan.js";
import { iconFollowPoint } from "./MyThreeMan.js";

// Controls
let isDragging = false;
let previousMousePosition = { x: 0, y: 0 };
let touchDistance = 0;

// Touch
//========================================

function getTouchDistance(touches) {
    const dx = touches[0].pageX - touches[1].pageX;
    const dy = touches[0].pageY - touches[1].pageY;
    return Math.sqrt(dx * dx + dy * dy);
}

function onTouchStart(event) {
    if (event.touches.length === 2) {
        touchDistance = getTouchDistance(event.touches);
    } else if (event.touches.length === 1) {
        previousMousePosition = { x: event.touches[0].clientX, y: event.touches[0].clientY };
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
        previousMousePosition = { x: event.touches[0].clientX, y: event.touches[0].clientY };
    }
}

function onTouchEnd() {
    touchDistance = 0;
}

// Mouse
//========================================

function onMouseDown(event) {
    isDragging = true;
    previousMousePosition = { x: event.clientX, y: event.clientY };
}

function onMouseMove(event) {
    if (!isDragging) return;
    const deltaX = (event.clientX - previousMousePosition.x) / width * 2;
    const deltaY = (event.clientY - previousMousePosition.y) / height * 2;
    camera.position.x -= deltaX * camera.right;
    camera.position.y += deltaY * camera.top;
    previousMousePosition = { x: event.clientX, y: event.clientY };
    requestAnimationFrame(iconFollowPoint);
}

function onMouseUp() {
    isDragging = false;
}

function onWheel(event) {
    const zoomFactor = 1.1;
    const scale = event.deltaY > 0 ? zoomFactor : 1 / zoomFactor;
    camera.left *= scale;
    camera.right *= scale;
    camera.top *= scale;
    camera.bottom *= scale;
    camera.updateProjectionMatrix();
    requestAnimationFrame(iconFollowPoint);
}

window.addEventListener('mousedown', onMouseDown);
window.addEventListener('mousemove', onMouseMove);
window.addEventListener('mouseup', onMouseUp);
window.addEventListener('wheel', onWheel, { passive: false });
window.addEventListener('touchstart', onTouchStart, { passive: false });
window.addEventListener('touchmove', onTouchMove, { passive: false });
window.addEventListener('touchend', onTouchEnd);
