import React from "react";
import PageHeading from "../PageHeading/PageHeading";
import "./PageTitle.scss";

export default function PageTitle({
  label,
  title,
  description,
  className = "",
}) {
  return (
    <header className={["page-title", className].filter(Boolean).join(" ")}>
      <div className="page-title__heading">
        <p className="page-title__label">{label}</p>
        <PageHeading>{title}</PageHeading>
      </div>
      {description && <p className="page-title__description">{description}</p>}
    </header>
  );
}
