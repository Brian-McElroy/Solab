import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { Line2 } from 'three/addons/lines/Line2.js';
import { LineMaterial } from 'three/addons/lines/LineMaterial.js';
import { LineGeometry } from 'three/addons/lines/LineGeometry.js';

import { scene} from "./MyThreeMan.js";
import { markersData} from "./MarkersMan.js";
import { topleft } from "./MyThreeMan.js";
import { botright } from "./MyThreeMan.js";

const LineZ = 1;

const LTmaterial = new LineMaterial({
  color: 0xff0000,
  linewidth: 5, // Line thickness in pixels
  resolution: new THREE.Vector2(window.innerWidth, window.innerHeight), // Required
});

let currentLines =[];

export function ArtistSelected(artist)
{
    ClearLines();

    let count =0;
    for (const element of artist.friends)
    {
      CreateLine(artist.location,markersData.Artists[element].location);
      count++;
      if(count >= TopFriendsNum) break;
    }
}

export function NoOneSelected()
{
  ClearLines();
}

export function UpdateLines()
{

}

//====================

function ClearLines()
{
  for (const element of currentLines)
  {
    scene.remove(element);
  }
  currentLines =[];
}

function LerpX(ratio)
{
  return MylerpUnclamped(topleft.position.x,botright.position.x,ratio)
}

function LerpY(ratio)
{
  return MylerpUnclamped(topleft.position.y,botright.position.y,ratio)
}

function CreateLine(pointA,pointB)
{
  if(!CheckPointOk(pointA)) return;
  if(!CheckPointOk(pointB)) return;

  try 
  {
      // Define line points
    let LTpositions = [ LerpX(pointA[0]), LerpY(pointA[1]), LineZ ,  LerpX(pointB[0]), LerpY(pointB[1]), LineZ  ]; // [x1, y1, z1, x2, y2, z2]

    //let LTpositions = [ -5,6,1,6,-5.5,1  ]; // [x1, y1, z1, x2, y2, z2]

    // Create Line Geometry
    let LTgeometry = new LineGeometry();
    LTgeometry.setPositions(LTpositions);

    // Create Line2 object and add to scene
    let line = new Line2(LTgeometry, LTmaterial);
    line.computeLineDistances(); // Required for dashed lines (even if not using dashes)
    scene.add(line);
    currentLines.push(line);
  }
  catch
  {

  }
}

function CheckPointOk(point)
{
  if(point == undefined) return false;
  if(point == null) return false;
  if(point.length < 2) return false;

  return true;
}

