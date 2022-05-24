


window.addEventListener("load", initialize, false);

var scanInterval = 1000;



function fetchAnchorss() {
    var anchors = document.querySelectorAll("[href^='callto:']")
    if(anchors.length)
    {
        for(let i = 0; i < anchors.length; i++)
        {
            replace(anchors[i])
        }
    }
  
    

}
function replace(anchors)
{
    var btn1 = document.createElement("button");
    btn1.setAttribute("class", "data" );
    btn1.textContent = 'Message via Mergecall';
    btn1.style.backgroundColor = "white"
    btn1.style.color = "#3376A4"
    btn1.style.marginLeft = "2px"
    btn1.style.border = "none"
    btn1.style.cursor = "pointer"
    var btn2 = document.createElement("button");
    btn2.setAttribute("class", "dial" );
    btn2.textContent = "Call via Mergecall"
    btn2.style.backgroundColor = "white"
    btn2.style.marginLeft = "2px"
    btn2.style.color = "#3376A4"
    btn2.style.border = "none"
    btn2.style.cursor = "pointer"
    btn1.addEventListener("click", function(){
        chrome.runtime.sendMessage({greeting: "bye"}, function(response) {
            let phone = anchors.getAttribute("href");
            if(phone)
            {   
                console.log("why why")
                let newph = phone.replace("callto:","")
                chrome.storage.sync.set({"phone": newph, message: true, call: false}, function() {
                    console.log('Settings saved');
                  });
            }
          });
    })
    btn2.addEventListener("click", function(){
        chrome.runtime.sendMessage({greeting: "bye"}, function(response) {
            let phone = anchors.getAttribute("href");
            if(phone)
            {   let newph = phone.replace("callto:","")
                chrome.storage.sync.set({"phone": newph, message: false, call: true}, function() {
                    console.log('Settings phone');
                  });
            }
          });
    })
    anchors.after(btn1)
    anchors.after(btn2)
    
    anchors.parentNode.removeChild(anchors);
    
}
function initialize() {
    var jsInitChecktimer = setTimeout(function () {
        
        fetchAnchorss()
    }, scanInterval);

    
}