
  // if (info.menuItemId === "parent") {
  //       baseURL = "http://en.wikipedia.org/wiki/";
  // var newURL = baseURL + info.selectionText;
  // //create the new URL in the user's browser
  // chrome.tabs.create({ url: newURL });
  //     // Do something when the "myMenuItem" context menu item is clicked
  //     console.log("Menu item clicked in tab " + tab.id);
  //   }
  // console.log("satya")


    // baseURL = "http://en.wikipedia.org/wiki/";
  // var newURL = baseURL + info.selectionText;
  // //create the new URL in the user's browser
  // chrome.tabs.create({ url: newURL });
 // console.log("satya")


 // chrome.declarativeNetRequest.onRuleMatchedDebug.addListener((mrd) => {
//   console.log(mrd.request.url)
// });


// chrome.webRequest.onBeforeRequest.addListener(
//   function(details) {

//     let result = -1

//     chrome.storage.local.get("blockUrl", function(result) {
//      if(result.indexOf(details.url) != -1){
//       result = 1
//      }
//   });

//     // return {cancel: details.url.indexOf("://www.evil.com/") != -1};

//     return {cancel: result != -1};
//   },
//   {urls: ["<all_urls>"]},
//   ["blocking"]


// );


// chrome.storage.local.get("screenshot", function(result) {
//   document.getElementById("screenshot").src = result.screenshot;
// });


// 'use strict';

// chrome.declarativeNetRequest.onRuleMatchedDebug.addListener((e) => {
//   const msg = `Navigation blocked to ${e.request.url} on tab ${e.request.tabId}.`;
//   console.log(msg);
// });

// console.log('Service worker started.');


// chrome.declarativeNetRequest.updateDynamicRules({
//   addRules: [
//     {
//       id: 1,
//       priority: 1,
//       action: {
//         type: "block",
//       },
//       condition: {
//         urlFilter: "https://example.com/*",
//         resourceTypes: ["main_frame"],
//       },
//     },
//   ],
//   removeRuleIds: [2, 3],
//   updateRules: [
//     {
//       id: 4,
//       priority: 2,
//       action: {
//         type: "modifyHeaders",
//         requestHeaders: [
//           {
//             header: "X-My-Header",
//             value: "MyValue",
//           },
//         ],
//       },
//       condition: {
//         urlFilter: "https://example.com/*",
//         resourceTypes: ["xmlhttprequest"],
//       },
//     },
//   ],
// }, (error) => {
//   if (error) {
//     console.error("Error updating declarativeNetRequest rules:", error);
//   } else {
//     console.log("declarativeNetRequest rules updated successfully!");
//   }
// });




        // chrome.tabs.create({
        //   index: currentTab.id + 1,
        //   active: true,
        //   url: '/screenshot.html',
        //   })

        // blockUrl = []

        // chrome.storage.local.set({"blockUrl": info.linkUrl}, function () {
        //   // Open a new tab to display the screenshot
        //   // chrome.tabs.create({ "url":info.pageUrl });
        // });

//         var randm = Math.random();
// console.log("pre: " + randm);
// chrome.storage.local.set({r: randm}, function(){
//   chrome.storage.local.get("r", function(st){
//     console.log("post: " + st.r);
//     randm = 1;
//     console.log("are they the same? " + (st.r == randm ? "yes" : "no"));
//   });
// });

     // chrome.storage.local.set({"blockUrl": info.linkUrl}, function () {
      //   // Open a new tab to display the screenshot
      //   // chrome.tabs.create({ "url":info.pageUrl });
      // });



// chrome.storage.local.get(["key"]).then((result) => {
//   console.log("Value currently is " + result.key);
// });
 // chrome.declarativeNetRequest.updateDynamicRules({
  //   addRules: [
  //     {
  //       id: 2,
  //       priority: 1,
  //       action: {
  //         type: "block"
  //       },
  //       condition: {
  //         urlFilter: urlFilter,
  //         resourceTypes: ["image"]
  //       }
  //     },
  
  //   ],
  //   removeRuleIds: [id]
  // });


  // document.addEventListener("mouseup", function() {

  //   console.log("hellosatya")
  //   var selectedText = window.getSelection().toString();
  //   console.log(selectedText)
  //   // if (selectedText.length > 0) {
  //   //   copyToClipboard(selectedText);
  //   // }
  // });
  
  // function copyToClipboard(text) {
  //   var input = document.createElement("textarea");
  //   document.body.appendChild(input);
  //   input.value = text;
  //   input.select();
  //   document.execCommand("copy");
  //   document.body.removeChild(input);
  // }
  


  
