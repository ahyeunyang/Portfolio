import React, { useState } from "react";
import { portfolioData } from "../data/portfolioData";
import { projectCategories } from "../data/categories";
import ProjectCard from "../components/ProjectCard";
import ProjectDialog from "../components/ProjectDialog";
import SectionHeading from "../components/SectionHeading";
export default function Home() {
  const [filter, setFilter] = useState("전체");
  const [selected, setSelected] = useState(null);
  const projects = portfolioData.filter(
    (p) => filter === "전체" || p.category === filter,
  );
  return (
    <>
      <main>
        <section className="hero">
          <div className="eyebrow">
            <span className="dot" /> UI/UX DESIGNER & WEB PUBLISHER
          </div>
          <h1>
            좋은 경험을 디자인하고,
            <br />
            끝까지{" "}
            <span className="hero-accent">
              구현합니다
              <svg viewBox="0 0 500 20" preserveAspectRatio="none">
                <path d="M3 13Q250 -6 497 10" />
              </svg>
            </span>
            <span className="period">.</span>
          </h1>
          <div className="hero-bottom">
            <p>
              사용자를 이해하는 디자인, 디테일을 담은 코드.
              <br />
              디자인과 구현 사이를 연결하는 양아연입니다.
            </p>
            <a href="#work" className="explore">
              작업 살펴보기 <span>↓</span>
            </a>
          </div>
          <div className="hero-index">
            PORTFOLIO — SELECTED WORKS <span>DESIGN TO DEVELOPMENT</span>
          </div>
        </section>
        <section id="work" className="work">
          <SectionHeading
            eyebrow="01 / SELECTED WORKS"
            title="경험을 만드는 작업들"
            description={
              <>
                다양한 화면, 일관된 고민.
                <br />
                사용하기 좋은 경험을 만듭니다.
              </>
            }
            accent
          />
          <div className="filters" role="group" aria-label="프로젝트 카테고리">
            {projectCategories.map((c) => (
              <button
                key={c}
                aria-pressed={filter === c}
                className={filter === c ? "active" : ""}
                onClick={() => setFilter(c)}
              >
                {c}
                <span>
                  {c === "전체"
                    ? portfolioData.length
                    : portfolioData.filter((p) => p.category === c).length}
                </span>
              </button>
            ))}
          </div>
          <div className="project-grid">
            {projects.map((p) => (
              <ProjectCard key={p.id} project={p} onSelect={setSelected} />
            ))}
          </div>
          {projects.length === 0 && (
            <p className="project-empty" role="status">
              아직 등록된 {filter} 작업이 없습니다.
            </p>
          )}
          {projects.length > 0 && (
            <p className="visual-note">
              썸네일은 프로젝트 내용을 바탕으로 구성한 콘셉트 비주얼입니다.
            </p>
          )}
        </section>
        <section id="about" className="about">
          <div className="about-left">
            <span className="eyebrow">02 / ABOUT ME</span>
            <h2>
              보기 좋은 화면에서,
              <br />
              <span>쓰기 좋은 경험으로.</span>
            </h2>
            <div className="about-art" aria-hidden="true">
              a<span>✳</span>
            </div>
          </div>
          <div className="about-right">
            <p className="about-intro">
              디자인의 의도가
              <br />
              실제 화면까지 이어지도록.
            </p>
            <p>
              안녕하세요. UI/UX 디자인과 웹 퍼블리싱을 하는 양아연입니다. 정보의
              흐름을 정리하고, 사용자가 자연스럽게 다음 행동을 찾을 수 있는
              화면을 만듭니다.
            </p>
            <p>
              금융 인터페이스부터 기업 홈페이지, 앱 UI와 웹 접근성까지. 서로
              다른 환경에서도 사용자를 먼저 생각하며 디자인과 구현을 연결합니다.
            </p>
            <div className="about-tags">
              <span>UI/UX Design</span>
              <span>Web Publishing</span>
              <span>Accessibility</span>
            </div>
          </div>
        </section>
        <section id="skills" className="skills">
          <SectionHeading
            eyebrow="03 / WHAT I DO"
            title="생각을 화면으로 만드는 힘."
          />
          <div className="skill-list">
            {[
              {
                n: "01",
                title: "UI/UX 디자인",
                desc: "정보의 우선순위와 사용자 흐름을 고려해 화면을 설계합니다.",
                tags: "Figma · 화면 설계 · 인터페이스 디자인",
              },
              {
                n: "02",
                title: "웹 퍼블리싱",
                desc: "디자인의 디테일을 살려 구조적이고 유연한 웹 화면을 구현합니다.",
                tags: "HTML · SCSS · JavaScript · React",
              },
              {
                n: "03",
                title: "웹 접근성",
                desc: "다양한 사용자가 화면을 이해하고 조작할 수 있도록 개선합니다.",
                tags: "ARIA · 키보드 탐색 · 스크린리더",
              },
            ].map((s) => (
              <div className="skill" key={s.n}>
                <span>{s.n}</span>
                <h3>{s.title}</h3>
                <div>
                  <p>{s.desc}</p>
                  <small>{s.tags}</small>
                </div>
                <span className="skill-plus">↗</span>
              </div>
            ))}
          </div>
        </section>
        <section className="closing">
          <span className="eyebrow">
            THOUGHTFULLY DESIGNED. CAREFULLY BUILT.
          </span>
          <h2>
            다음 경험도,
            <br />더 나은 방향으로<span>↗</span>
          </h2>
          <a href="#work">
            프로젝트 다시 살펴보기 <span>↑</span>
          </a>
        </section>
      </main>
      {selected && (
        <ProjectDialog project={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}
