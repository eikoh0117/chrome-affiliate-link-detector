const detectAffiliateLinks = () => {
  const targetLinks = {
    moshimo: "af.moshimo.com/af/c/click?a_id=",
    a8: "px.a8.net/svt/",
    felmat: "t.felmat.net/fmcl?",
    valueCommercem: "referral?sid=",
    afb: "t.afi-b.com",
    accessTrade: "h.accesstrade.net/",
    tcs: "tcs-asp.net/alink?",
    presco: "ad.presco.asia/cl/?b_id=",
    linkA: "link-a.net/gate.php?guid=",
    affiTown: "ad.atown.jp/cp?sid=",
    doubleClick: "adclick.g.doubleclick.net/",
    bannerBridge: "track.bannerbridge.net/click.php?",
    affiliencer: "https://s5.aspservice.jp/affiliencer/link.php?",
    cuebic: "cuebic.co.jp/your_select/link/",
    ekichica: "ekichica.com/media/_click/"
  }
  const aAllelements = document.querySelectorAll("a")
  const aElements = []
  Object.values(aAllelements).forEach(elem => {
    Object.values(targetLinks).forEach(link => {
      elem.href.indexOf(link) !== -1 ? aElements.push(elem) : ""
    })
  })
  const aElementsChildren = aElements.map(elem => elem.children)
  let imgElements = []
  aElementsChildren.forEach(child => {
    Array.from(child).forEach(elem => {
      if (elem.nodeName === "IMG") {
        imgElements.push(elem)
      }
    })
  })
  const targetElements = aElements.concat(imgElements)
  targetElements.forEach(elem => {
    elem.style.border = "solid 2px"
    elem.style.borderColor = "#ff0000"
    elem.style.padding = "1px"
    elem.style.borderRadius = "5px"
  })

  const linkLength = aElements.length.toString()

  return linkLength
}

chrome.extension.onMessage.addListener((request, sender, sendResponse) => {
	if (request.message == "onUpdate") {
		const linkLength = detectAffiliateLinks()
    const tabId = request.tabId.toString()
		chrome.storage.local.set({ [tabId]: linkLength })
		sendResponse({ length: linkLength })
  }
	return true
})
