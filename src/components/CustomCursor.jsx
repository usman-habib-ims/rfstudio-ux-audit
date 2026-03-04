"use client";

import React, { useRef, useEffect } from "react";

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const trailRef = useRef(null);
  const requestRef = useRef();

  const mousePos = useRef({ x: 0, y: 0 });
  const trailPos = useRef({ x: 0, y: 0 });
  const angle = useRef(0);
  const isHovering = useRef(false);

  useEffect(() => {
    // Check if device supports hover/touch
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const onMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseOver = (e) => {
      if (e.target && e.target.closest) {
        isHovering.current = !!e.target.closest('a, button, [role="button"]');
      }
    };

    let prevX = 0;
    let prevY = 0;

    const update = () => {
      const dx = mousePos.current.x - prevX;
      const dy = mousePos.current.y - prevY;

      if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
        angle.current = Math.atan2(dy, dx) * (180 / Math.PI);
      }

      // Smooth interpolation for trail
      const lerpFactor = 0.15;
      trailPos.current.x += (mousePos.current.x - trailPos.current.x) * lerpFactor;
      trailPos.current.y += (mousePos.current.y - trailPos.current.y) * lerpFactor;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${mousePos.current.x}px, ${mousePos.current.y}px) rotate(${angle.current}deg)`;
        cursorRef.current.style.opacity = isHovering.current ? 0.5 : 1;
      }

      if (trailRef.current) {
        const scale = isHovering.current ? 1.6 : 1;
        trailRef.current.style.transform = `translate(${trailPos.current.x}px, ${trailPos.current.y}px) scale(${scale})`;
      }

      prevX = mousePos.current.x;
      prevY = mousePos.current.y;

      requestRef.current = requestAnimationFrame(update);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseover", onMouseOver, { passive: true });
    requestRef.current = requestAnimationFrame(update);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "24px",
          height: "24px",
          pointerEvents: "none",
          zIndex: 999999, // Extremely high to stay above drawer
          willChange: "transform",
          marginLeft: "-12px",
          marginTop: "-12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          filter: "drop-shadow(0 0 8px rgba(200, 255, 0, 0.6))",
          transition: "opacity 0.2s ease",
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M2 2L22 12L2 22L6 12L2 2Z" fill="#c8ff00" />
        </svg>
      </div>
      <div
        ref={trailRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "44px",
          height: "44px",
          border: "2px solid rgba(200, 255, 0, 0.5)",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 999998,
          willChange: "transform",
          marginLeft: "-22px",
          marginTop: "-22px",
          transition: "transform 0.15s ease-out", 
        }}
      />
    </>
  );
};

export default CustomCursor;
