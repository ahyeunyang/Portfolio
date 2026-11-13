import React from "react";
import { NavLink } from "react-router";

export default function HeaderLink({
  href,
  children,
  target,
  rel,
  onClick,
  ...props
}) {
  if (!href) return <span {...props}>{children}</span>;
  if (href.startsWith("/") && !href.startsWith("//")) {
    return (
      <NavLink
        {...props}
        to={href}
        end
        target={target}
        rel={rel}
        onClick={onClick}
      >
        {children}
      </NavLink>
    );
  }
  return (
    <a
      {...props}
      href={href}
      target={target}
      rel={rel}
      onClick={(event) => {
        if (href === "#main-content") {
          event.preventDefault();
          document.getElementById("main-content")?.focus();
        }
        onClick?.(event);
      }}
    >
      {children}
    </a>
  );
}
