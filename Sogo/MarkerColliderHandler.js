
import { markersData} from "./MarkersMan.js";
import { DOMmarkers} from "./MarkersMan.js";
import { LerpPos} from "./MarkersMan.js";
import { worldToPixelSpace} from "./MarkersMan.js";

const markerDiameter = 0.055;

let priorityList =[];

export function ColliderStart()
{
    for (let index = 0; index < markersData.Artists.length; index++)
    {
        let data ={};
        data.index = index;
        data.visible =true;
        if(markersData.Artists[index].featured) data.priority = 150;
        else data.priority = Math.random()*100;
        priorityList.push(data);
    }
}

export function ColliderArtistSelected(artindex)
{
    for (const element of DOMmarkers)
    {
        let show = false;
        //if(element.artistIndex == artindex) show = true;
        if(markersData.Artists[artindex].friends.includes(element.artistIndex)) show = true;
        GetItemWithThisIndex(element.artistIndex).visible = show;
    }
    DecideWhichToShow();

    console.log(GetItemWithThisIndex(artindex).position);
}

export function ColliderArtistDeSelected()
{
    for (const element of priorityList) element.visible =true;
    DecideWhichToShow();
}

//-------

export function DecideWhichToShow()
{
    SetPositions();
    CheckOutOfView();
    priorityList.sort((a, b) => b.priority - a.priority);

    for (let i = 0; i < priorityList.length; i++)
    {
        if(!priorityList[i].visible) continue;
        
        for (let j = 0; j < priorityList.length; j++)
        {
            if(i == j) continue;
            if(!priorityList[j].visible) continue;
            
            if(overlaps(priorityList[i],priorityList[j]))
            {
                priorityList[j].visible = false;
            }        
        }
        
    }

    //LerpPos(markersData.Artists[i].location)
    SetDOMOnOff();
}

//===========================================================

function overlaps(top, bot)
{

    return false;
}

function CheckOutOfView()
{
    // TODO!!!!!!!!!!
}

function SetPositions()
{
    for (const element of priorityList)
    {
        element.position =  worldToPixelSpace(LerpPos(markersData.Artists[element.index].location));
    }
}

function SetDOMOnOff()
{
    for (const element of priorityList)
    {
        DOMmarkers[element.index].style.display = element.visible ? "block" : "none";
    }
}

function GetItemWithThisIndex(index)
{
    for (const element of priorityList)
    {
        if(element.index == index) return element;
    }
}