chrome.runtime.onMessage.addListener((request) => {
  if (request.type === "popup-modal") {
    showModal();
  }
});
const showModal = () => {
  const modal = document.createElement("dialog");
  modal.setAttribute(
    "style",
    `
    height:350px;width :450px;overflow:hidden;chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
          console.log(sender.tab ?
                      "from a content script:" + sender.tab.url :
                      "from the extension");
          if (request.greeting === "hello")
            sendResponse({farewell: "goodbye"});
        }
      );
    border: none;
    top:90px;
    border-radius:20px;
    background-color:white;
    position: fixed; box-shadow: 0px 12px 48px rgba(29, 5, 64, 0.32);
    `
  );
  modal.innerHTML = `<iframe id="popup-content"; style="height:100%; width:450px; overflow:hidden"></iframe>
    <div style="position:absolute; top:0px; left:5px;">
    <button style="padding: 8px 12px; font-size: 16px; border: none; border-radius: 20px;">x</button>
    </div>`;
  document.body.appendChild(modal);
  const dialog = document.querySelector("dialog");
  dialog.showModal();
  const iframe = document.getElementById("popup-content");
  iframe.src = chrome.extension.getURL("index.html");
  iframe.frameBorder = 0;
  dialog.querySelector("button").addEventListener("click", () => {
    dialog.close();
    dialog.parentNode.removeChild(dialog);
  });
};
