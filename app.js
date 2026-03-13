// ===============================
// MARATHON TRACKER GG - APP.JS
// ===============================

// SUPABASE CONNECTION

const SUPABASE_URL = "https://kplcjgvajraauhrxbwuy.supabase.co"

const SUPABASE_KEY =
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtwbGNqZ3ZhanJhYXVocnhid3V5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM0MDc0MTYsImV4cCI6MjA4ODk4MzQxNn0.gWq-46gGGCUc3iDZR0Jrq8turs2izTX5UkyhmWfYfOk"



// ===============================
// SEARCH PLAYER
// ===============================

function searchPlayer(){

const input = document.getElementById("playerName")

if(!input) return

const name = input.value.trim()

if(name==="") return

saveRecentRunner(name)

window.location = "/runner/" + encodeURIComponent(name)

}



// ===============================
// RECENTLY SEARCHED RUNNERS
// ===============================

function saveRecentRunner(name){

let list = JSON.parse(localStorage.getItem("recentRunners")) || []

list = list.filter(r => r !== name)

list.unshift(name)

list = list.slice(0,10)

localStorage.setItem("recentRunners",JSON.stringify(list))

}



function loadRecentRunners(){

const container = document.getElementById("recentRunners")

if(!container) return

const list = JSON.parse(localStorage.getItem("recentRunners")) || []

container.innerHTML = ""

list.forEach(name => {

const el = document.createElement("div")

el.className = "runnerCard"

el.innerHTML = `
<a href="/runner/${name}">${name}</a>
`

container.appendChild(el)

})

}



// ===============================
// LOAD PLAYER PAGE
// ===============================

async function loadPlayerPage(){

if(!window.location.pathname.includes("/runner/")) return

const name = decodeURIComponent(
window.location.pathname.split("/runner/")[1]
)

document.getElementById("runnerName").innerText = name

loadRunnerStats(name)

}



// ===============================
// LOAD STATS FROM DATABASE
// ===============================

async function loadRunnerStats(name){

const res = await fetch(

`${SUPABASE_URL}/rest/v1/runners?name=eq.${name}`,

{
headers:{
apikey:SUPABASE_KEY
}
})

const data = await res.json()

if(data.length === 0){

generateFakeStats(name)

return

}

const runner = data[0]

document.getElementById("kills").innerText = runner.kills
document.getElementById("extractions").innerText = runner.extractions
document.getElementById("matches").innerText = runner.matches
document.getElementById("weapon").innerText = runner.top_weapon
document.getElementById("map").innerText = runner.favorite_map

}



// ===============================
// FAKE STATS (TEMP UNTIL API)
// ===============================

function generateFakeStats(name){

const maps = [
"Perimeter",
"Dire Marsh",
"Outpost"
]

const weapons = [
"AR-47",
"VX SMG",
"Helix Rifle",
"Reaper Shotgun"
]

document.getElementById("kills").innerText =
Math.floor(Math.random()*500)

document.getElementById("extractions").innerText =
Math.floor(Math.random()*100)

document.getElementById("matches").innerText =
Math.floor(Math.random()*200)

document.getElementById("weapon").innerText =
weapons[Math.floor(Math.random()*weapons.length)]

document.getElementById("map").innerText =
maps[Math.floor(Math.random()*maps.length)]

}



// ===============================
// TRENDING RUNNERS
// ===============================

async function loadTrending(){

const container = document.getElementById("trendingRunners")

if(!container) return

const res = await fetch(

`${SUPABASE_URL}/rest/v1/runners?select=name,kills&order=kills.desc&limit=10`,

{
headers:{
apikey:SUPABASE_KEY
}
})

const data = await res.json()

container.innerHTML=""

data.forEach(player=>{

const el = document.createElement("div")

el.className="runnerCard"

el.innerHTML = `
<a href="/runner/${player.name}">
${player.name} - ${player.kills} kills
</a>
`

container.appendChild(el)

})

}



// ===============================
// SIGNUP
// ===============================

async function signup(){

const email =
document.getElementById("email").value

const password =
document.getElementById("password").value

await fetch(
`${SUPABASE_URL}/auth/v1/signup`,
{
method:"POST",
headers:{
"Content-Type":"application/json",
apikey:SUPABASE_KEY
},
body:JSON.stringify({
email:email,
password:password
})
})

alert("Account created!")

}



// ===============================
// LOGIN
// ===============================

async function login(){

const email =
document.getElementById("email").value

const password =
document.getElementById("password").value

const res = await fetch(

`${SUPABASE_URL}/auth/v1/token?grant_type=password`,

{
method:"POST",
headers:{
"Content-Type":"application/json",
apikey:SUPABASE_KEY
},
body:JSON.stringify({
email:email,
password:password
})
})

const data = await res.json()

localStorage.setItem("token",data.access_token)

alert("Logged in!")

}



// ===============================
// SAVE PROFILE
// ===============================

async function saveProfile(){

const username =
document.getElementById("username").value

const bio =
document.getElementById("bio").value

await fetch(

`${SUPABASE_URL}/rest/v1/profiles`,

{
method:"POST",
headers:{
"Content-Type":"application/json",
apikey:SUPABASE_KEY,
Authorization:
"Bearer "+localStorage.getItem("token")
},
body:JSON.stringify({
username:username,
bio:bio
})
})

alert("Profile saved!")

}



// ===============================
// PAGE TRANSITIONS
// ===============================

document.addEventListener("DOMContentLoaded",()=>{

document.body.classList.add("fadeIn")

loadRecentRunners()

loadTrending()

loadPlayerPage()

})