import React from "react";
import { documentDownloads } from "../data/downloads";

export default function FooterItem({ label, className }) {
  const document = documentDownloads[label];
  if (!document) return <span className={className}>{label}</span>;

  return (
    <a
      className={className}
      href={document.href}
      download={document.filename}
      aria-label={`${label} 다운로드 (DOCX)`}
    >
      {label}
    </a>
  );
}
