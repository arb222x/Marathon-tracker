const SUPABASE_URL="https://kplcjgvajraauhrxbwuy.supabase.co"

const SUPABASE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtwbGNqZ3ZhanJhYXVocnhid3V5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM0MDc0MTYsImV4cCI6MjA4ODk4MzQxNn0.gWq-46gGGCUc3iDZR0Jrq8turs2izTX5UkyhmWfYfOk"

const client=supabase.createClient(SUPABASE_URL,SUPABASE_KEY)

/* LOGIN */

async function login(){

const email=document.getElementById("email").value
const password=document.getElementById("password").value

const {error}=await client.auth.signInWithPassword({

email:email,
password:password

})

if(error){

alert(error.message)

}else{

window.location.href="/"

}

}

/* SIGNUP */

async function signup(){

const email=document.getElementById("email").value
const password=document.getElementById("password").value

const {error}=await client.auth.signUp({

email:email,
password:password

})

if(error){

alert(error.message)

}else{

window.location.href="/"

}

}

/* NAV */

async function updateNav(){

const {data:{session}}=await client.auth.getSession()

if(session){

document.getElementById("loginBtn").style.display="none"
document.getElementById("signupBtn").style.display="none"

}else{

document.getElementById("profileBtn").style.display="none"

}

}

/* LOGOUT */

async function logout(){

await client.auth.signOut()

window.location.href="/"

}

/* SAVE PROFILE */

async function saveProfile(){

const {data:{user}}=await client.auth.getUser()

const username=document.getElementById("username").value
const bio=document.getElementById("bio").value
const favorite=document.getElementById("favorite").value
const bungie=document.getElementById("bungie").value

await client.from("profiles").upsert({

id:user.id,
username:username,
bio:bio,
favorite_runner:favorite,
bungie_id:bungie

})

alert("Profile saved")

}

/* LOAD PROFILE */

async function loadProfile(){

const {data:{user}}=await client.auth.getUser()

const {data}=await client
.from("profiles")
.select("*")
.eq("id",user.id)
.single()

if(!data) return

document.getElementById("username").value=data.username||""
document.getElementById("bio").value=data.bio||""
document.getElementById("favorite").value=data.favorite_runner||""
document.getElementById("bungie").value=data.bungie_id||""

}

/* PROFILE SEARCH */

async function searchProfiles(){

const name=document.getElementById("profileSearch").value

const {data}=await client
.from("profiles")
.select("username")
.ilike("username","%"+name+"%")

const results=document.getElementById("results")

results.innerHTML=""

data.forEach(p=>{

const div=document.createElement("div")

div.className="profile"

div.innerText=p.username

results.appendChild(div)

})

}
