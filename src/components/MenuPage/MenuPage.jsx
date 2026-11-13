import "./MenuPage.scss";
import React from "react";
import PageContainer from "../PageContainer/PageContainer";
export default function MenuPage({ title }) {
  return (
    <main id="main-content" className="menu-page" tabIndex={-1}>
      <PageContainer>
        <h1>{title}</h1>
      </PageContainer>
    </main>
  );
}
