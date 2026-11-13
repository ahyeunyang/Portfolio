import React from "react";
import AnimatedTitle from "../AnimatedTitle/AnimatedTitle";
import "./PageHeading.scss";

export default function PageHeading({ children }) {
  return (
    <AnimatedTitle className="page-title__title">{children}</AnimatedTitle>
  );
}
