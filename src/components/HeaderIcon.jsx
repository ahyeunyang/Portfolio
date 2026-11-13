import React from "react";
export default function HeaderIcon({ close = false }) {
  return (
    <span className="header-icon" aria-hidden="true">
      {close ? "close" : "dehaze"}
    </span>
  );
}
