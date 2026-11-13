import React, { useEffect, useRef } from "react";
import ProjectCover from "./ProjectCover";
export default function ProjectDialog({ project: selected, onClose }) {
  const dialog = useRef(null);
  useEffect(() => {
    const element = dialog.current;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    element.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      element.close();
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, []);
  const close = onClose;
  return (
    <dialog
      ref={dialog}
      onCancel={(e) => {
        e.preventDefault();
        close();
      }}
      onClick={(e) => {
        if (e.target === dialog.current) close();
      }}
      aria-labelledby="project-title"
    >
      {selected && (
        <>
          <button className="close" onClick={close} aria-label="상세 보기 닫기">
            ✕
          </button>
          <ProjectCover project={selected} />
          <div className="detail">
            <span className="eyebrow">
              {selected.category}
              {selected.projectType && ` / ${selected.projectType}`}
            </span>
            <h2 id="project-title">{selected.title}</h2>
            <p>{selected.detail}</p>
            <dl>
              <dt>담당 역할</dt>
              <dd>{selected.role}</dd>
              <dt>사용 도구</dt>
              <dd>{selected.skills.join(" · ")}</dd>
            </dl>
            {selected.link && (
              <a
                className="live-link"
                href={selected.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                프로젝트 사이트 보기 ↗
              </a>
            )}
          </div>
        </>
      )}
    </dialog>
  );
}
