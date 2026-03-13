const SUPABASE_URL="https://kplcjgvajraauhrxbwuy.supabase.co"
const SUPABASE_KEY="YOUR_SUPABASE_ANON_KEY"


function searchPlayer(){

let name=document.getElementById("playerName").value

if(!name) return

window.location="player.html?name="+name

}


// SAVE PLAYER

async function savePlayer(name,kills,deaths,kd){

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
kd:kd
})

})

}


// PLAYER PROFILE

async function loadPlayer(){

const params=new URLSearchParams(window.location.search)

const name=params.get("name")

if(!name) return

document.getElementById("playerTitle").innerText=name

let kills=Math.floor(Math.random()*200)
let deaths=Math.floor(Math.random()*100)+1
let kd=(kills/deaths).toFixed(2)

document.getElementById("kills").innerText=kills
document.getElementById("deaths").innerText=deaths
document.getElementById("kd").innerText=kd

savePlayer(name,kills,deaths,kd)

}


// LEADERBOARD

async function loadLeaderboard(){

const res=await fetch(
SUPABASE_URL+"/rest/v1/players?select=*&order=kd.desc&limit=20",
{
headers:{
apikey:SUPABASE_KEY,
Authorization:"Bearer "+SUPABASE_KEY
}
})

const players=await res.json()

const table=document.getElementById("leaderboard")

if(!table) return

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

}


// WEAPON STATS

function loadWeapons(){

const list=document.getElementById("weaponList")

if(!list) return

const weapons=[
"SMG",
"Shotgun",
"Sniper Rifle",
"Pulse Rifle"
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


loadPlayer()
loadLeaderboard()
loadWeapons()