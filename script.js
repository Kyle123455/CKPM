// Personalised for Carlos Kei Primicias Muyot's first birthday.
// Event time is Philippines local time (Asia/Manila, UTC+8).
const EVENT_DATE = "2026-12-13T12:00:00+08:00";
const MAPS_URL = "https://www.google.com/maps/search/?api=1&query=Sierra+Hotel+Dumaguete";
const REGISTRY_URL = ""; // Add your real gift registry link here.

const $ = id => document.getElementById(id);
const eventTime = new Date(EVENT_DATE).getTime();

function updateCountdown(){
  let diff=Math.max(0,eventTime-Date.now());
  const values={
    days:Math.floor(diff/86400000),
    hours:Math.floor((diff%86400000)/3600000),
    minutes:Math.floor((diff%3600000)/60000),
    seconds:Math.floor((diff%60000)/1000)
  };
  Object.entries(values).forEach(([id,val])=>$(id).textContent=String(val).padStart(id==="days"?3:2,"0"));
}
updateCountdown();setInterval(updateCountdown,1000);
$("mapLink").href=MAPS_URL;
$("openInvite").addEventListener("click",()=>$("invitation").scrollIntoView({behavior:"smooth"}));
$("menuToggle").addEventListener("click",()=>{$("menu").classList.toggle("open")});
document.querySelectorAll("#menu a").forEach(a=>a.addEventListener("click",()=>$("menu").classList.remove("open")));

const audio=$("music");
$("playMusic").addEventListener("click",async()=>{
  try{await audio.play();$("musicStatus").textContent="Now playing";}
  catch{$("musicStatus").textContent="Add your chosen music file to assets/music.mp3";}
});
$("stopMusic").addEventListener("click",()=>{audio.pause();audio.currentTime=0;$("musicStatus").textContent="Music stopped";});
audio.addEventListener("timeupdate",()=>{$("audioProgress").style.width=(audio.duration?audio.currentTime/audio.duration*100:0)+"%";});

$("registryLink").addEventListener("click",e=>{
  if(!REGISTRY_URL){e.preventDefault();alert("Add your gift registry URL in script.js before publishing.");}
  else $("registryLink").href=REGISTRY_URL;
});

$("rsvpForm").addEventListener("submit",e=>{
  e.preventDefault();
  const data=new FormData(e.currentTarget);
  const summary=[
    "RSVP — Carlos Kei Primicias Muyot's First Birthday",
    "Name: "+data.get("name"),
    "Attendance: "+data.get("attendance"),
    "Guests: "+data.get("guests"),
    "Message: "+(data.get("message")||"—")
  ].join("\n");
  $("formMessage").textContent="This demo has prepared your RSVP as a text file. It has not sent your response to the family.";
  const blob=new Blob([summary],{type:"text/plain"}),url=URL.createObjectURL(blob),a=document.createElement("a");
  a.href=url;a.download="carlos-kei-rsvp.txt";a.click();URL.revokeObjectURL(url);
});
