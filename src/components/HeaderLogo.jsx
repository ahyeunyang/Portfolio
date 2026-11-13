import React from "react";
import logo from "../static/images/remaincareer-logo.svg";
export default function HeaderLogo({ mobile = false }) {
  return (
    <span className={mobile ? "mo-logo" : "pc-header__logo"}>
      <img className="header-logo-image" src={logo} alt="remaincareer" />
    </span>
  );
}
