


function GetAllData()
{
    let key = document.getElementById("AdminKeyField").value;

    $.get(
        url + "GetAllData",
        {key:key}
    )
    .done(function(data) {
        document.getElementById("error").innerHTML =  data;
        document.getElementById("alldata").innerHTML = JSON.stringify(data);
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
        document.getElementById("error").innerHTML =  textStatus +" "+errorThrown;
    })
    .always(function() {
    });
}

function SetAllData()
{
    let key = document.getElementById("AdminKeyField").value;
    let alldata = document.getElementById("datatoset").value;

    if(!data) return;

    $.post(
        url + "SetAllData",
        { 
            key: key, 
            data: alldata
        }
    )
    .done(function(data) {
        document.getElementById("error").innerHTML = data;
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
        document.getElementById("error").innerHTML = textStatus + " " + errorThrown;
    });
}


document.getElementById("GetAllData").onclick = GetAllData;
document.getElementById("SetAllData").onclick = SetAllData;

