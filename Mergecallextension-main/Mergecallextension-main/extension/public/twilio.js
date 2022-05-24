const device = new Twilio.Device();

document.getElementById('disconnect').style.display = 'none';
document.getElementById("call").style.display = 'none';
chrome.storage.sync.get(async function (results) {
    try{
        const res = await fetch("https://mergecall.com/api/token",{
        method: "GET",
        headers: {
            "x-auth-token": results.token,
        },
    })
    const token = await res.json()
    const fromnumber = document.getElementById("from")
    fromnumber.innerHTML = "FROM :" +results.from
    const tonumber = document.getElementById("to")
    tonumber.innerHTML = "TO :" +results.phone
    if (token)
    {
        device.setup(token.token)
        device.on('ready', function (device) {
            const data = {
                From: results.from,
                To: results.phone
            }
            device.connect(data)
        });
        device.on("error", function(error){
            console.log("error", error)
        })
        device.on("connect", function(conn){
            const disc = document.getElementById('disconnect')
            disc.addEventListener("click", disconnect)
            disc.style.display = 'block';
        })
        device.on("disconnect", function(conn){
            document.getElementById('disconnect').style.display = 'none';
            const callagain = document.getElementById("call")
            callagain.style.display = 'block';
            callagain.addEventListener("click", callagainfun)
        })
    }
    }
    catch(e)
    {
        console.log(e)
    }
    
});


function disconnect(){
    device.disconnectAll();
    document.getElementById('disconnect').style.display = 'none';
    const callagain = document.getElementById("call")
    callagain.style.display = 'block';
    callagain.addEventListener("click", callagainfun)
}
function callagainfun(){
    chrome.storage.sync.get(async function (results) {
        try{
            const data = {
                From: results.from,
                To: results.phone
            }
            device.connect(data)
            document.getElementById('call').style.display = 'none';
        }
        catch(e)
        {
            console.log(e)
        }
        
    });
}