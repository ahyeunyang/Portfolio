import "./MenuPage.scss";
import React from "react";
export default function MenuPage({ title }) {
  return (
    <main id="main-content" className="menu-page" tabIndex={-1}>
      <h1>{title}</h1>
    </main>
  );
}
