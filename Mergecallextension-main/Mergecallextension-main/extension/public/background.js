chrome.browserAction.onClicked.addListener(function (tab) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.storage.sync.get(["data"], function (res) {
      if (res.data) {
        console.log("here getting data", res.data);
        chrome.tabs.sendMessage(tabs[0].id, { type: "popup-modal" });
      }
    });
  });
});
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  chrome.browserAction.setBadgeText({
    text: "", //an empty string displays nothing!
  });
  chrome.storage.sync.clear(function () {
    console.log("clear chrome storage");
  });
  if (changeInfo.status == "complete") {
    console.log("update", tab);
    let url = tab.url;
    if (url.includes("https://www.zillow.com") && url.includes("_zpid")) {
      setTimeout(() => {
        chrome.tabs.executeScript(tab.id, {
          code: 'var s = document.documentElement.outerHTML; chrome.runtime.sendMessage({action: "getSource", source: s});',
        });
      }, 3000);
    } else {
      chrome.browserAction.setBadgeText({
        text: "", //an empty string displays nothing!
      });
    }
  }
});

chrome.tabs.onActivated.addListener(function (activeInfo) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    console.log("onActivated");
    chrome.browserAction.setBadgeText({
      text: "", //an empty string displays nothing!
    });
    chrome.storage.sync.clear(function () {
      console.log("clear chrome storage");
    });
    console.log("from activate", tabs[0]);
    let url = tabs[0].url;
    if (url.includes("https://www.zillow.com") && url.includes("_zpid")) {
      console.log("here after if block for activate");
      chrome.tabs.executeScript(tabs[0].id, {
        code: 'var s = document.documentElement.outerHTML; chrome.runtime.sendMessage({action: "getSource", source: s});',
      });
    } else {
      console.log("else block of activated");
      chrome.browserAction.setBadgeText({
        text: "", //an empty string displays nothing!
      });
    }
  });
});

chrome.runtime.onMessage.addListener(function (request, sender) {
  if (request.action == "getSource") {
    const html = request.source;
    console.log("html is -->>", html);
    fetch("https://fe77-2405-201-6804-211e-5db7-a4c1-ab73-fb75.in.ngrok.io/data", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ html }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        chrome.storage.sync.set({ data: data }, function () {
          chrome.browserAction.setBadgeText({ text: "1" });
        });
      });
  }
});
