import HeaderLink from "./HeaderLink";
import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import HeaderIcon from "./HeaderIcon";
import {
  headerGroups,
  memberLinks,
  socialLinks,
  consultUrl,
} from "../../data/header";
export default function HeaderDrawer({ onClose, triggerRef }) {
  const drawer = useRef(null),
    closeButton = useRef(null);
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButton.current.focus();
    const onKey = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
      if (e.key !== "Tab") return;
      const items = [...drawer.current.querySelectorAll("a[href],button")],
        first = items[0],
        last = items.at(-1);
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
      triggerRef.current?.focus();
    };
  }, [onClose, triggerRef]);
  const groups = [
    { label: "포트폴리오", items: headerGroups[0] },
    { label: "프로필", items: headerGroups.slice(1).flat() },
    {
      label: "다운로드",
      items: memberLinks,
      style: "mo-drawerLinkBold",
      divider: true,
    },
    {
      label: "소셜",
      items: socialLinks,
      style: "mo-drawerLinkSocial",
      divider: true,
      external: true,
    },
  ];
  return createPortal(
    <div
      ref={drawer}
      className="mo-drawer"
      id="header-drawer"
      role="dialog"
      aria-modal="true"
      aria-label="전체 메뉴"
    >
      <div className="mo-drawerTop">
        <div className="mo-drawerTopLeft">
          {memberLinks.slice().reverse().map((item) => (
            <HeaderLink
              key={item.label}
              href={item.href}
              className="mo-drawerTopLink"
              onClick={onClose}
            >
              {item.label}
            </HeaderLink>
          ))}
        </div>
        <button
          ref={closeButton}
          type="button"
          className="mo-iconBtn"
          aria-label="메뉴 닫기"
          onClick={onClose}
        >
          <HeaderIcon close />
        </button>
      </div>
      <div className="mo-drawerBody">
        {groups.map((group) => (
          <React.Fragment key={group.label}>
            {group.divider && <hr className="mo-drawerDivider" />}
            <div className="mo-drawerGroup">
              <p className="mo-drawerLabel">{group.label}</p>
              <ul className="mo-drawerList">
                {group.items.map((item) => (
                  <li key={item.label}>
                    <HeaderLink
                      href={item.href}
                      className={`mo-drawerLink ${group.style || ""}`}
                      target={group.external ? "_blank" : undefined}
                      rel={group.external ? "noreferrer" : undefined}
                      onClick={onClose}
                    >
                      {item.label}
                    </HeaderLink>
                  </li>
                ))}
              </ul>
            </div>
          </React.Fragment>
        ))}
      </div>
      <div className="mo-drawerBottom">
        <HeaderLink
          href={consultUrl}
          target="_blank"
          rel="noreferrer"
          className="mo-drawerBottomBtn mo-consultBtn"
        >
          문의하기
        </HeaderLink>
      </div>
    </div>,
    document.body,
  );
}
