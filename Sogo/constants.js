//const ServerUrl = "http://localhost:7005";
const ServerUrl = "https://solab-access-438f80e69184.herokuapp.com";
let SiteUrl;
const OverrideMobileOnly = true;


const inviteCodeKey ="invite"
const nameKey ="name"
const TrackUrlKey ="trackurl"
const LocationKey ="location"
const MyNameKey ="myname"
const MyIDKey ="MyID"
const MyInviteKey ="MyInvite"
const MyGenresKey ="mygenres"
const MyFriendsKey ="MyFriendsKey"
const ArtistKey ="artist"
const NewUserKey ="NewUserKey"

const TopFriendsNum =5;

function CheckCode(invitecode)
{
  if(invitecode == null) return false;
  if(invitecode.length < 8) return false;
  return true;
}

function inverseLerp(startValue, endValue, currentValue)
{
  return startValue === endValue ? 0 : (currentValue - startValue) / (endValue - startValue);
}

function MylerpUnclamped(start, end, t)
{
  return start + (end - start) * t;
}

function GetSiteUrl()
{
  SiteUrl = getBaseURL(window.location.href);
}

function getBaseURL(url)
{
  return url.replace(/\/[^\/]*$/, '/');
}

function ShowHideDOMThing(thing, show, fadeout)
{
  if(!show)
  {
    thing.style.opacity = 0;
    thing.style.visibility = "hidden";
  }
  else
  {
    thing.style.opacity = 1;
    thing.style.visibility = "visible";
  }
}

function ShowHideDOMThingWithFadeout(thing, show)
{
  if (thing._hideTimer) {
    clearTimeout(thing._hideTimer);
    thing._hideTimer = null;
  }
  if (!show) {
    thing.style.opacity = 0;

    thing._hideTimer = setTimeout(() => {
      thing.style.visibility = "hidden";
      thing._hideTimer = null;
    }, 300); 
  } else {
    thing.style.visibility = "visible";
    thing.style.opacity = 1;
  }
}

GetSiteUrl();