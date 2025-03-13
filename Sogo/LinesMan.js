import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { Line2 } from 'three/addons/lines/Line2.js';
import { LineMaterial } from 'three/addons/lines/LineMaterial.js';
import { LineGeometry } from 'three/addons/lines/LineGeometry.js';



import { scene} from "./MyThreeMan.js";


// Define line points
const LTpositions = [ 0, 0, 0,  10, 10, 10 ]; // [x1, y1, z1, x2, y2, z2]

// Create Line Geometry
const LTgeometry = new LineGeometry();
LTgeometry.setPositions(LTpositions);

// Create Line Material (important: set resolution for linewidth to work)
const LTmaterial = new LineMaterial({
  color: 0xff0000,
  linewidth: 5, // Line thickness in pixels
  resolution: new THREE.Vector2(window.innerWidth, window.innerHeight), // Required
});

// Create Line2 object and add to scene
const line = new Line2(LTgeometry, LTmaterial);
line.computeLineDistances(); // Required for dashed lines (even if not using dashes)
scene.add(line);

