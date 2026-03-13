// Replace with your actual Bungie API key
const BUNGIE_API_KEY = "YOUR_BUNGIE_API_KEY"; // <-- put your real key here

async function searchPlayer() {
    const username = document.getElementById("playerName").value.trim();
    const display = document.getElementById("statsDisplay");
    
    if (!username) {
        display.innerHTML = "Please enter a runner name.";
        glowError(display);
        return;
    }

    try {
        // Example Marathon API endpoint
        const response = await fetch(
            `https://www.bungie.net/Platform/Marathon/Player/${encodeURIComponent(username)}/Stats/`,
            {
                headers: {
                    "X-API-Key": BUNGIE_API_KEY
                }
            }
        );

        if (!response.ok) {
            throw new Error("Player not found");
        }

        const data = await response.json();
        console.log(data);

        // Display stats in the box with green glow
        display.innerHTML = `
          <strong>Runner:</strong> ${username}<br>
          <pre>${JSON.stringify(data, null, 2)}</pre>
        `;
        glowSuccess(display);

        // Store in localStorage for "recent runners"
        let recent = JSON.parse(localStorage.getItem("recentRunners") || "[]");
        if(!recent.includes(username)){
            recent.unshift(username);
            if(recent.length > 10) recent.pop(); // keep last 10
            localStorage.setItem("recentRunners", JSON.stringify(recent));
        }

    } catch (err) {
        console.error(err);
        display.innerHTML = err.message;
        glowError(display);
    }
}

// Glow green for success
function glowSuccess(el){
    el.style.boxShadow = "0 0 25px #00ff9c";
    setTimeout(()=> {
        el.style.boxShadow = "0 0 15px rgba(0,255,156,0.4)";
    }, 1000);
}

// Glow red for error
function glowError(el){
    el.style.boxShadow = "0 0 25px #ff0033";
    setTimeout(()=> {
        el.style.boxShadow = "0 0 15px rgba(0,255,156,0.4)";
    }, 1000);
}
