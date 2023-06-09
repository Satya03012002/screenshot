


window.addEventListener("mouseup", function() {

 
  var selectedText = window.getSelection().toString();
  console.log(selectedText)

});


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(request.message);
});

// window.addEventListener("click", function(event) {});

chrome.runtime.onMessage.addListener((request) => {
    if (request.name !== 'endedRecording') {
      return;
    }
    // Create a new video element and show it in an overlay div (a lot of styles just for fun)
    const video = document.createElement('video');
    video.src = request.body.base64;
    video.controls = true;
    video.autoplay = true;
    video.style.width = '100%';
    video.style.height = '100%';
    video.style.maxWidth = '600px';
    video.style.maxHeight = '600px';
  
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backdropFilter = 'blur(5px)';
    overlay.style.zIndex = 999999
  
    overlay.appendChild(video);
  
    document.body.appendChild(overlay);
  });


  // for youtube add
  // setInterval(()=>{
  //   let skipButton = document.getElementsByClassName("ypt-ad-skip-button");

  //   if(skipButton != undefined && skipButton.length > 0){
  //     console.log("add is detected");
  //     skipButton[0].click();
  //   }
  // }, 3000)


  chrome.storage.local.get(["key"]).then((result) => {
    console.log("Value currently is " + result.key);
  });
