import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { Line2 } from 'three/addons/lines/Line2.js';
import { LineMaterial } from 'three/addons/lines/LineMaterial.js';
import { LineGeometry } from 'three/addons/lines/LineGeometry.js';

import { scene} from "./MyThreeMan.js";

const LineZ = 1;

export function AddBorderLines(gltfscene)
{
    gltfscene.traverse((child) => 
    {
        if (child.isMesh)
        {
            // Create edges geometry
            const edgesGeometry = new THREE.EdgesGeometry(child.geometry,45);
            const edgesMaterial = new THREE.LineBasicMaterial({ color: 0xaa0000 });
            const edgeLines = new THREE.LineSegments(edgesGeometry, edgesMaterial);

            // Ensure world matrix is up to date
            child.updateWorldMatrix(true, false);

            // Apply the world matrix of the mesh to the edges
            edgeLines.applyMatrix4(child.matrixWorld);

            scene.add(edgeLines);
        }
    });
}








