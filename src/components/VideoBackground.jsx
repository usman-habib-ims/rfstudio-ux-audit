"use client";

import React, { useState, useEffect } from "react";

const VideoBackground = ({ src, poster, fallbackImage }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Breakpoint: 768px for mobile detection
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Listen for prefers-reduced-motion media query
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleMotionChange = () => {
      setPrefersReducedMotion(motionQuery.matches);
    };

    handleResize();
    handleMotionChange();

    window.addEventListener("resize", handleResize);
    motionQuery.addEventListener("change", handleMotionChange);

    return () => {
      window.removeEventListener("resize", handleResize);
      motionQuery.removeEventListener("change", handleMotionChange);
    };
  }, []);

  const containerStyle = {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    overflow: "hidden",
    zIndex: 0,
  };

  const mediaStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
  };

  return (
    <div style={containerStyle}>
      {isMobile || prefersReducedMotion ? (
        <img
          src={fallbackImage}
          alt=""
          aria-hidden="true"
          style={mediaStyle}
          width="100%"
          height="100%"
        />
      ) : (
        // Place hero-bg.mp4 (max 8MB, 1920x1080) in /public/videos/
        // Place hero-poster.webp (max 50KB, first frame) in /public/images/
        // Place hero-fallback.jpg (max 200KB) in /public/images/
        <video
          autoPlay
          muted
          loop
          playsInline
          width="1920"
          height="1080"
          poster={poster}
          preload="none"
          aria-hidden="true"
          style={mediaStyle}
        >
          <source src={src} type="video/mp4" />
        </video>
      )}
    </div>
  );
};

export default VideoBackground;
