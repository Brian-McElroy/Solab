const ServerUrl = "http://localhost:7005";
//const ServerUrl = "https://solab-access-438f80e69184.herokuapp.com";
const SiteUrl ="http://127.0.0.1:5500/Sogo/"
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
  if(invitecode.length != 32) return false;
  return true;
}