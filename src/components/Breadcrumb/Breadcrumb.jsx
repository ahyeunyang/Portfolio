import React from "react";
import { Link } from "react-router";
import "./Breadcrumb.scss";

export default function Breadcrumb({ items }) {
  return (
    <nav className="breadcrumb" aria-label="현재 위치">
      <ol>
        {items.map((item, index) => {
          const current = index === items.length - 1;
          return (
            <li
              key={item.href || item.label}
              aria-current={current ? "page" : undefined}
            >
              {!current && item.href ? (
                <Link to={item.href}>{item.label}</Link>
              ) : (
                item.label
              )}
              {!current && (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="m8 6 4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
