

function addMetaTag(name, content) {
    const meta = document.createElement("meta");
    meta.name = name;
    meta.content = content;
    document.head.appendChild(meta);
}

function addLinkTag(rel, href) {
    const link = document.createElement("link");
    link.rel = rel;
    link.href = href;
    document.head.appendChild(link);
}

// Add manifest
addLinkTag("manifest", "manifest.json");

// Add Apple Touch Icons
const iconSizes = [72, 96, 128, 144, 152, 192, 384, 512];
iconSizes.forEach(size => {
    addLinkTag("apple-touch-icon", `images/icons/icon-${size}x${size}.png`);
});

// Add theme colors
addMetaTag("apple-mobile-web-app-status-bar", "#000000");
addMetaTag("theme-color", "#db4938");


if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
        navigator.serviceWorker
        .register("./serviceWorker.js")
        .then(res => console.log("service worker registered"))
        .catch(err => console.log("service worker not registered", err))
    })
    }






