import React, { useEffect } from "react";
import "./sigin.css";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Load CargoEZ tracking script
    const cargoScript = document.createElement("script");
    cargoScript.src =
      "https://cdn.jsdelivr.net/gh/Harinikuma/widjets@main/widget.js";
    cargoScript.async = true;

    document.body.appendChild(cargoScript);
    return () => {
      document.getElementById("widget-container")?.replaceChildren();
    };
  }, []);

  return (
    <div className="sigin-page">
      <div id="widget-container" style={{ backgroundColor: "white" }}></div>
    </div>
  );
};

export default Contact;
