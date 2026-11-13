import React from "react";
export default function SectionHeading({
  eyebrow,
  title,
  description,
  accent = false,
}) {
  return (
    <div className="section-head">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h2>
          {title}
          {accent && (
            <span className="tiny-star" aria-hidden="true">
              ✳
            </span>
          )}
        </h2>
      </div>
      {description && <p>{description}</p>}
    </div>
  );
}
