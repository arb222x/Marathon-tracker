// Supabase connection
const SUPABASE_URL = "https://kplcjgvajraauhrxbwuy.supabase.co"

const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtwbGNqZ3ZhanJhYXVocnhid3V5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM0MDc0MTYsImV4cCI6MjA4ODk4MzQxNn0.gWq-46gGGCUc3iDZR0Jrq8turs2izTX5UkyhmWfYfOk"


// SEARCH PLAYER

function searchPlayer(){

let name=document.getElementById("playerName").value

if(!name) return

window.location="player.html?name="+name

}


// SAVE PLAYER

async function savePlayer(name,kills,deaths,kd,extracts){

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

}


// LOAD PLAYER PROFILE

async function loadPlayer(){

const params=new URLSearchParams(window.location.search)

const name=params.get("name")

if(!name) return

document.getElementById("playerTitle").innerText=name


let kills=Math.floor(Math.random()*200)

let deaths=Math.floor(Math.random()*100)+1

let kd=(kills/deaths).toFixed(2)

let extracts=Math.floor(Math.random()*40)


document.getElementById("kills").innerText=kills

document.getElementById("deaths").innerText=deaths

document.getElementById("kd").innerText=kd

document.getElementById("extract").innerText=extracts


savePlayer(name,kills,deaths,kd,extracts)


loadMatches()

loadWeapons()

loadExtraction()

}


// MATCH HISTORY

function loadMatches(){

let table=document.getElementById("matchTable")

if(!table) return


for(let i=1;i<=5;i++){

let row=document.createElement("tr")

let kills=Math.floor(Math.random()*10)

let result=Math.random()>0.5?"Extracted":"Eliminated"

row.innerHTML=

"<td>Match "+i+"</td><td>"+kills+" kills</td><td>"+result+"</td>"

table.appendChild(row)

}

}


// WEAPON STATS

function loadWeapons(){

let table=document.getElementById("weaponTable")

if(!table) return


let weapons=["SMG","Shotgun","Sniper Rifle","Pulse Rifle"]


weapons.forEach(w=>{

let row=document.createElement("tr")

let kills=Math.floor(Math.random()*100)

row.innerHTML="<td>"+w+"</td><td>"+kills+"</td>"

table.appendChild(row)

})

}


// EXTRACTION STATS

function loadExtraction(){

let table=document.getElementById("extractTable")

if(!table) return


let maps=["Perimeter","Dire Marsh","Outpost"]


maps.forEach(map=>{

let row=document.createElement("tr")

let ex=Math.floor(Math.random()*20)

row.innerHTML="<td>"+map+"</td><td>"+ex+"</td>"

table.appendChild(row)

})

}


// RECENT RUNNERS FROM DATABASE

async function loadRecentRunners(){

const res=await fetch(

SUPABASE_URL+"/rest/v1/players?select=*&order=id.desc&limit=8",

{

headers:{
apikey:SUPABASE_KEY,
Authorization:"Bearer "+SUPABASE_KEY
}

}

)

const players=await res.json()

const grid=document.getElementById("recentRunners")

if(!grid) return


players.forEach(p=>{

let card=document.createElement("div")

card.className="runnerCard"

card.onclick=function(){

window.location="player.html?name="+p.name

}

card.innerHTML=`

<div class="runnerName">${p.name}</div>

<p>KD ${p.kd}</p>

`

grid.appendChild(card)

})

}


// RUN FUNCTIONS

loadPlayer()

loadRecentRunners()