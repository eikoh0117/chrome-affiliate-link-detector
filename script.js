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
		linkA: "link-a.net/gate.php?guid="
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
    elem.style.border = "solid 3px"
    elem.style.borderColor = "#ff0000"
    elem.style.padding = "1px"
  })

  const linkLength = aElements.length.toString()

  return linkLength
}

chrome.extension.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message == "onUpdate") {
    const linkLength = detectAffiliateLinks()
    const tabId = request.tabId.toString()

    chrome.storage.local.set({ [tabId]: linkLength })
  }
  return true
})
