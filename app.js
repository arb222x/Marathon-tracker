/* -------------------------
SUPABASE CONNECTION
------------------------- */

const SUPABASE_URL = "https://kplcjgvajraauhrxbwuy.supabase.co"

const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtwbGNqZ3ZhanJhYXVocnhid3V5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM0MDc0MTYsImV4cCI6MjA4ODk4MzQxNn0.gWq-46gGGCUc3iDZR0qjurs2izTX5UkyhmWfYfYfOk"

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY)



/* -------------------------
PLAYER SEARCH
------------------------- */

function searchPlayer(){

const player = document.getElementById("playerName").value

if(!player) return

saveRecentRunner(player)

window.location.href = "/player.html?name=" + player

}



/* -------------------------
SAVE RECENT SEARCHES
------------------------- */

function saveRecentRunner(player){

let recent = JSON.parse(localStorage.getItem("recentRunners")) || []

recent = recent.filter(p => p !== player)

recent.unshift(player)

recent = recent.slice(0,10)

localStorage.setItem("recentRunners", JSON.stringify(recent))

}



/* -------------------------
LOAD RECENT RUNNERS PAGE
------------------------- */

function loadRecentRunners(){

const list = document.getElementById("recentList")

if(!list) return

const runners = JSON.parse(localStorage.getItem("recentRunners")) || []

if(runners.length === 0){

list.innerHTML = "<div class='empty'>No runners searched yet</div>"

return

}

list.innerHTML = ""

runners.forEach(name => {

const div = document.createElement("div")

div.className = "runner"

div.innerText = name

div.onclick = () => {

window.location.href = "/player.html?name=" + name

}

list.appendChild(div)

})

}



/* -------------------------
LOAD PLAYER STATS
------------------------- */

async function loadPlayer(){

const params = new URLSearchParams(window.location.search)

const player = params.get("name")

if(!player) return

const nameBox = document.getElementById("playerNameDisplay")

if(nameBox) nameBox.innerText = player



const { data, error } = await client

.from("players")

.select("*")

.eq("name", player)

.single()



if(error){

console.log(error)

return

}



/* PLAYER STATS */

if(document.getElementById("kills"))
document.getElementById("kills").innerText = data.kills || 0

if(document.getElementById("deaths"))
document.getElementById("deaths").innerText = data.deaths || 0

if(document.getElementById("matches"))
document.getElementById("matches").innerText = data.matches || 0

if(document.getElementById("extractions"))
document.getElementById("extractions").innerText = data.extractions || 0

if(document.getElementById("kd"))
document.getElementById("kd").innerText = data.kd || "0.0"

}



/* -------------------------
LOAD LEADERBOARD
------------------------- */

async function loadLeaderboard(){

const board = document.getElementById("leaderboard")

if(!board) return

const { data } = await client

.from("players")

.select("*")

.order("kills",{ascending:false})

.limit(10)



board.innerHTML = ""



data.forEach(player => {

const row = document.createElement("div")

row.className = "leaderRow"

row.innerHTML = `

<span>${player.name}</span>
<span>${player.kills} Kills</span>

`

row.onclick = () => {

window.location.href = "/player.html?name=" + player.name

}

board.appendChild(row)

})

}



/* -------------------------
MOST POPULAR WEAPONS
------------------------- */

async function loadWeaponStats(){

const container = document.getElementById("weaponStats")

if(!container) return

const { data } = await client

.from("weapons")

.select("*")

.order("kills",{ascending:false})

.limit(5)



container.innerHTML = ""



data.forEach(w => {

const row = document.createElement("div")

row.className = "weaponRow"

row.innerHTML = `

<span>${w.weapon}</span>
<span>${w.kills} kills</span>

`

container.appendChild(row)

})

}



/* -------------------------
EXTRACTION STATS
------------------------- */

async function loadExtractionStats(){

const container = document.getElementById("extractionStats")

if(!container) return

const { data } = await client

.from("players")

.select("*")

.order("extractions",{ascending:false})

.limit(5)



container.innerHTML = ""



data.forEach(p => {

const row = document.createElement("div")

row.className = "extractRow"

row.innerHTML = `

<span>${p.name}</span>
<span>${p.extractions} extractions</span>

`

container.appendChild(row)

})

}



/* -------------------------
AUTO LOAD FEATURES
------------------------- */

document.addEventListener("DOMContentLoaded", () => {

loadRecentRunners()

loadPlayer()

loadLeaderboard()

loadWeaponStats()

loadExtractionStats()

})
