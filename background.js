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
  chrome.contextMenus.create({
    id: "nested context menu3",
    title: "Add Block",
    parentId: "parent",
    contexts: ["all"]


  });

  chrome.contextMenus.create({
    id: "nested context menu4",
    title: "google auth",
    parentId: "parent",
    contexts: ["all"]


  });



  // chrome.runtime.getURL('rules_1.json',(url)=>{
  //   fetch(url).then(res=>res.json()).
  //   then(json=>{
  //     console.log(json)
  //   }).catch(err=>console.log(err))
  // })
  // fetch(chrome.runtime.getURL('rules_1.json'))
  // .then(response => response.json())
  // .then(data => console.log(data))
  // .catch(error => console.error(error));


  // chrome.storage.local.get(["key"]).then((result) => {
  //   console.log("Value currently is " + result.key);
  // });




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
          console.log("tabid----->" + tabId)
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

  if (info.menuItemId == "nested context menu3") {

    await chrome.tabs.query({ 'active': true, 'lastFocusedWindow': true, 'currentWindow': true }, async function (tabs) {
      // Get current tab to focus on it after start recording on recording screen tab
      const currentTab = tabs[0];


      console.log(info.pageUrl)
      console.log(info.linkUrl)


      var value = info.pageUrl
      chrome.storage.local.set({ key: value }).then(() => {
        console.log("Value is set to " + value);
        // chrome.tabs.create({ "url":info.pageUrl });
      });



      fetch(chrome.runtime.getURL('rules_1.json'))
        .then(response => response.json())
        .then(data => {
          var obj = {
            "id": data.length + 1,
            "priority": 1,
            "action": {
              "type": "block"
            },
            "condition": {
              "urlFilter": info.pageUrl,
              "resourceTypes": ["main_frame"]
            }
          }
          data.push(obj)
          console.log(data)
          //       const jsonData = JSON.stringify(data, null, 2); // convert JS object to JSON string with indentation

          // const blob = new Blob([jsonData], { type: 'application/json' });
          // const url = window.URL.createObjectURL(blob);

          // chrome.downloads.download({ url: url, filename: 'rules_1.json' });
          chrome.downloads.download({ url: 'data:application/json;base64,' + btoa(JSON.stringify(data)), filename: 'rules_1.json' })
        })
        .catch(error => console.error(error));






    })




    console.log('click button')

  }

  if (info.menuItemId == "nested context menu4") {



    const API_KEY = '#############################';
    let user_signed_in = false;

    chrome.identity.onSignInChanged.addListener(function (account_id, signedIn) {
      if (signedIn) {
        user_signed_in = true;
      } else {
        user_signed_in = false;
      }
    });

    chrome.identity.getAuthToken({ interactive: true }, function (token) {
      console.log(token);
    });

    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.message === 'get_auth_token') {
        chrome.identity.getAuthToken({ interactive: true }, function (token) {
          console.log(token);
        });
      } else if (request.message === 'get_profile') {
        chrome.identity.getProfileUserInfo({ accountStatus: 'ANY' }, function (user_info) {
          console.log(user_info);
        });
      } else if (request.message === 'get_contacts') {
        chrome.identity.getAuthToken({ interactive: true }, function (token) {
          let fetch_url = `https://people.googleapis.com/v1/contactGroups/all?maxMembers=20&key=${API_KEY}`;
          let fetch_options = {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }

          fetch(fetch_url, fetch_options)
            .then(res => res.json())
            .then(res => {
              if (res.memberCount) {
                const members = res.memberResourceNames;
                fetch_url = `https://people.googleapis.com/v1/people:batchGet?personFields=names&key=${API_KEY}`;

                members.forEach(member => {
                  fetch_url += `&resourceNames=${encodeURIComponent(member)}`;
                });

                fetch(fetch_url, fetch_options)
                  .then(res => res.json())
                  .then(res => console.log(res));
              }
            });
        });
      } else if (request.message === 'create_contact') {
        chrome.identity.getAuthToken({ interactive: true }, function (token) {
          let fetch_url = `https://people.googleapis.com/v1/people:createContact?key=${API_KEY}`;

          let fetch_options = {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              'names': [
                {
                  "givenName": "Johnny",
                  "familyName": "Silver"
                }
              ]
            })
          }

          fetch(fetch_url, fetch_options)
            .then(res => res.json())
            .then(res => console.log(res));
        });
      } else if (request.message === 'delete_contact') {
        chrome.identity.getAuthToken({ interactive: true }, function (token) {
          let fetch_url = `https://people.googleapis.com/v1/contactGroups/all?maxMembers=20&key=${API_KEY}`;
          let fetch_options = {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }

          fetch(fetch_url, fetch_options)
            .then(res => res.json())
            .then(res => {
              if (res.memberCount) {
                const members = res.memberResourceNames;

                fetch_options.method = 'DELETE';
                fetch_url = `https://people.googleapis.com/v1/${members[0]}:deleteContact?key=${API_KEY}`;

                fetch(fetch_url, fetch_options)
                  .then(res => console.log(res));
              }
            });
        });
      }
    });


  }

})
chrome.declarativeNetRequest.onRuleMatchedDebug.addListener((e) => {
  const msg = `Navigation blocked to ${e.request.url} on tab ${e.request.tabId}.`;
  console.log(msg);
});

chrome.storage.local.get(["key"]).then((data) => {
  var urlFilter = data.key
  let id = 2;
  console.log("urlFilter")
  console.log(urlFilter)

});





