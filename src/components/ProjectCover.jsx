import React from "react";

export default function ProjectCover({ project }) {
  if (project.thumbnail)
    return (
      <img
        className="project-image"
        src={project.thumbnail}
        alt={project.thumbnailAlt || project.title}
      />
    );
  return (
    <div className={`cover cover-${project.cover}`} aria-hidden="true">
      {project.cover === "trading" && (
        <>
          <div className="cover-top">
            A CLEARER VIEW OF THE MARKET <span>↗</span>
          </div>
          <strong className="cover-heading">
            Trade with
            <br />a new perspective.
          </strong>
          <div className="terminal">
            <div className="terminal-nav">
              ● &nbsp; TRADE{" "}
              <span>Markets &nbsp; Portfolio &nbsp; Overview</span>
            </div>
            <div className="chart-title">
              Bitcoin <small>BTC / KRW</small>
              <b>
                98,450,000 <em>+2.84%</em>
              </b>
            </div>
            <div className="chart">
              <svg viewBox="0 0 600 130" preserveAspectRatio="none">
                <path d="M0 110L20 100L40 108L60 80L80 91L100 62L120 75L140 43L160 57L180 52L200 81L220 65L240 84L260 58L280 67L300 39L320 50L340 27L360 43L380 32L400 60L420 49L440 30L460 42L480 19L500 26L520 10L540 24L560 12L580 20L600 0" />
              </svg>
            </div>
            <div className="market-row">
              BTC <span>Bitcoin</span>
              <b>+2.84%</b>
            </div>
          </div>
        </>
      )}
      {project.cover === "ilbiz" && (
        <>
          <div className="cover-top">
            CONNECTING THE NEXT <span>2026</span>
          </div>
          <strong className="ilbiz-logo">
            ilbiz<span>®</span>
          </strong>
          <p className="ilbiz-copy">물류의 흐름을 연결하다.</p>
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="ilbiz-bottom">
            LOGISTICS. PLATFORM. POSSIBILITY. <span>↗</span>
          </div>
        </>
      )}
      {project.cover === "app" && (
        <>
          <div className="app-copy">
            <span>일상에 즐거움을 콕!</span>
            <strong>
              콕콕콕<span>✳</span>
            </strong>
          </div>
          <div className="phone">
            <div className="phone-notch" />
            <small>9:41</small>
            <h3>
              오늘은 어디를
              <br />콕 해볼까요?
            </h3>
            <div className="phone-search">내 주변의 새로운 발견 &nbsp;⌕</div>
            <div className="phone-banner">
              가까운 곳에서 찾는
              <br />
              <b>작은 행복 🍀</b>
            </div>
            <div className="phone-icons">☕ &nbsp; 🎁 &nbsp; 🥐</div>
            <h4>나를 위한 추천 장소</h4>
            <div className="phone-blocks">
              <i />
              <i />
            </div>
          </div>
          <div className="app-star">✳</div>
        </>
      )}
      {project.cover === "accessibility" && (
        <>
          <div className="cover-top">
            DESIGNED FOR EVERYONE <span>↗</span>
          </div>
          <strong className="access-title">
            모두에게
            <br />
            열린 금융.
          </strong>
          <div className="access-symbol">
            ↗<span>●</span>
          </div>
          <div className="access-bottom">
            NH 스마트뱅킹 <span>WEB ACCESSIBILITY</span>
          </div>
        </>
      )}
      <span className="cover-note">PROJECT CONCEPT VISUAL</span>
    </div>
  );
}
