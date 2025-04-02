(function() {
    var script = document.createElement("script");
    script.src = "https://cdn.eu.amplitude.com/script/e77f99d08df62ab55d4364ee09974e8c.js";
    document.head.appendChild(script);

    script.onload = function()
    {
        console.log("loaded amplitude");
        window.amplitude.add(window.sessionReplay.plugin({ sampleRate: 1 }));
        window.amplitude.init("e77f99d08df62ab55d4364ee09974e8c", {
            serverZone: "EU",
            fetchRemoteConfig: true,
            autocapture: true
        });
        console.log("amplitude setup");
    };
})();



		