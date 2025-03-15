


function RetrieveID(key)
{
    MyThing= localStorage.getItem(key);
    if(MyThing != null) return;

    const params = new URLSearchParams(window.location.search);
    MyThing = params.get(key);

    if(MyThing == null) return;
    //codeok = CheckCode(MyID);

    localStorage.setItem(key, MyThing);  
}


RetrieveID(MyIDKey);
RetrieveID(MyInviteKey);
RetrieveID(MyNameKey);