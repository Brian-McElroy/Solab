const ServerUrl = "http://localhost:7005";
//const ServerUrl = "https://solab-access-438f80e69184.herokuapp.com";
const SiteUrl ="http://127.0.0.1:5500/Sogo/"
const OverrideMobileOnly = true;


const inviteCodeKey ="invite"
const nameKey ="name"
const TrackUrlKey ="trackurl"
const LocationKey ="location"
const MyNameKey ="myname"
const MyIDKey ="MyID"
const MyInviteKey ="MyInvite"
const MyGenresKey ="mygenres"

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