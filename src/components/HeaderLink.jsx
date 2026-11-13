import React from "react";

// Unassigned menu items keep their reference appearance without navigating.
export default function HeaderLink({
  href,
  children,
  target,
  rel,
  onClick,
  ...props
}) {
  if (!href) return <span {...props}>{children}</span>;
  return (
    <a {...props} href={href} target={target} rel={rel} onClick={onClick}>
      {children}
    </a>
  );
}
