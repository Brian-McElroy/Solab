import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

let icon = document.getElementById("testicon");
let debugtxt = document.getElementById("debugtxt");

// Select the div with id "map"
const container = document.getElementById('map');

// Set up scene, camera, and renderer
const scene = new THREE.Scene();
//scene.background = new THREE.Color( 0xff0000 );


//const width = container.clientWidth *scale;
//const height = container.clientHeight *scale;
//const camera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, 1, 1000 );
//scene.add( camera );
//const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);


const width = container.clientWidth;
const height = container.clientHeight;

// Orthographic Camera Setup
const aspect = width / height;
const frustumSize = 6; // Adjust this if needed
const camera = new THREE.OrthographicCamera(
    -frustumSize * aspect / 2,  // left
        frustumSize * aspect / 2,  // right
        frustumSize / 2,           // top
    -frustumSize / 2,           // bottom
        0.1, 10                    // near, far
);
camera.position.z = 10; // Position the camera

// Renderer
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(width, height);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor( 0xffffff, 0);
container.appendChild(renderer.domElement);

// Animation loop
function animate() {
    //RotateCube();
    iconFollowPoint();
    camera.translateX( 0.005 );
    renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);

// Resize Handler
function onResize() {
    const newWidth = container.clientWidth;
    const newHeight = container.clientHeight;

    // Adjust camera aspect
    camera.left = -frustumSize * (newWidth / newHeight) / 2;
    camera.right = frustumSize * (newWidth / newHeight) / 2;
    camera.top = frustumSize / 2;
    camera.bottom = -frustumSize / 2;
    camera.updateProjectionMatrix();

    // Update renderer size
    renderer.setSize(newWidth, newHeight);
}

window.addEventListener('resize', onResize);

// 3d mesh
//===========================================

const loader = new GLTFLoader();
loader.load( './world_map/Brian_edited.glb', function ( gltf ) {

	scene.add( gltf.scene );

}, undefined, function ( error ) {

	console.error( error );

} );


const light = new THREE.AmbientLight(new THREE.Color().setRGB( 1, 1, 1 ),4);
scene.add( light );


function iconFollowPoint()
{
    let pos = getScreenPosition(new THREE.Vector3( 0, 0, 0 ));

    icon.style.top = pos.y*100 +"%";
    icon.style.left = pos.x*100 +"%";
}   

function getScreenPosition(point3D) {
    // Clone the point to avoid modifying the original
    const projected = point3D.clone().project(camera);

    const x = (projected.x * 0.5 + 0.5) ;
    const y = (1 - (projected.y * 0.5 + 0.5)); // Flip Y for screen coordinates

    return { x, y };
}



