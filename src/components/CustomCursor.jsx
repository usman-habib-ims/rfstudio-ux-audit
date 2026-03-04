"use client";

import React, { useRef, useEffect } from "react";

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const trailRef = useRef(null);
  const requestRef = useRef();

  const mousePos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });
  const trailPos = useRef({ x: 0, y: 0 });
  const angle = useRef(0);
  const lastAngle = useRef(0);
  const isHovering = useRef(false);

  useEffect(() => {
    const onMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseOver = (e) => {
      if (e.target && e.target.closest) {
        isHovering.current = !!e.target.closest('a, button, [role="button"]');
      }
    };

    const animate = () => {
      // Direct update for main cursor (zero lag)
      currentPos.current.x = mousePos.current.x;
      currentPos.current.y = mousePos.current.y;

      // Lerp for trailing ring (smooth lag)
      const lerpFactor = 0.12;
      trailPos.current.x += (mousePos.current.x - trailPos.current.x) * lerpFactor;
      trailPos.current.y += (mousePos.current.y - trailPos.current.y) * lerpFactor;

      // Calculate rotation based on movement
      const dx = mousePos.current.x - currentPos.current.x; // this doesn't work if they are same
      // Need previous mouse pos for rotation?
      // Actually, use current vs mousePos from last frame.
    };
    
    // Better rotation logic:
    let prevX = 0;
    let prevY = 0;

    const update = () => {
      const dx = mousePos.current.x - prevX;
      const dy = mousePos.current.y - prevY;

      if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
        lastAngle.current = Math.atan2(dy, dx) * (180 / Math.PI);
      }

      // Smoothly interpolate angle? Not asked, but could be nice. 
      // User just said "rotate to point in the direction".
      angle.current = lastAngle.current;

      // Update positions
      const lerpFactor = 0.12;
      trailPos.current.x += (mousePos.current.x - trailPos.current.x) * lerpFactor;
      trailPos.current.y += (mousePos.current.y - trailPos.current.y) * lerpFactor;

      if (cursorRef.current) {
        const opacity = isHovering.current ? 0.5 : 1;
        cursorRef.current.style.transform = `translate(${mousePos.current.x}px, ${mousePos.current.y}px) rotate(${angle.current}deg)`;
        cursorRef.current.style.opacity = opacity;
      }

      if (trailRef.current) {
        const scale = isHovering.current ? 1.8 : 1;
        trailRef.current.style.transform = `translate(${trailPos.current.x}px, ${trailPos.current.y}px) scale(${scale})`;
      }

      prevX = mousePos.current.x;
      prevY = mousePos.current.y;

      requestRef.current = requestAnimationFrame(update);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", onMouseOver);
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
          zIndex: 9999,
          willChange: "transform",
          marginLeft: "-12px",
          marginTop: "-12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          filter: "drop-shadow(0 0 6px #c8ff00aa)",
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 2L22 12L2 22L6 12L2 2Z"
            fill="#c8ff00"
          />
        </svg>
      </div>
      <div
        ref={trailRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "40px",
          height: "40px",
          border: "2px solid #c8ff00",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9998,
          willChange: "transform",
          marginLeft: "-20px",
          marginTop: "-20px",
          transition: "opacity 0.2s ease", 
        }}
      />
    </>
  );
};

export default CustomCursor;
