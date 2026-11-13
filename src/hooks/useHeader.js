import { useEffect, useState } from "react";
export function useHeaderScroll(mobile, open) {
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    setHidden(false);
    let previous = window.scrollY,
      accumulated = 0,
      lastTime = 0,
      frame = 0;
    const update = (event) => {
      if (open) return;
      if (mobile) {
        if (event.timeStamp - lastTime < 100) return;
        lastTime = event.timeStamp;
        const y = window.scrollY;
        if (y < 0) {
          previous = 0;
          return;
        }
        const delta = y - previous;
        previous = y;
        if (y <= 97) {
          accumulated = 0;
          setHidden(false);
          return;
        }
        if ((delta > 0 && accumulated < 0) || (delta < 0 && accumulated > 0))
          accumulated = 0;
        accumulated += delta;
        if (accumulated > 48) setHidden(true);
        else if (accumulated < -16) setHidden(false);
      } else if (!frame) {
        frame = requestAnimationFrame(() => {
          frame = 0;
          const y = window.scrollY,
            delta = y - previous;
          if (y <= 130) setHidden(false);
          else if (delta > 8) setHidden(true);
          else if (delta < -8) setHidden(false);
          if (Math.abs(delta) > 8 || y <= 130) previous = y;
        });
      }
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      cancelAnimationFrame(frame);
    };
  }, [mobile, open]);
  return hidden && !open;
}
export function useHorizontalDrag(ref, enabled) {
  useEffect(() => {
    const nav = ref.current;
    if (!enabled || !nav) return;
    let active = false,
      moved = false,
      start = 0,
      left = 0;
    const down = (e) => {
      if (e.pointerType !== "mouse") return;
      active = true;
      moved = false;
      start = e.clientX;
      left = nav.scrollLeft;
      nav.classList.add("mo-dragging");
    };
    const move = (e) => {
      if (!active) return;
      const delta = e.clientX - start;
      if (Math.abs(delta) > 3) moved = true;
      nav.scrollLeft = left - delta;
    };
    const end = () => {
      active = false;
      nav.classList.remove("mo-dragging");
    };
    const click = (e) => {
      if (moved) {
        e.preventDefault();
        e.stopPropagation();
        moved = false;
      }
    };
    nav.addEventListener("pointerdown", down);
    nav.addEventListener("pointermove", move);
    ["pointerup", "pointercancel", "pointerleave"].forEach((type) =>
      nav.addEventListener(type, end),
    );
    nav.addEventListener("click", click, true);
    return () => {
      nav.removeEventListener("pointerdown", down);
      nav.removeEventListener("pointermove", move);
      ["pointerup", "pointercancel", "pointerleave"].forEach((type) =>
        nav.removeEventListener(type, end),
      );
      nav.removeEventListener("click", click, true);
    };
  }, [ref, enabled]);
}
