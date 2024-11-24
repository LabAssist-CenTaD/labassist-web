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

      <div className="AI-powered-titration">
        <p className="div">
          <span className="description">AI-powered Titration Analysis </span>

          <span className="span">V2</span>
        </p>
      </div>
    </div>
  );
};
