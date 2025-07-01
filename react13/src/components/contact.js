import React, { useEffect } from "react";
import "./sigin.css";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Load HubSpot script
    const hubspotScript = document.createElement("script");
    hubspotScript.src = "//js.hsforms.net/forms/embed/v2.js";
    hubspotScript.async = true;
    hubspotScript.onload = () => {
      if (window.hbspt) {
        window.hbspt.forms.create({
          region: "na1",
          portalId: "45719092",
          formId: "0f3c571e-dcd0-47d6-ae52-f29896c9faf3",
          target: "#hubspotForm",
        });
      }
    };
    document.body.appendChild(hubspotScript);

    // Load CargoEZ tracking script
    const cargoScript = document.createElement("script");
    cargoScript.src =
      "https://static.cargoez.com/assets/js/cargoez.js?c=air7seas";
    cargoScript.async = true;
    

    document.body.appendChild(cargoScript);

    return () => {
      document.getElementById("hubspotForm")?.replaceChildren();
      document.getElementById("cez-tracker")?.replaceChildren();
    };
  }, []);

  return (
    <div className="sigin-page">
      {/* <div className="sigin-canvas">
        <a
          href="./"
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
          className="back-image"
        >
          <img src="back.png" alt="Go Back" />
        </a>
        <div className="sigin-left">
          <img src="signin-photo.jpg" alt="Sign In" />
        </div>
        <div id="hubspotForm" className="sigin-right"></div>
      </div> */}
      <div id="cez-tracker" style={{ backgroundColor: "white" }}></div>
    </div>
  );
};

export default Contact;
