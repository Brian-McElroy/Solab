
let myid;

function RetrieveID()
{
    myid = localStorage.getItem(MyIDKey);
    if(myid != null) return;

    const params = new URLSearchParams(window.location.search);
    myid = params.get(MyIDKey);

    codeok = CheckCode(myid);

    if(codeok) localStorage.setItem(MyIDKey, myid);    
}


RetrieveID();
alert(myid);