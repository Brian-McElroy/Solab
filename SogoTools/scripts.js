
const url = "http://localhost:7005/"
//const url = "https://solab-access-438f80e69184.herokuapp.com/Thing"

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


document.getElementById("ResetData").onclick = ResetData;
document.getElementById("RandomizeLocations").onclick = RandomizeLocations;

