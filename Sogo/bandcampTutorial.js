
let okButton = document.getElementById("OkButton");
let forwardButton = document.getElementById("tuteforward");
let backButton = document.getElementById("tuteback");
let image = document.getElementById("tutorialImage");
let text = document.getElementById("tutorialText");

let currentSlide =0;

let helpstrings = 
[
    "1. If you're on mobile, navigate to the bottom of the page and press \"Desktop View\"",
    "2. Press \"Share / Embed\"",
    "3. Press \"Embed this album\" or \"Embed this track\"",
    "4. Press any of these...",
    "5. Copy this code.",
]

function NextSlide()
{
    currentSlide++;
    if(currentSlide > helpstrings.length-1) currentSlide = helpstrings.length-1;
    ShowSlide();
}

function PreviousSlide()
{
    currentSlide--;
    if(currentSlide < 0) currentSlide = 0;
    ShowSlide();
}

function ShowSlide()
{
    text.innerHTML = helpstrings[currentSlide];
    image.src = "./images/tutorial/"+currentSlide+".png"
}

backButton.onclick = PreviousSlide;
forwardButton.onclick = NextSlide;
okButton.onclick = ()=>{window.location = "Artist_Set_Track.html"};
ShowSlide();