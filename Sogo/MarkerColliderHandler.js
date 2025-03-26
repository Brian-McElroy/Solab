
import { markersData} from "./MarkersMan.js";
import { DOMmarkers} from "./MarkersMan.js";
import { LerpPos} from "./MarkersMan.js";
import { worldToPixelSpace} from "./MarkersMan.js";
import { container } from "./MyThreeMan.js";

let markerDiameter;
let priorityList =[];

export function ColliderStart()
{
    GetMarkerDiameter();

    let myname = localStorage.getItem(MyNameKey);

    for (let index = 0; index < markersData.Artists.length; index++)
    {
        let data ={};
        data.index = index;
        data.selected =true;
        data.inview =true;
        data.unobscured =true;
        if(markersData.Artists[index].featured) data.priority = 150;
        else data.priority = Math.random()*100;

        if(myname!= null && markersData.Artists[index].name == myname) data.priority = 200;

        priorityList.push(data);
    }
}

export function ColliderArtistSelected(artindex)
{
    for (const element of priorityList) element.selected =false;
    let count =0;
    for (const friend of markersData.Artists[artindex].friends)
    {
        GetItemWithThisIndex(friend).selected = true;
        count++;
        if(count >= TopFriendsNum) break;
    }

    DecideWhichToShow();
    //console.log(GetItemWithThisIndex(artindex).position);
}

export function ColliderArtistDeSelected()
{
    for (const element of priorityList) element.selected =true;
    DecideWhichToShow();
}

//---

export function DecideWhichToShow()
{ 
    for (const element of priorityList) element.unobscured = true;

    SetPositions();
    CheckOutOfView();
    priorityList.sort((a, b) => b.priority - a.priority);

    for (let i = 0; i < priorityList.length-1; i++)
    {
        if(! CheckVisible(priorityList[i])) continue;
        
        for (let j = i+1; j < priorityList.length; j++)
        {
            if(i == j) continue;
            if(!CheckVisible(priorityList[j])) continue;
            
            if(overlaps(priorityList[i],priorityList[j]))
            {
                priorityList[j].unobscured = false;
            }        
        }
        
    }
    SetDOMOnOff();
}

//===========================================================

function CheckVisible(icon)
{
    if(!icon.inview) return false;
    if(!icon.selected) return false;
    if(!icon.unobscured) return false;

    return true;
}

function overlaps(top, bot)
{
    return CheckBoxIntersects(BoxFromPoint(top),BoxFromPoint(bot))
}

function CheckOutOfView()
{
    let screen = {top:0,bot:container.clientHeight,left:0,right:container.clientWidth};
    for (const el of priorityList)
    {
        let icon = BoxFromPoint(el);
        el.inview = CheckBoxIntersects(screen,icon);
    }
}

function BoxFromPoint(p)
{
    let rad = markerDiameter /2;
    return {top:p.position.y-rad,bot:p.position.y+rad,left:p.position.x-rad,right:p.position.x+rad};
}

function CheckBoxIntersects(box1, box2)
{
    if(box2.bot < box1.top) return false;
    if(box2.top > box1.bot) return false;
    if(box2.right < box1.left) return false;
    if(box2.left > box1.right) return false;
    return true;
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
        DOMmarkers[element.index].style.display = CheckVisible(element) ? "block" : "none";
    }
}

function GetItemWithThisIndex(index)
{
    for (const element of priorityList)
    {
        if(element.index == index) return element;
    }
}

function GetMarkerDiameter()
{   
    markerDiameter = document.getElementById("ArtistMarker").clientHeight;
    //console.log(document.getElementById("ArtistMarker").clientHeight);  
}

window.addEventListener('resize', GetMarkerDiameter);