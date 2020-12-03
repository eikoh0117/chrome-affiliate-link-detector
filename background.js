chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
	if (changeInfo.status === "complete") {
		chrome.tabs.sendMessage(tabId, { message: "onUpdate", tabId: tab.id }, (response) => {
				const linkLength = response['length']
				if (linkLength !== "0") {
					chrome.browserAction.setBadgeText({ text: linkLength, tabId: tabId})
				}
			})
	}
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