// const API_KEY = 'AIzaSyA1YCe2rEBj-oDF8OFi75DYdaf7xQARmWk';
// let user_signed_in = false;
// chrome.identity.onSignInChanged.addListener(function (account_id, signedIn) {
//     if (signedIn) {
//         user_signed_in = true;
//     } else {
//         user_signed_in = false;
//     }
// });
// chrome.runtime.onMessage
//   .addListener((request, sender, sendResponse) => {

//   });

//   if (request.message === 'get_auth_token') {
//     chrome.identity
//       .getAuthToken({ interactive: true }, function (token) {
//         console.log(token);
//       });
//   }else if (request.message === 'get_profile') {
//     chrome.identity
//       .getProfileUserInfo({ accountStatus: 'ANY' }, function 
//       (user_info) {
//         console.log(user_info);
//       });
//   }



//   const API_KEY = '';
// let user_signed_in = false;

// const API_KEY = 'AIzaSyA1YCe2rEBj-oDF8OFi75DYdaf7xQARmWk';
// let user_signed_in = false;

// chrome.identity.onSignInChanged.addListener(function (account_id, signedIn) {
//     if (signedIn) {
//         user_signed_in = true;
//     } else {
//         user_signed_in = false;
//     }
// });

// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//     if (request.message === 'get_auth_token') {
//         chrome.identity.getAuthToken({ interactive: true }, function (token) {
//             console.log(token);
//         });
//     } else if (request.message === 'get_profile') {
//         chrome.identity.getProfileUserInfo({ accountStatus: 'ANY' }, function (user_info) {
//             console.log(user_info);
//         });
//     } else if (request.message === 'get_contacts') {
//         chrome.identity.getAuthToken({ interactive: true }, function (token) {
//             let fetch_url = `https://people.googleapis.com/v1/contactGroups/all?maxMembers=20&key=${API_KEY}`;
//             let fetch_options = {
//                 headers: {
//                     'Authorization': `Bearer ${token}`
//                 }
//             }

//             fetch(fetch_url, fetch_options)
//                 .then(res => res.json())
//                 .then(res => {
//                     if (res.memberCount) {
//                         const members = res.memberResourceNames;
//                         fetch_url = `https://people.googleapis.com/v1/people:batchGet?personFields=names&key=${API_KEY}`;

//                         members.forEach(member => {
//                             fetch_url += `&resourceNames=${encodeURIComponent(member)}`;
//                         });

//                         fetch(fetch_url, fetch_options)
//                             .then(res => res.json())
//                             .then(res => console.log(res));
//                     }
//                 });
//         });
//     } else if (request.message === 'create_contact') {
//         chrome.identity.getAuthToken({ interactive: true }, function (token) {
//             let fetch_url = `https://people.googleapis.com/v1/people:createContact?key=${API_KEY}`;

//             let fetch_options = {
//                 method: 'POST',
//                 headers: {
//                     'Authorization': `Bearer ${token}`,
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({
//                     'names': [
//                         {
//                             "givenName": "Johnny",
//                             "familyName": "Silver"
//                         }
//                     ]
//                 })
//             }

//             fetch(fetch_url, fetch_options)
//                 .then(res => res.json())
//                 .then(res => console.log(res));
//         });
//     } else if (request.message === 'delete_contact') {
//         chrome.identity.getAuthToken({ interactive: true }, function (token) {
//             let fetch_url = `https://people.googleapis.com/v1/contactGroups/all?maxMembers=20&key=${API_KEY}`;
//             let fetch_options = {
//                 headers: {
//                     'Authorization': `Bearer ${token}`
//                 }
//             }

//             fetch(fetch_url, fetch_options)
//                 .then(res => res.json())
//                 .then(res => {
//                     if (res.memberCount) {
//                         const members = res.memberResourceNames;

//                         fetch_options.method = 'DELETE';
//                         fetch_url = `https://people.googleapis.com/v1/${members[0]}:deleteContact?key=${API_KEY}`;

//                         fetch(fetch_url, fetch_options)
//                             .then(res => console.log(res));
//                     }
//                 });
//         });
//     }
// });