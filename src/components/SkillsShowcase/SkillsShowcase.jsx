import React, { useEffect, useRef, useState } from "react";
import "./SkillsShowcase.scss";
import { technologySkills } from "../../data/technologySkills";

const skills = technologySkills;

export default function SkillsShowcase() {
  const marquee = useRef(null);
  const list = useRef(null);
  const [counts, setCounts] = useState([0, 0, 0]);

  useEffect(() => {
    const element = marquee.current;
    if (
      !element ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    element.dataset.running = "true";
    return () => delete element.dataset.running;
  }, []);

  useEffect(() => {
    const element = list.current;
    if (window.CSS?.supports("animation-timeline", "view()")) return;
    if (
      !element ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    let frame;
    let last = 0;
    let paused = false;
    const tick = () => {
      const bottom = element.getBoundingClientRect().bottom;
      element.querySelectorAll(".skills-showcase__item").forEach((item) => {
        const card = item.firstElementChild;
        const distance = bottom + 192 - (item.getBoundingClientRect().top + 46);
        const progress = Math.max(0, Math.min(1, distance / 238));
        card.style.transform = `translateY(${-192 * (1 - progress)}px) scale(${0.5 + progress * 0.5})`;
        card.style.opacity = Math.min(1, progress / 0.3);
        const glowProgress = Math.max(0, Math.min(1, distance / 330));
        const glow = glowProgress < 0.3102 ? 0 : glowProgress < 0.7212
          ? (glowProgress - 0.3102) / 0.411
          : (1 - glowProgress) / 0.2788;
        card.style.setProperty('--skills-glow', String(glow));
      });
    };
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(tick);
    };
    const pause = () => {
      paused = true;
    };
    const resume = () => {
      paused = false;
    };
    element.addEventListener("mouseenter", pause);
    element.addEventListener("mouseleave", resume);
    element.addEventListener("focusin", pause);
    element.addEventListener("focusout", resume);
    element.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
    return () => {
      cancelAnimationFrame(frame);
      element.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      element.removeEventListener("mouseenter", pause);
      element.removeEventListener("mouseleave", resume);
      element.removeEventListener("focusin", pause);
      element.removeEventListener("focusout", resume);
    };
  }, []);

  useEffect(() => {
    const target = [12, 14, skills.length];
    let frame;
    const start = performance.now();
    const animate = (time) => {
      const progress = Math.min((time - start) / 1200, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCounts(target.map((value) => Math.round(value * eased)));
      if (progress < 1) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  const logos = [...skills, ...skills];
  return (
    <section
      className="skills-showcase"
      aria-labelledby="skills-showcase-title"
    >
      <h2 id="skills-showcase-title" className="sr-only">
        사용 기술
      </h2>
      <div
        className="skills-showcase__marquee"
        ref={marquee}
        aria-label="사용 기술 목록"
      >
        <div className="skills-showcase__track">
          {logos.map((skill, index) => (
            <span key={`${skill.name}-${index}`}>
              <img src={skill.logo} alt={skill.name} className={skill.darkLogo ? "skills-showcase__image--dark" : undefined} />
            </span>
          ))}
        </div>
      </div>
      <div className="skills-showcase__body rc-sc-pass-body">
        <div className="skills-showcase__stats">
          <div className="skills-showcase__stat-grid">
            <div>
              <strong>{counts[0]}+</strong>
              <span>년의 경험</span>
            </div>
            <div>
              <strong>{counts[1]}</strong>
              <span>가지 전문 영역</span>
            </div>
            <div>
              <strong>{counts[2]}</strong>
              <span>주요 기술</span>
            </div>
          </div>
          <p className="skills-showcase__description">
            화면을 구성하는 기본 기술부터 인터랙션과 프론트엔드 프레임워크, UI/UX 디자인 및 협업 도구까지.
            다양한 기술과 도구를 활용하여 사용자 경험을 구현하고, 효율적인 개발 환경과 완성도 높은 웹 인터페이스를 만들어갑니다.
          </p>
        </div>
        <div
          ref={list}
          className="skills-showcase__list"
          tabIndex={0}
          aria-label="기술 상세 목록"
        >
          <div className="skills-showcase__fade" aria-hidden="true" />
          <ul className="skills-showcase__cards">
            {skills.map((skill, index) => (
              <li
                className="skills-showcase__item"
                style={{ zIndex: skills.length - index }}
                key={skill.name}
              >
                <article className="skills-showcase__card">
                  <div
                    className="skills-showcase__logo"
                    style={{ backgroundColor: skill.background }}
                    aria-hidden="true"
                  >
                    <img src={skill.logo} alt="" loading="lazy" />
                  </div>
                  <div>
                    <h3>{skill.name}</h3>
                    <p>{skill.detail}</p>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
