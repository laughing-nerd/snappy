let ssInterval = null
const interval = 5000
const cloudName = "" // Change this to your Cloudinary cloud name
const uploadPreset = "" // Change this to your Cloudinary upload preset

function takeSS() {
  chrome.tabs.captureVisibleTab(null, { format: "png" }, function(screenshotUrl) {
    const currentTime = Date.now()

    const fd = new FormData()
    fd.append('file', screenshotUrl)
    fd.append('upload_preset', uploadPreset)
    fd.append('public_id', `ss-${currentTime}`)

    // Post to Cloudinary
    // I am not handling response and error
    fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: 'post',
      body: fd,
    })
  });
}

function start() {
  if (!ssInterval) {
    ssInterval = setInterval(takeSS, interval)
  }
}

function stop() {
  if (ssInterval) {
    clearInterval(ssInterval)
    ssInterval = null
  }
}


chrome.runtime.onMessage.addListener(function(message) {
  if (message.action === "start") {
    start()
  } else if (message.action === "stop") {
    stop()
  }
});
