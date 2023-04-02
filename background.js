// console = chrome.extension.getBackgroundPage().console;



chrome.runtime.onInstalled.addListener(() => {


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
chrome.contextMenus.onClicked.addListener(async function (info, tab) {
  console.log(info)

  if (info.menuItemId == "nested context menu1") {

    chrome.tabs.captureVisibleTab(null, { "format": "png" }, function (dataUrl) {
      // Save the screenshot to the browser's local storage
      chrome.storage.local.set({ "screenshot": dataUrl }, function () {
        // Open a new tab to display the screenshot
        chrome.tabs.create({ "url": "screenshot.html" });
      });
    });

  }

  if (info.menuItemId == "nested context menu2") {

    await chrome.tabs.query({ 'active': true, 'lastFocusedWindow': true, 'currentWindow': true }, async function (tabs) {
      // Get current tab to focus on it after start recording on recording screen tab
      const currentTab = tabs[0];

      // Create recording screen tab
      const tab = await chrome.tabs.create({
        url: chrome.runtime.getURL('recording_screen.html'),
        pinned: true,
        active: true,
      });

      // Wait for recording screen tab to be loaded and send message to it with the currentTab
      chrome.tabs.onUpdated.addListener(async function listener(tabId, info) {
        if (tabId === tab.id && info.status === 'complete') {
          console.log("tabid----->"+ tabId )
          chrome.tabs.onUpdated.removeListener(listener);

          await chrome.tabs.sendMessage(tabId, {
            name: 'startRecordingOnBackground',
            body: {
              currentTab: currentTab,
            },
          });
        }
      });
    });

  }



})


