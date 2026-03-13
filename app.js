/* SUPABASE CONNECTION */

const SUPABASE_URL = "https://kplcjgvajraauhrxbwuy.supabase.co"

const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtwbGNqZ3ZhanJhYXVocnhid3V5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM0MDc0MTYsImV4cCI6MjA4ODk4MzQxNn0.gWq-46gGGCUc3iDZR0Jrq8turs2izTX5UkyhmWfYfOk"

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY)



/* SEARCH PLAYER */

function searchPlayer(){

const player=document.getElementById("playerName").value

if(!player) return

saveRecentRunner(player)

window.location.href="/player.html?name="+player

}



/* SAVE RECENT RUNNERS */

function saveRecentRunner(player){

let recent=JSON.parse(localStorage.getItem("recentRunners"))||[]

recent=recent.filter(p=>p!==player)

recent.unshift(player)

recent=recent.slice(0,10)

localStorage.setItem("recentRunners",JSON.stringify(recent))

}



/* LOAD RECENT RUNNERS */

function loadRecentRunners(){

const list=document.getElementById("recentList")

if(!list) return

const runners=JSON.parse(localStorage.getItem("recentRunners"))||[]

if(runners.length===0){

list.innerHTML="<div class='empty'>No recent searches</div>"

return

}

list.innerHTML=""

runners.forEach(name=>{

const div=document.createElement("div")

div.className="runner"

div.innerText=name

div.onclick=()=>{

window.location.href="/player.html?name="+name

}

list.appendChild(div)

})

}



/* SIGNUP */

async function signup(){

const email=document.getElementById("email").value
const password=document.getElementById("password").value

if(!email||!password){

alert("Enter email and password")

return

}

const {data,error}=await client.auth.signUp({

email:email,
password:password

})

if(error){

alert(error.message)

}else{

alert("Account created! Check your email.")

window.location.href="/login.html"

}

}



/* LOGIN */

async function login(){

const email=document.getElementById("email").value
const password=document.getElementById("password").value

if(!email||!password){

alert("Enter email and password")

return

}

const {data,error}=await client.auth.signInWithPassword({

email:email,
password:password

})

if(error){

alert(error.message)

}else{

alert("Login successful!")

window.location.href="/"

}

}



/* AUTO LOAD */

document.addEventListener("DOMContentLoaded",()=>{

loadRecentRunners()

})
