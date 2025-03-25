
import { markersData} from "./MarkersMan.js";
import { DOMmarkers} from "./MarkersMan.js";
import { LerpPos} from "./MarkersMan.js";
import { worldToDivSpace} from "./MarkersMan.js";


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

export function ColliderArtistSelected(artist)
{
    for (const element of DOMmarkers)
    {
        let show = false;
        //if(element.artistIndex == artindex) show = true;
        if(artist.friends.includes(element.artistIndex)) show = true;

        GetItemWithThisIndex(element.artistIndex).visible = show;
    }
    DecideWhichToShow();
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
    priorityList.sort((a, b) => b.priority - a.priority);

    for (let i = 0; i < priorityList.length; i++)
    {
        if(!priorityList[i].visible) continue;
        

        
    }

    //LerpPos(markersData.Artists[i].location)
    SetDOMOnOff();
}

//===========================================================

function overlaps()
{
    
}

function SetPositions()
{
    for (const element of priorityList)
    {

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