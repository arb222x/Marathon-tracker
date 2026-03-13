const SUPABASE_URL = "https://kplcjgvajraauhrxbwuy.supabase.co"

const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtwbGNqZ3ZhanJhYXVocnhid3V5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM0MDc0MTYsImV4cCI6MjA4ODk4MzQxNn0.gWq-46gGGCUc3iDZR0Jrq8turs2izTX5UkyhmWfYfOk"



/* =========================
SEARCH PLAYER
========================= */

function searchPlayer(){

const input=document.getElementById("playerName")

if(!input) return

const name=input.value.trim()

if(name==="") return

window.location="player.html?name="+encodeURIComponent(name)

}



/* =========================
SAVE PLAYER TO DATABASE
========================= */

async function savePlayer(name,kills,deaths,kd,extracts){

try{

await fetch(SUPABASE_URL+"/rest/v1/players",{

method:"POST",

headers:{
"Content-Type":"application/json",
apikey:SUPABASE_KEY,
Authorization:"Bearer "+SUPABASE_KEY
},

body:JSON.stringify({
name:name,
kills:kills,
deaths:deaths,
kd:kd,
extractions:extracts
})

})

}catch(err){

console.log("Save player error",err)

}

}



/* =========================
SAVE MATCH HISTORY
========================= */

async function saveMatch(player,kills,deaths,kd){

try{

await fetch(SUPABASE_URL+"/rest/v1/matches",{

method:"POST",

headers:{
"Content-Type":"application/json",
apikey:SUPABASE_KEY,
Authorization:"Bearer "+SUPABASE_KEY
},

body:JSON.stringify({
player:player,
kills:kills,
deaths:deaths,
kd:kd
})

})

}catch(err){

console.log("Save match error",err)

}

}



/* =========================
LOAD PLAYER PROFILE
========================= */

async function loadPlayer(){

const params=new URLSearchParams(window.location.search)

const name=params.get("name")

if(!name) return

const title=document.getElementById("playerTitle")

if(title) title.innerText=name



/* TEMPORARY FAKE DATA
Replace later with Marathon API */

let kills=Math.floor(Math.random()*200)

let deaths=Math.floor(Math.random()*100)+1

let kd=(kills/deaths).toFixed(2)

let extracts=Math.floor(Math.random()*40)



const k=document.getElementById("kills")
const d=document.getElementById("deaths")
const kdEl=document.getElementById("kd")
const ex=document.getElementById("extract")

if(k) k.innerText=kills
if(d) d.innerText=deaths
if(kdEl) kdEl.innerText=kd
if(ex) ex.innerText=extracts



savePlayer(name,kills,deaths,kd,extracts)

saveMatch(name,kills,deaths,kd)



loadMatches()

loadWeaponsTable()

loadExtraction()

loadKDGraph(name)

}



/* =========================
MATCH HISTORY TABLE
========================= */

function loadMatches(){

const table=document.getElementById("matchTable")

if(!table) return

for(let i=1;i<=5;i++){

let row=document.createElement("tr")

let kills=Math.floor(Math.random()*10)

let result=Math.random()>0.5?"Extracted":"Eliminated"

row.innerHTML=`
<td>Match ${i}</td>
<td>${kills}</td>
<td>${result}</td>
`

table.appendChild(row)

}

}



/* =========================
WEAPON TABLE (PLAYER PAGE)
========================= */

function loadWeaponsTable(){

const table=document.getElementById("weaponTable")

if(!table) return

const weapons=[
"SMG",
"Shotgun",
"Sniper Rifle",
"Pulse Rifle",
"Auto Rifle"
]

weapons.forEach(w=>{

let row=document.createElement("tr")

let kills=Math.floor(Math.random()*100)

row.innerHTML=`
<td>${w}</td>
<td>${kills}</td>
`

table.appendChild(row)

})

}



/* =========================
EXTRACTION STATS
========================= */

