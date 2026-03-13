const SUPABASE_URL="https://kplcjgvajraauhrxbwuy.supabase.co"

const SUPABASE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtwbGNqZ3ZhanJhYXVocnhid3V5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM0MDc0MTYsImV4cCI6MjA4ODk4MzQxNn0.gWq-46gGGCUc3iDZR0Jrq8turs2izTX5UkyhmWfYfOk"



function searchPlayer(){

const name=document.getElementById("playerName").value

if(!name) return

window.location="/runner/"+encodeURIComponent(name)

}



async function signup(){

const email=document.getElementById("email").value
const password=document.getElementById("password").value

await fetch(

SUPABASE_URL+"/auth/v1/signup",

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

alert("Account created")

}



async function login(){

const email=document.getElementById("email").value
const password=document.getElementById("password").value

const res=await fetch(

SUPABASE_URL+"/auth/v1/token?grant_type=password",

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

const data=await res.json()

localStorage.setItem("token",data.access_token)

window.location="/"

}



function logout(){

localStorage.removeItem("token")

location.reload()

}



function updateAuthUI(){

const nav=document.getElementById("navAuth")

if(!nav) return

const token=localStorage.getItem("token")

if(token){

nav.innerHTML=`

<a href="/profile.html">My Profile</a>
<a href="#" onclick="logout()">Logout</a>

`

}

}



async function saveProfile(){

const username=document.getElementById("username").value
const bio=document.getElementById("bio").value
const favorite=document.getElementById("favorite_runner").value

await fetch(

SUPABASE_URL+"/rest/v1/profiles",

{

method:"POST",

headers:{
"Content-Type":"application/json",
apikey:SUPABASE_KEY,
Authorization:"Bearer "+localStorage.getItem("token")
},

body:JSON.stringify({
username:username,
bio:bio,
favorite_runner:favorite
})

})

alert("Profile saved")

}



document.addEventListener("DOMContentLoaded",()=>{

updateAuthUI()

})