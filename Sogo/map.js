


function RetrieveID(key, decodeurl = false)
{
    MyThing= localStorage.getItem(key);
    if(MyThing != null) return;

    const params = new URLSearchParams(window.location.search);
    MyThing = params.get(key);

    if(MyThing == null) return;
    //codeok = CheckCode(MyID);

    if(decodeurl) MyThing = decodeURI(MyThing);

    localStorage.setItem(key, MyThing);  
}


RetrieveID(MyIDKey);
RetrieveID(MyInviteKey);
RetrieveID(MyNameKey,true);

localStorage.setItem(NewUserKey,"false");