function loadExtraction(){

const table=document.getElementById("extractTable")

if(!table) return

const maps=[
"Perimeter",
"Dire Marsh",
"Outpost"
]

maps.forEach(map=>{

let row=document.createElement("tr")

let ex=Math.floor(Math.random()*20)

row.innerHTML=`
<td>${map}</td>
<td>${ex}</td>
`

table.appendChild(row)

})

}



/* =========================
KD HISTORY GRAPH
========================= */

async function loadKDGraph(player){

const chart=document.getElementById("kdChart")

if(!chart) return

try{

const res=await fetch(
SUPABASE_URL+"/rest/v1/matches?player=eq."+player+"&order=id.asc",
{
headers:{
apikey:SUPABASE_KEY,
Authorization:"Bearer "+SUPABASE_KEY
}
}
)

const matches=await res.json()

let labels=[]
let kdData=[]

matches.forEach(m=>{

labels.push("Match "+m.id)

kdData.push(m.kd)

})

const ctx=chart.getContext("2d")

new Chart(ctx,{
type:"line",
data:{
labels:labels,
datasets:[{
label:"KD History",
data:kdData,
borderColor:"#00ff9c",
backgroundColor:"rgba(0,255,156,0.1)",
tension:.4
}]
},
options:{
plugins:{
legend:{display:false}
},
scales:{
y:{
beginAtZero:true
}
}
}
})

}catch(err){

console.log("Graph error",err)

}

}



/* =========================
LEADERBOARD
========================= */

async function loadLeaderboard(){

const table=document.getElementById("leaderboard")

if(!table) return

try{

const res=await fetch(
SUPABASE_URL+"/rest/v1/players?select=*&order=kd.desc&limit=20",
{
headers:{
apikey:SUPABASE_KEY,
Authorization:"Bearer "+SUPABASE_KEY
}
}
)

const players=await res.json()

players.forEach((p,i)=>{

let row=document.createElement("tr")

row.innerHTML=`
<td>${i+1}</td>
<td>${p.name}</td>
<td>${p.kd}</td>
<td>${p.kills}</td>
`

table.appendChild(row)

})

}catch(err){

console.log("Leaderboard error",err)

}

}



/* =========================
WEAPON META PAGE
========================= */

function loadWeapons(){

const list=document.getElementById("weaponList")

if(!list) return

const weapons=[
"SMG",
"Shotgun",
"Sniper Rifle",
"Pulse Rifle",
"Auto Rifle",
"Marksman Rifle"
]

weapons.forEach(w=>{

let div=document.createElement("div")

div.className="weapon"

let kills=Math.floor(Math.random()*500)

div.innerHTML=`
<div class="weaponName">${w}</div>
Kills: ${kills}
`

list.appendChild(div)

})

}



/* =========================
RECENT SEARCHES
========================= */

async function loadRecentList(){

const list=document.getElementById("recentList")

if(!list) return

try{

const res=await fetch(
SUPABASE_URL+"/rest/v1/players?select=*&order=id.desc&limit=20",
{
headers:{
apikey:SUPABASE_KEY,
Authorization:"Bearer "+SUPABASE_KEY
}
}
)

const players=await res.json()

players.forEach(p=>{

let div=document.createElement("div")

div.className="runner"

div.innerText=p.name+" | KD "+p.kd

div.onclick=function(){

window.location="player.html?name="+p.name

}

list.appendChild(div)

})

}catch(err){

console.log("Recent players error",err)

}

}



/* =========================
PAGE TRANSITIONS
========================= */

document.querySelectorAll("a").forEach(link=>{

link.addEventListener("click",function(e){

const url=this.getAttribute("href")

if(!url || url.startsWith("#") || url.startsWith("http")) return

e.preventDefault()

document.body.style.opacity="0"

setTimeout(()=>{

window.location=url

},300)

})

})



/* =========================
AUTO LOAD
========================= */

loadPlayer()

loadLeaderboard()

loadWeapons()

loadRecentList()