import * as THREE from 'three';

// Select the div with id "map"
const container = document.getElementById('map');

// Set up scene, camera, and renderer
const scene = new THREE.Scene();
//scene.background = new THREE.Color( 0xff0000 );
const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setClearColor( 0xffffff, 0);
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

// Create a cube
const geometry = new THREE.BoxGeometry(3, 3, 3);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

//create a blue LineBasicMaterial
const linematerial = new THREE.LineBasicMaterial( { color: 0x0000ff } );
const points = [];
points.push( new THREE.Vector3( - 10, 0, 0 ) );
points.push( new THREE.Vector3( 0, 10, 0 ) );
points.push( new THREE.Vector3( 10, 0, 0 ) );
const linegeometry = new THREE.BufferGeometry().setFromPoints( points );
const line = new THREE.Line( linegeometry, linematerial );
scene.add( line );

// Position the camera
camera.position.z = 10;

// Animation loop
function animate() {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);

// Handle window resizing
window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
});





