

const installApp = document.getElementById('installApp');
const installAppButton = document.getElementById('installAppButton');
const dontinstallAppButton = document.getElementById('dontinstallAppButton');
const iOSModal = document.getElementById('iOSInstallModal');

let dontinstall =false;

let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) =>
{
    deferredPrompt = e;
    ShowHideDOMThingWithFadeout(installApp,true);
    installAppButton.addEventListener('click',AndroidInstall);
});


dontinstallAppButton.onclick = ()=>
{
    if(dontinstall) return;

    dontinstall = true;
    ShowHideDOMThingWithFadeout(installApp,false);
} 

async function AndroidInstall()
{
    if(dontinstall) return;
    
    if (deferredPrompt !== null) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
            deferredPrompt = null;
            dontinstall = true;
            ShowHideDOMThingWithFadeout(installApp,false);
        }
    }
}

// iOS
//---------------

function shouldShowInstallModal()
{
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIOS = /iphone|ipad|ipod/.test(userAgent);
    const isInStandaloneMode = ('standalone' in window.navigator) && window.navigator.standalone;
  
    return isIOS && !isInStandaloneMode;
}


if(shouldShowInstallModal())
{
    ShowHideDOMThingWithFadeout(installApp,true);
    installAppButton.addEventListener('click',iOSInstall);
}

function iOSInstall()
{
    ShowHideDOMThingWithFadeout(iOSModal,true);
}

document.getElementById("dismissiOSModal").onclick =()=>{ShowHideDOMThingWithFadeout(iOSModal,false);};