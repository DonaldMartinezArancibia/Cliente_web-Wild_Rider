import React from "react";

const HqRentalIframe = () => {
  return (
    <iframe
      src="https://wild-rica-costa-rica-2.hqrentals.eu/public/car-rental/reservations/embed?brand=lyt17ynm-fufr-9im6-9jfn-zmokkc1lmugu&new=true&layout=vertical&forced_locale=pt"
      // width="770"
      // height="360"
      style={{ border: "none" }}
      title="HQ Rental Form"
      loading="lazy"
      className="h-[500px] w-[360px] min-[700px]:h-[470px] min-[800px]:w-[650px] min-[800px]:h-[470px] xl:w-[440px]"
    />
  );
};

export default HqRentalIframe;
