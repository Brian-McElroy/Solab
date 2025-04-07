const staticSogo = "sogo-site-v1"
const assets = [
  "/analytics.js",
  "/ArtistDirectLink.js",
  "/Artist_Get_Invite_Code.html",
  "/Artist_Get_Login_Code.html",
  "/Artist_Order_Friends.html",
  "/Artist_Set_Genres.html",
  "/Artist_Set_Location.html",
  "/Artist_Set_Track.html",
  "/BandcampTutorial.html",
  "/bandcampTutorial.js",
  "/constants.js",
  "/DragAndDrop.js",
  "/favicon.ico",
  "/FriendRequestNotifier.js",
  "/getgenres.js",
  "/GetInviteCode.js",
  "/GetLoginCode.js",
  "/HamburgerMenu.js",
  "/Images/BGPattern.svg",
  "/Images/hamburger-menu.svg",
  "/Images/icons/icon-128x128.png",
  "/Images/icons/icon-144x144.png",
  "/Images/icons/icon-152x152.png",
  "/Images/icons/icon-192x192.png",
  "/Images/icons/icon-384x384.png",
  "/Images/icons/icon-512x512.png",
  "/Images/icons/icon-72x72.png",
  "/Images/icons/icon-96x96.png",
  "/Images/link.svg",
  "/Images/tutorial/0.png",
  "/Images/tutorial/1.png",
  "/Images/tutorial/2.png",
  "/Images/tutorial/3.png",
  "/Images/tutorial/4.png",
  "/Images/user.jpg",
  "/index.html",
  "/jquery-3.7.1.min.js",
  "/LinesMan.js",
  "/ListAllAssetsBuildScript.js",
  "/manifest.json",
  "/map.js",
  "/MarkerColliderHandler.js",
  "/MarkersMan.js",
  "/MusicPlayerMan.js",
  "/MyThreeMan.js",
  "/NativeShare.js",
  "/panzoom.js",
  "/PWAInstall.js",
  "/ReOrderFriends.js",
  "/RequestFriend.js",
  "/setlocation.js",
  "/SetTrack.js",
  "/setupPWA.js",
  "/style.css",
  "/Welcome.html",
  "/welcome.js",
  "/world_map/Brian_edited.glb",
  "/world_map/license.txt",
  "/world_map/scene.bin",
  "/world_map/scene.gltf"
]

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(staticSogo).then(cache => {
      cache.addAll(assets)
    })
  )
})

self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
      caches.match(fetchEvent.request).then(res => {
        return res || fetch(fetchEvent.request)
      })
    )
  })
