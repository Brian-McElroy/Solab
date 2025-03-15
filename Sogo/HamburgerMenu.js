
let menuVisible =false;

let menudiv = document.getElementById("HamburgerMenu");

function ToggleMenu()
{
    menuVisible = !menuVisible;
    menudiv.style.display = menuVisible ? "block" : "none";
}

function GotoGetInvite()
{
    window.location = "Artist_Get_Invite_Code.html"
}

function GotoGetLogin()
{
    window.location = "Artist_Get_Login_Code.html"
}

function GotoReorderFriends()
{
    window.location = "Artist_Order_Friends.html"
}

let hambutton = document.getElementById("HamburgerButton");

console.log("fuck!! "+localStorage.getItem(MyIDKey));

if(localStorage.getItem(MyIDKey) != null) 
{
    console.log("not null somehow!!");

    hambutton.style.display = "block";
    hambutton.onclick = ToggleMenu;
    document.getElementById("GotoGetLink").onclick = GotoGetInvite;
    document.getElementById("GotogetMyId").onclick = GotoGetLogin;
    document.getElementById("GotoReorderFriends").onclick = GotoReorderFriends;
}




