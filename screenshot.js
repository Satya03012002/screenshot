


chrome.storage.local.get("screenshot", function(result) {
    document.getElementById("screenshot").src = result.screenshot;
  });