
const url = "http://localhost:7005/Thing"
//const url = "https://solab-access-438f80e69184.herokuapp.com/Thing"

function ResetData()
{
    $.get(
        url,
        {sdfisoiosdj:"kajshdka99879879KJBKJH(__)(*):L<:MON(&*G*^G&^323423werfdsfsdfsefsew3"},
        function(data) {
           alert(data);
        }
    );
}


document.getElementById("ResetData").onclick = ResetData;

