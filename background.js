chrome.tabs.onUpdated.addListener((tabId, info, tab) => {
  chrome.tabs.sendMessage(tabId, { message: "onUpdate", tabId: tab.id })
})

chrome.tabs.onActivated.addListener(activeInfo => {
  tabId = activeInfo.tabId
  chrome.storage.local.get(tabId.toString(), result => {
		let linkLength = Object.values(result).toString()
		if (linkLength !== "0") {
			chrome.browserAction.setBadgeText({ text: linkLength, tabId: tabId})
		}
  })
})
