// console = chrome.extension.getBackgroundPage().console;

console.log("satya")

chrome.runtime.onInstalled.addListener(() => {
  console.log("hello")

  //receiving a message
  chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
      console.log(sender.tab ?
        "from a content script:" + sender.tab.url :
        "from the extension");
      if (request.greeting === "hello")
        sendResponse({ farewell: "goodbye" });
    }
  );

  //create context menu
  chrome.contextMenus.create({
    id: "parent",
    title: "Search for: \"%s\" ",
    contexts: ["all"]

  })

  chrome.contextMenus.create({
    id: "nested context menu1",
    title: "ScreenShot",
    parentId: "parent",
    contexts: ["all"]


  });

  chrome.contextMenus.create({
    id: "nested context menu2",
    title: "ScreenRecording",
    parentId: "parent",
    contexts: ["all"]

  });


});



//listener for context menu
chrome.contextMenus.onClicked.addListener(async function(info, tab) {
  console.log(info)

  if (info.menuItemId == "nested context menu1") {
    console.log("satya")


    chrome.tabs.captureVisibleTab(null, {"format": "png"}, function(dataUrl) {
      // Save the screenshot to the browser's local storage
      chrome.storage.local.set({"screenshot": dataUrl}, function() {
        // Open a new tab to display the screenshot
        chrome.tabs.create({"url": "screenshot.html"});
      });
    });
    


  

  }
  // baseURL = "http://en.wikipedia.org/wiki/";
  // var newURL = baseURL + info.selectionText;
  // //create the new URL in the user's browser
  // chrome.tabs.create({ url: newURL });
  console.log("satya")

  // if (info.menuItemId === "parent") {
  //       baseURL = "http://en.wikipedia.org/wiki/";
  // var newURL = baseURL + info.selectionText;
  // //create the new URL in the user's browser
  // chrome.tabs.create({ url: newURL });
  //     // Do something when the "myMenuItem" context menu item is clicked
  //     console.log("Menu item clicked in tab " + tab.id);
  //   }
  // console.log("satya")


})


