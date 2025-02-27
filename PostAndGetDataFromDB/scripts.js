


function GetDataPressed()
{
    $.get(
        "https://solab-access-438f80e69184.herokuapp.com/test",
        //"http://localhost:7005/test",
        {},
        function(data) {
           alert('page content: ' + data);
        }
    );
}

function SendDataPressed()
{
    $.get(
        "https://solab-access-438f80e69184.herokuapp.com/insertData",
        //"http://localhost:7005/insertData",
        JSON.parse(document.getElementById('DBInputField').value),
        function(data){
           alert(data);
        }
    );
}

function getArtistIDParam()
{
    const params = new URLSearchParams(window.location.search);
    let artistid = params.get("artistId");
    alert(artistid);
}

getArtistIDParam();


document.getElementById("GetDBDataButton").onclick = GetDataPressed;
document.getElementById("SetDBDataButton").onclick = SendDataPressed;
