import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import {Update as UpdatePanZoom} from "./panzoom.js";
import { iconFollowPoint } from "./MarkersMan.js";

import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { OutlinePass } from 'three/addons/postprocessing/OutlinePass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { FXAAShader } from 'three/addons/shaders/FXAAShader.js';
//import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';

import { AddBorderLines } from "./CountryBorderLines.js";


let debugtxt = document.getElementById("debugtxt");

// Select the div with id "map"
export const container = document.getElementById('map');

container.addEventListener('touchstart', (e) => {
    e.preventDefault();
  }, { passive: false });

// Set up scene, camera, and renderer

//scene.background = new THREE.Color( 0xff0000 );

// PERSPCTIVE CAMERA
//const width = container.clientWidth *scale;
//const height = container.clientHeight *scale;
//const camera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, 1, 1000 );
//scene.add( camera );
//const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);

export const scene = new THREE.Scene();

export const width = container.clientWidth;
export const height = container.clientHeight;

// Orthographic Camera Setup
export const aspect = width / height;
export const frustumSize = 3; // Adjust this if needed
export const camera = new THREE.OrthographicCamera(
    -frustumSize * aspect / 2,  // left
        frustumSize * aspect / 2,  // right
        frustumSize / 2,           // top
    -frustumSize / 2,           // bottom
        0.01, 100                    // near, far
);
camera.position.z = 10; // Position the camera

// Renderer
export const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.shadowMap.enabled = false;
renderer.setSize(width, height);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor( 0xffffff, 0);
container.appendChild(renderer.domElement);
let model;
let composer;

// Animation loop
function animate()
{
    //iconFollowPoint();
    UpdatePanZoom();

    renderer.render(scene, camera);
    if(composer) composer.render();
    //requestAnimationFrame(iconFollowPoint);
    //model.rotation.y += 0.01;
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
    requestAnimationFrame(iconFollowPoint);
}

window.addEventListener('resize', onResize);

// 3d mesh
//===========================================

const loader = new GLTFLoader();
loader.load( './world_map/Brian_WithBorders.glb', function ( gltf )
{
    model = gltf.scene ;

    model.traverse((child) =>
    {
        if (child.isMesh) {
          child.castShadow = false;
          child.receiveShadow = false;
        }
    });

    scene.add(model );
    Outline(model);
    AddBorderLines(model);

}, undefined, function ( error ) {

	console.error( error );
} );




//const light = new THREE.AmbientLight(new THREE.Color().setRGB( 1, 1, 1 ),4);
//scene.add( light );

// outline
//===========================================


function Outline(model)
{
    // Initialize EffectComposer
    composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    // Initialize OutlinePass
    const outlinePass = new OutlinePass(new THREE.Vector2(window.innerWidth, window.innerHeight), scene, camera);
    outlinePass.selectedObjects = [model];
    outlinePass.edgeStrength = 2.0;
    outlinePass.edgeGlow = 1;
    outlinePass.edgeThickness = 1;
    outlinePass.pulsePeriod = 0;
    outlinePass.renderToScreen = true;
    outlinePass.usePatternTexture = false;
    outlinePass.visibleEdgeColor.set('#ffcc00'); 
    outlinePass.hiddenEdgeColor.set('#ffcc00'); 

    composer.addPass(outlinePass);
    /*
         // UnrealBloomPass setup
         const bloomPass = new UnrealBloomPass(
            new THREE.Vector2(window.innerWidth, window.innerHeight),
            0.5,   // strength
            0.5,   // radius
            0.85   // threshold
        );
        composer.addPass(bloomPass);
    */
    // Initialize FXAA Pass
    const fxaaPass = new ShaderPass(FXAAShader);
    fxaaPass.uniforms['resolution'].value.set(1 / window.innerWidth, 1 / window.innerHeight);
    composer.addPass(fxaaPass);
}



// Bounds
//===========================================

const geometry = new THREE.BoxGeometry( 0.3, 0.3, 0.3 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
export const topleft = new THREE.Mesh( geometry, material );
//scene.add( topleft );
topleft.position.set(-4,2.5,0); // (x, y, z)

export const botright = new THREE.Mesh( geometry, material );
//scene.add( botright );
botright.position.set(5,-1.8,0); // (x, y, z)

// pan /zoom bounds
//=====================

export const topleftExtents = new THREE.Mesh( geometry, material );
//scene.add( topleftExtents );
topleftExtents.position.set(-5,6,0); // (x, y, z)

export const botrightExtents = new THREE.Mesh( geometry, material );
//scene.add( botrightExtents );
botrightExtents.position.set(6,-5.5,0); // (x, y, z)
