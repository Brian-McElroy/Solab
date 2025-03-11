function GetData()
{
    $.get(
        ServerUrl + "/GetArtistData",
        {},
        function(data) {
            document.getElementById("debugtxt").innerHTML = JSON.stringify(data);
        }
    );
}

GetData();