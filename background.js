chrome.tabs.onUpdated.addListener((tabId, info, tab) => {
  chrome.tabs.sendMessage(tabId, { message: "onUpdate", tabId: tab.id })
})

chrome.tabs.onActivated.addListener(activeInfo => {
  tabId = activeInfo.tabId.toString()
  chrome.storage.local.get(tabId, result => {
    let linkLength = Object.values(result).toString()
    chrome.browserAction.setBadgeText({ text: linkLength })
  })
})
