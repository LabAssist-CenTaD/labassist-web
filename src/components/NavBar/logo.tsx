// import React from "react";
import labassist_logo from "../../assets/labassist-logo.svg";
import "./Logo.css";

export const Logo = () => {
  return (
    <div className="frame">
      <img
        className="labassist-logo"
        alt="Labassist logo"
        src={labassist_logo}
      />

      <div className="AI-powered-titration">
        <p className="div">
          <span className="text-wrapper">AI-powered Titration Analysis </span>

          <span className="span">V2</span>
        </p>
      </div>
    </div>
  );
};

export default Logo;
