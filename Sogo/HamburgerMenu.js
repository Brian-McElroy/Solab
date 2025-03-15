
let menuVisible =false;

let menudiv = document.getElementById("HamburgerMenu");
let hambutton = document.getElementById("HamburgerButton");

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

if(localStorage.getItem(MyIDKey) != null) 
{
    hambutton.style.display = "block";
    hambutton.onclick = ToggleMenu;
    document.getElementById("GotoGetLink").onclick = GotoGetInvite;
    document.getElementById("GotogetMyId").onclick = GotoGetLogin;
    document.getElementById("GotoReorderFriends").onclick = GotoReorderFriends;
}

document.addEventListener('click', function(event) {
if (menuVisible && !menudiv.contains(event.target) && !hambutton.contains(event.target))
{
    ToggleMenu();
}
});