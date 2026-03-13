 function searchPlayer(){

let name=document.getElementById("playerName").value

window.location="player.html?name="+name

}

function loadPlayer(){

const params=new URLSearchParams(window.location.search)

const name=params.get("name")

if(!name) return

playerTitle.innerText=name

let kills=Math.floor(Math.random()*200)
let deaths=Math.floor(Math.random()*100)+1
let kd=(kills/deaths).toFixed(2)
let extracts=Math.floor(Math.random()*40)

document.getElementById("kills").innerText=kills
document.getElementById("deaths").innerText=deaths
document.getElementById("kd").innerText=kd
document.getElementById("extract").innerText=extracts

loadMatches()
loadWeapons()
loadExtraction()

}

function loadMatches(){

for(let i=1;i<=5;i++){

let row=document.createElement("tr")

let kills=Math.floor(Math.random()*10)
let result=Math.random()>0.5?"Extracted":"Eliminated"

row.innerHTML="<td>Match "+i+"</td><td>"+kills+" kills</td><td>"+result+"</td>"

matchTable.appendChild(row)

}

}

function loadWeapons(){

let weapons=["SMG","Shotgun","Sniper","Rifle"]

weapons.forEach(w=>{

let row=document.createElement("tr")
let kills=Math.floor(Math.random()*100)

row.innerHTML="<td>"+w+"</td><td>"+kills+" kills</td>"

weaponTable.appendChild(row)

})

}

function loadExtraction(){

let maps=["Perimeter","Colony","Frontier"]

maps.forEach(map=>{

let row=document.createElement("tr")

let ex=Math.floor(Math.random()*20)

row.innerHTML="<td>"+map+"</td><td>"+ex+"</td>"

extractTable.appendChild(row)

})

}

loadPlayer()