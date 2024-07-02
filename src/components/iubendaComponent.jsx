import React, { useEffect } from "react"
import { Helmet } from "react-helmet"

const IubendaPrivacyPolicy = () => {
  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://cdn.iubenda.com/iubenda.js"
    script.async = true
    document.body.appendChild(script)
  }, [])

  return (
    <>
      <a
        href="https://www.iubenda.com/privacy-policy/51628910"
        className="iubenda-white iubenda-noiframe iubenda-embed"
        title="Privacy Policy"
      >
        Privacy Policy
      </a>
      <Helmet>
        <script type="text/javascript">
          {`
                        (function (w,d) {
                            var loader = function () {
                                var s = d.createElement("script"),
                                tag = d.getElementsByTagName("script")[0];
                                s.src="https://cdn.iubenda.com/iubenda.js";
                                tag.parentNode.insertBefore(s,tag);
                            };
                            if(w.addEventListener){
                                w.addEventListener("load", loader, false);
                            }else if(w.attachEvent){
                                w.attachEvent("onload", loader);
                            }else{
                                w.onload = loader;
                            }
                        })(window, document);
                    `}
        </script>
      </Helmet>
    </>
  )
}

const IubendaCookiePolicy = () => {
  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://cdn.iubenda.com/iubenda.js"
    script.async = true
    document.body.appendChild(script)

    const timer = setTimeout(() => {
      const cookieLink = document.querySelector(
        '.iubenda-white[href="https://www.iubenda.com/privacy-policy/51628910/cookie-policy"]'
      )
      if (cookieLink) {
        cookieLink.click()
      }
    }, 3000) // 3000 milisegundos = 3 segundos

    return () => clearTimeout(timer) // Limpia el temporizador si el componente se desmonta
  }, [])

  return (
    <>
      <div className="hidden">
        <a
          href="https://www.iubenda.com/privacy-policy/51628910/cookie-policy"
          className="hidden iubenda-white iubenda-noiframe iubenda-embed"
          title="Cookie Policy"
        >
          Cookie Policy
        </a>
      </div>
      <Helmet>
        <script type="text/javascript">
          {`
                        (function (w,d) {
                            var loader = function () {
                                var s = d.createElement("script"),
                                tag = d.getElementsByTagName("script")[0];
                                s.src="https://cdn.iubenda.com/iubenda.js";
                                tag.parentNode.insertBefore(s,tag);
                            };
                            if(w.addEventListener){
                                w.addEventListener("load", loader, false);
                            }else if(w.attachEvent){
                                w.attachEvent("onload", loader);
                              }else{
                                w.onload = loader;
                            }
                          })(window, document);
                          `}
        </script>
      </Helmet>
    </>
  )
}

const IubendaCookieConsent = () => {
  useEffect(() => {
    const scriptAutoBlocking = document.createElement("script")
    scriptAutoBlocking.src = "https://cs.iubenda.com/autoblocking/3641787.js"
    scriptAutoBlocking.async = true
    document.body.appendChild(scriptAutoBlocking)

    const scriptStub = document.createElement("script")
    scriptStub.src = "//cdn.iubenda.com/cs/gpp/stub.js"
    scriptStub.async = true
    document.body.appendChild(scriptStub)

    const scriptCs = document.createElement("script")
    scriptCs.src = "//cdn.iubenda.com/cs/iubenda_cs.js"
    scriptCs.async = true
    document.body.appendChild(scriptCs)

    const iubendaConfig = document.createElement("script")
    iubendaConfig.type = "text/javascript"
    iubendaConfig.text = `
      var _iub = _iub || [];
      _iub.csConfiguration = {
        "askConsentAtCookiePolicyUpdate": true,
        "enableFadp": true,
        "enableLgpd": true,
        "enableUspr": true,
        "fadpApplies": true,
        "floatingPreferencesButtonDisplay": "bottom-right",
        "lang": "en",
        "perPurposeConsent": true,
        "preferenceCookie": { "expireAfter": 180 },
        "siteId": 3641787,
        "usprApplies": true,
        "whitelabel": false,
        "cookiePolicyId": 51628910,
        "banner": {
          "acceptButtonDisplay": true,
          "closeButtonDisplay": false,
          "customizeButtonDisplay": true,
          "explicitWithdrawal": true,
          "listPurposes": true,
          "ownerName": "develop--wild-rider.netlify.app/",
          "position": "float-bottom-center",
          "rejectButtonDisplay": true,
          "showTitle": false,
          "showTotalNumberOfProviders": true
        }
      };
    `
    document.body.appendChild(iubendaConfig)

    return () => {
      document.body.removeChild(scriptAutoBlocking)
      document.body.removeChild(scriptStub)
      document.body.removeChild(scriptCs)
      document.body.removeChild(iubendaConfig)
    }
  }, [])

  return (
    <Helmet>
      <script type="text/javascript">
        {`
          var _iub = _iub || [];
          _iub.csConfiguration = {
            "askConsentAtCookiePolicyUpdate": true,
            "enableFadp": true,
            "enableLgpd": true,
            "enableUspr": true,
            "fadpApplies": true,
            "floatingPreferencesButtonDisplay": "bottom-right",
            "lang": "en",
            "perPurposeConsent": true,
            "preferenceCookie": { "expireAfter": 180 },
            "siteId": 3641787,
            "usprApplies": true,
            "whitelabel": false,
            "cookiePolicyId": 51628910,
            "banner": {
              "acceptButtonDisplay": true,
              "closeButtonDisplay": false,
              "customizeButtonDisplay": true,
              "explicitWithdrawal": true,
              "listPurposes": true,
              "ownerName": "develop--wild-rider.netlify.app/",
              "position": "float-bottom-center",
              "rejectButtonDisplay": true,
              "showTitle": false,
              "showTotalNumberOfProviders": true
            }
          };
        `}
      </script>
      <script
        type="text/javascript"
        src="https://cs.iubenda.com/autoblocking/3641787.js"
      ></script>
      <script
        type="text/javascript"
        src="//cdn.iubenda.com/cs/gpp/stub.js"
      ></script>
      <script
        type="text/javascript"
        src="//cdn.iubenda.com/cs/iubenda_cs.js"
        charset="UTF-8"
        async
      ></script>
    </Helmet>
  )
}

export { IubendaPrivacyPolicy, IubendaCookiePolicy, IubendaCookieConsent }
