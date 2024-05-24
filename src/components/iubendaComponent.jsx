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

export { IubendaPrivacyPolicy, IubendaCookiePolicy }
