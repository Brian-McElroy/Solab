

const installApp = document.getElementById('installApp');

let deferredPrompt;
    window.addEventListener('beforeinstallprompt', (e) =>
    {
        deferredPrompt = e;
        ShowHideDOMThingWithFadeout(installApp,true);
    });


installApp.addEventListener('click', async () => 
{
    console.log("Button works!!!"); 
    
    if (deferredPrompt !== null) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
            deferredPrompt = null;
            ShowHideDOMThingWithFadeout(installApp,false);
        }
    }
});