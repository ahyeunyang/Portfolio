import React from "react";
import { socialLinks } from "../../data/header";

export default function FooterSocial({ className, linkClassName }) {
  return (
    <nav className={className} aria-label="소셜 채널">
      {/* <span className={linkClassName}>Youtube</span> */}
      {socialLinks.map((item) => (
        <a
          key={item.label}
          href={item.href}
          className={linkClassName}
          target="_blank"
          rel="noopener noreferrer"
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}
