import React from "react";
import { Link } from "react-router";
import logo from "../../static/images/remaincareer-logo.svg";
export default function HeaderLogo({ mobile = false }) {
  return (
    <Link
      to="/"
      aria-label="홈으로 이동"
      className={mobile ? "mo-logo" : "pc-header__logo"}
    >
      <img className="header-logo-image" src={logo} alt="remaincareer" />
    </Link>
  );
}
