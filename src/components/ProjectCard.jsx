import React from "react";
import ProjectCover from "./ProjectCover";
export default function ProjectCard({ project: p, onSelect }) {
  return (
    <button
      className="project"
      onClick={() => onSelect(p)}
      aria-label={`${p.title} 상세 보기`}
    >
      <ProjectCover project={p} />
      <div className="project-info">
        <div>
          <span className="category">
            {p.category} <span> / {p.projectType || p.role}</span>
          </span>
          <h3>{p.title}</h3>
          <p>{p.description}</p>
        </div>
        <span className="project-arrow">↗</span>
      </div>
    </button>
  );
}
