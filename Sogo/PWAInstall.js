

const installApp = document.getElementById('installApp');
const installAppButton = document.getElementById('installAppButton');
const dontinstallAppButton = document.getElementById('dontinstallAppButton');

let dontinstall =false;

let deferredPrompt;
    window.addEventListener('beforeinstallprompt', (e) =>
    {
        deferredPrompt = e;
        ShowHideDOMThingWithFadeout(installApp,true);
    });


dontinstallAppButton.onclick = ()=>
{
    if(dontinstall) return;

    dontinstall = true;
    ShowHideDOMThingWithFadeout(installApp,false);
} 

installAppButton.addEventListener('click', async () => 
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
});