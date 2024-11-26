// import React from "react";
import labassistLogo from "../../../assets/labassist-logo.svg";
import "./Logo.css";

export const Logo = (): JSX.Element => {
  return (
    <div className="logo">
      <img
        className="labassist-logo"
        alt="Labassist logo"
        src={labassistLogo}
      />

      <div className="ai-powered-titration">
        <p className="ai-powered-titration-text">
          AI-powered Titration Analysis <b>V2</b>
        </p>
      </div>
    </div>
  );
};
