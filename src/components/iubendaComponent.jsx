import { useEffect } from "react"

const IubendaCookieConsent = ({ cookiePolicyId, lang }) => {
  useEffect(() => {
    const existingConfig = document.getElementById("iubenda-config")
    const existingAutoblock = document.getElementById("iubenda-autoblock")
    const existingGpp = document.getElementById("iubenda-gpp")
    const existingCs = document.getElementById("iubenda-cs")

    if (existingConfig || existingAutoblock || existingGpp || existingCs) return

    const configScript = document.createElement("script")
    configScript.id = "iubenda-config"
    configScript.type = "text/javascript"
    configScript.innerHTML = `
      var _iub = _iub || [];
      _iub.csConfiguration = {
        "askConsentAtCookiePolicyUpdate": true,
        "countryDetection": true,
        "enableFadp": true,
        "enableLgpd": true,
        "enableUspr": true,
        "fadpApplies": true,
        "floatingPreferencesButtonDisplay": "anchored-center-left",
        "lang": "${lang}",
        "perPurposeConsent": true,
        "siteId": 3694485,
        "usprApplies": true,
        "cookiePolicyId": ${cookiePolicyId},
        "banner": {
          "acceptButtonColor": "#0833A2",
          "acceptButtonDisplay": true,
          "backgroundColor": "#F6CC4D",
          "brandBackgroundColor": "#0833A2",
          "brandTextColor": "#FFFFFF",
          "closeButtonDisplay": false,
          "customizeButtonColor": "#0833A2",
          "customizeButtonDisplay": true,
          "explicitWithdrawal": true,
          "fontSizeBody": "16px",
          "listPurposes": true,
          "rejectButtonColor": "#0833A2",
          "rejectButtonDisplay": true,
          "showPurposesToggles": true,
          "showTotalNumberOfProviders": true,
          "textColor": "#1A1A1A"
        }
      };
    `
    document.head.appendChild(configScript)

    const addScript = (id, src) => {
      const s = document.createElement("script")
      s.id = id
      s.type = "text/javascript"
      s.src = src
      s.async = true
      document.head.appendChild(s)
    }

    addScript("iubenda-autoblock", "https://cs.iubenda.com/autoblocking/3694485.js")
    addScript("iubenda-gpp", "//cdn.iubenda.com/cs/gpp/stub.js")
    addScript("iubenda-cs", "//cdn.iubenda.com/cs/iubenda_cs.js")
  }, [cookiePolicyId, lang])

  return null
}

export { IubendaCookieConsent }
