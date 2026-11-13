import HeaderLink from "./HeaderLink";
import React, { Fragment, useEffect, useRef, useState } from "react";
import HeaderDrawer from "./HeaderDrawer";
import HeaderLogo from "./HeaderLogo";
import HeaderIcon from "./HeaderIcon";
import {
  headerGroups,
  socialLinks,
  consultUrl,
} from "../data/header";
import { useHeaderScroll, useHorizontalDrag } from "../hooks/useHeader";
export default function Header() {
  const [mobile, setMobile] = useState(
    () => window.matchMedia("(max-width: 74.99875rem)").matches,
  );
  const [open, setOpen] = useState(false);
  const menuButton = useRef(null),
    nav = useRef(null);
  const hidden = useHeaderScroll(mobile, open);
  useHorizontalDrag(nav, mobile);
  useEffect(() => {
    const query = window.matchMedia("(max-width: 74.99875rem)");
    const update = () => {
      setMobile(query.matches);
      setOpen(false);
    };
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return (
    <>
      <HeaderLink className="skip" href="#work">
        프로젝트로 바로가기
      </HeaderLink>
      {mobile ? (
        <header
          className={`mo-header mo-headerSticky${hidden ? " mo-headerHidden" : ""}`}
        >
          <div className="mo-top">
            <HeaderLogo mobile />
            <div className="mo-actions">
              <HeaderLink
                className="mo-consultLink"
                href={consultUrl}
                target="_blank"
                rel="noreferrer"
              >
                문의하기
              </HeaderLink>
              <button
                ref={menuButton}
                className="mo-iconBtn"
                type="button"
                aria-label="메뉴 열기"
                aria-expanded={open}
                aria-controls="header-drawer"
                onClick={() => setOpen(true)}
              >
                <HeaderIcon />
              </button>
            </div>
          </div>
          <nav className="mo-navWrap" aria-label="주요 메뉴">
            <ul className="mo-nav" ref={nav}>
              {headerGroups.map((group, index) => (
                <li className="mo-navGroup" key={group[0].label}>
                  {index > 0 && (
                    <span className="mo-navDot" aria-hidden="true" />
                  )}
                  {group.map((item) => (
                    <HeaderLink
                      key={item.label}
                      href={item.href}
                      draggable={false}
                      className="mo-navLink"
                    >
                      {item.label}
                    </HeaderLink>
                  ))}
                </li>
              ))}
            </ul>
          </nav>
        </header>
      ) : (
        <header
          className={`pc-header pc-header--sticky${hidden ? " pc-header--hidden" : ""}`}
        >
          <div className="header-container pc-header__top">
            <HeaderLogo />
            <div className="pc-header__top-right">
              {socialLinks.filter((item) => item.desktop).map((item) => (
                <HeaderLink
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="pc-header__social-link"
                >
                  {item.label}
                </HeaderLink>
              ))}
            </div>
          </div>
          <div className="pc-header__nav-wrap">
            <div className="header-container">
              <nav className="pc-header__nav" aria-label="주요 메뉴">
                <div className="pc-header__nav-left">
                  {headerGroups[0].map((item) => (
                    <HeaderLink
                      key={item.label}
                      href={item.href}
                      className="pc-header__nav-link"
                    >
                      {item.label}
                    </HeaderLink>
                  ))}
                </div>
                <div className="pc-header__nav-right">
                  {headerGroups.slice(1).map((group, index) => (
                    <Fragment key={group[0].label}>
                      {index > 0 && (
                        <span
                          className="pc-header__nav-separate"
                          aria-hidden="true"
                        />
                      )}
                      {group.map((item) => (
                        <HeaderLink
                          key={item.label}
                          href={item.href}
                          className="pc-header__nav-link"
                        >
                          {item.label}
                        </HeaderLink>
                      ))}
                    </Fragment>
                  ))}
                  <HeaderLink
                    href={consultUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="pc-header__consult-btn"
                  >
                    문의하기
                  </HeaderLink>
                </div>
              </nav>
            </div>
          </div>
        </header>
      )}
      {open && mobile && (
        <HeaderDrawer onClose={() => setOpen(false)} triggerRef={menuButton} />
      )}
    </>
  );
}
