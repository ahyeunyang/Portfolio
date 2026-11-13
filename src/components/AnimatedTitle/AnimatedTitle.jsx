import React, {
  Children,
  isValidElement,
  useEffect,
  useRef,
  useState,
} from "react";
import "./AnimatedTitle.scss";

function getText(children) {
  return Children.toArray(children)
    .map((child) => {
      if (typeof child === "string" || typeof child === "number")
        return String(child);
      if (!isValidElement(child)) return "";
      return child.type === "br" ? "\n" : getText(child.props.children);
    })
    .join("");
}

export default function AnimatedTitle({ children, className = "", ...props }) {
  const text = getText(children);
  return (
    <TitleReveal key={text} text={text} className={className} {...props} />
  );
}

function TitleReveal({ text, className, ...props }) {
  const heading = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !window.IntersectionObserver
    ) {
      setVisible(true);
      return;
    }
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(heading.current);
    return () => observer.disconnect();
  }, []);
  const segmenter =
    typeof Intl.Segmenter === "function"
      ? new Intl.Segmenter("ko", { granularity: "grapheme" })
      : null;
  const split = (word) =>
    segmenter
      ? Array.from(segmenter.segment(word), (item) => item.segment)
      : Array.from(word);
  let index = 0;
  return (
    <h1
      {...props}
      ref={heading}
      aria-label={text.replace(/\n/g, " ")}
      className={[
        "animated-title",
        visible && "animated-title--visible",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <span aria-hidden="true">
        {text.split("\n").map((line, lineIndex) => (
          <React.Fragment key={lineIndex}>
            {lineIndex > 0 && <br />}
            {line.split(/(\s+)/).map((word, wordIndex) =>
              /^\s+$/.test(word) ? (
                word
              ) : (
                <span className="animated-title__word" key={wordIndex}>
                  {split(word).map((character) => {
                    const characterIndex = index++;
                    return (
                      <span
                        className="animated-title__character"
                        key={characterIndex}
                        style={{ "--character-index": characterIndex }}
                      >
                        {character}
                      </span>
                    );
                  })}
                </span>
              ),
            )}
          </React.Fragment>
        ))}
      </span>
    </h1>
  );
}
