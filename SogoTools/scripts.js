
const url = "http://localhost:7005/"
//const url = "https://solab-access-438f80e69184.herokuapp.com/"

function ResetData()
{
    $.get(
        url + "Thing",
        {sdfisoiosdj:"kajshdka99879879KJBKJH(__)(*):L<:MON(&*G*^G&^323423werfdsfsdfsefsew3"},
        function(data) {
           alert(data);
        }
    );
}

function RandomizeLocations()
{
    $.get(
        url + "ThingTwo",
        {sdofgjsodifjso:"kajshdka99879879KJBKJH(__)(*):L<:MON(&*G*^G&^323423werfdsfsdfsefsew334534536"},
        function(data) {
           alert(data);
        }
    );
}

function SetData()
{
    let query = {
        weprweoriwpe: "23-4028-3_*&(*&)(^*(^*&^nfoiwfowioin.ewfpiwjefpowijeOIJOIUIUSHDIUSHDIHA",
        data: JSON.parse(document.getElementById("DataInputField").value)
    };

    $.ajax({
        url: url + "ThingThree",
        type: "POST",
        contentType: "application/json",  // Set JSON content type
        data: JSON.stringify(query),  // Convert object to JSON string
        success: function(data) {
            alert(data);
        },
        error: function(xhr) {
            alert("Error: " + xhr.responseText);
        }
    });
}


document.getElementById("ResetData").onclick = ResetData;
document.getElementById("RandomizeLocations").onclick = RandomizeLocations;
document.getElementById("SetData").onclick = SetData;

