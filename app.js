const SUPABASE_URL = "https://kplcjgvajraauhrxbwuy.supabase.co"
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY)

/* LOGIN */

async function login(){

const email=document.getElementById("email").value
const password=document.getElementById("password").value

const {data,error}=await client.auth.signInWithPassword({

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

const {data,error}=await client.auth.signUp({

email:email,
password:password

})

if(error){

alert(error.message)

}else{

alert("Account created!")

window.location.href="/"

}

}

/* CHECK USER SESSION */

async function updateNav(){

const {data:{session}} = await client.auth.getSession()

const loginBtn=document.getElementById("loginBtn")
const signupBtn=document.getElementById("signupBtn")
const profileBtn=document.getElementById("profileBtn")

if(session){

loginBtn.style.display="none"
signupBtn.style.display="none"
profileBtn.style.display="inline-block"

}else{

profileBtn.style.display="none"

}

}

updateNav()

/* LOGOUT */

async function logout(){

await client.auth.signOut()

location.reload()

}

/* SAVE PROFILE */

async function saveProfile(){

const {data:{user}} = await client.auth.getUser()

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

alert("Profile saved!")

}

/* LOAD PROFILE */

async function loadProfile(){

const {data:{user}} = await client.auth.getUser()

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
