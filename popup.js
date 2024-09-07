document.addEventListener("DOMContentLoaded", function() {
  const button = document.querySelector("#toggle")

  chrome.storage.local.get(['takingSS'], function(result) {
    if (result.takingSS) {
      button.textContent = "Stop"
    } else {
      button.textContent = "Start"
    }
  });

  button.addEventListener("click", function() {
    chrome.storage.local.get(['takingSS'], function(result) {
      if (result.takingSS) {
        chrome.storage.local.set({ takingSS: false }, function() {
          button.textContent = "Start"
          chrome.runtime.sendMessage({ action: "stop" })
        });
      } else {
        chrome.storage.local.set({ takingSS: true }, function() {
          button.textContent = "Stop"
          chrome.runtime.sendMessage({ action: "start" })
        });
      }
    });
  });

});
