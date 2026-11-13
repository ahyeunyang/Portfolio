import "./Footer.scss";
import React, { useState } from "react";
import FooterSocial from "./FooterSocial";
import FooterItem from "./FooterItem";
import {
  footerContact as contact,
  footerBusiness as business,
  footerTopPolicies,
  footerMobilePolicies,
  footerInfoTitle,
  footerCopyright,
} from "../../data/footer";

export default function Footer() {
  const [expanded, setExpanded] = useState(false);
  const row = (items, className) => (
    <div className={className}>
      {items.map((text) => (
        <span key={text}>{text}</span>
      ))}
    </div>
  );
  return (
    <>
      <footer className="pc-footer">
        <div className="pc-footer__top">
          <div className="footer-container pc-footer__top-inner">
            <FooterSocial className="pc-footer__social" />
            <div className="pc-footer__links">
              {footerTopPolicies.map((text) => (
                <FooterItem key={text} label={text} />
              ))}
            </div>
          </div>
        </div>
        <div className="pc-footer__main">
          <div className="footer-container">
            <div className="pc-footer__contact">
              <div className="pc-footer__phone">
                <span className="pc-footer__phone-number">{contact.phone}</span>
                <span className="pc-footer__phone-meta">
                  {contact.tagline}
                </span>
              </div>
              <span className="pc-footer__email">{contact.email}</span>
            </div>
            <div className="pc-footer__info">
              {business.length > 0 && row(business[0], "pc-footer__info-row")}
              {business.length > 1 && (
                <div className="pc-footer__info-group">
                  {business.slice(1).map((items, index) => (
                    <React.Fragment key={index}>
                      {row(items, "pc-footer__info-row")}
                    </React.Fragment>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="pc-footer__bottom">
          <div className="footer-container pc-footer__bottom-inner">
            <span className="pc-footer__copyright">
              {footerCopyright}
            </span>
          </div>
        </div>
      </footer>
      <footer className="mo-footer">
        <FooterSocial
          className="mo-footer-social"
          linkClassName="mo-footer-socialLink"
        />
        <div className="mo-footer-contact">
          <div className="mo-footer-phoneRow">
            <span className="mo-footer-phone">{contact.phone}</span>
            <span className="mo-footer-phoneMeta">
              {contact.tagline}
            </span>
          </div>
          <span className="mo-footer-email">{contact.email}</span>
        </div>
        <div className="mo-footer-biz">
          <button
            type="button"
            className="mo-footer-bizToggle"
            aria-expanded={expanded}
            aria-controls="footer-business-detail"
            onClick={() => setExpanded((value) => !value)}
          >
            <span className="mo-footer-bizTitle">{footerInfoTitle}</span>
            <svg
              className={
                "mo-footer-bizChevron" +
                (expanded ? " mo-footer-bizChevronOpen" : "")
              }
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                d="m7 10 5 5 5-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <div
            id="footer-business-detail"
            className="mo-footer-bizDetail"
            hidden={!expanded}
          >
            {business.map((items, index) => (
              <React.Fragment key={index}>
                {row(items, "mo-footer-bizDetailRow")}
              </React.Fragment>
            ))}
          </div>
        </div>
        <div className="mo-footer-policy">
          {footerMobilePolicies.map((text) => (
            <FooterItem className="mo-footer-policyLink" key={text} label={text} />
          ))}
        </div>
      </footer>
    </>
  );
}
