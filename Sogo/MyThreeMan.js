import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

let debugtxt = document.getElementById("debugtxt");

// Select the div with id "map"
export const container = document.getElementById('map');

container.addEventListener('touchstart', (e) => {
    e.preventDefault();
  }, { passive: false });

// Set up scene, camera, and renderer
export const scene = new THREE.Scene();
//scene.background = new THREE.Color( 0xff0000 );

// PERSPCTIVE CAMERA
//const width = container.clientWidth *scale;
//const height = container.clientHeight *scale;
//const camera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, 1, 1000 );
//scene.add( camera );
//const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);


export const width = container.clientWidth;
export const height = container.clientHeight;

// Orthographic Camera Setup
export const aspect = width / height;
export const frustumSize = 6; // Adjust this if needed
export const camera = new THREE.OrthographicCamera(
    -frustumSize * aspect / 2,  // left
        frustumSize * aspect / 2,  // right
        frustumSize / 2,           // top
    -frustumSize / 2,           // bottom
        0.1, 10                    // near, far
);
camera.position.z = 10; // Position the camera

// Renderer
export const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(width, height);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor( 0xffffff, 0);
container.appendChild(renderer.domElement);

// Animation loop
function animate()
{
    //iconFollowPoint();
    renderer.render(scene, camera);
    //requestAnimationFrame(iconFollowPoint);
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


// Bounds
//===========================================

const geometry = new THREE.BoxGeometry( 0.3, 0.3, 0.3 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
export const topleft = new THREE.Mesh( geometry, material );
scene.add( topleft );
topleft.position.set(-4,2.5,0); // (x, y, z)

export const botright = new THREE.Mesh( geometry, material );
scene.add( botright );
botright.position.set(5,-1.8,0); // (x, y, z)