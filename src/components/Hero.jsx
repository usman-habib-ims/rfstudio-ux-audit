"use client";

import React, { useState, useEffect } from "react";
import VideoBackground from "./VideoBackground";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const styles = {
    wrapper: {
      position: "relative",
      overflow: "hidden",
      minHeight: "100vh",
      width: "100%",
    },
    overlay: {
      position: "absolute",
      inset: 0,
      background: "rgba(0,0,0,0.65)",
      zIndex: 1,
    },
    section: {
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      padding: "100px 20px 40px",
      color: "white",
      position: "relative",
      zIndex: 2,
    },
    label: {
      display: "inline-block",
      border: "1px solid rgba(200, 255, 0, 0.3)",
      background: "rgba(200, 255, 0, 0.05)",
      color: "#c8ff00",
      padding: "8px 24px",
      borderRadius: "100px",
      fontSize: "14px",
      fontWeight: "600",
      marginBottom: "24px",
      letterSpacing: "1px",
      textTransform: "uppercase",
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? "translateY(0)" : "translateY(20px)",
      transition: "opacity 1s cubic-bezier(0.4, 0, 0.2, 1), transform 1s cubic-bezier(0.4, 0, 0.2, 1)",
    },
    headline: {
      fontSize: "clamp(44px, 10vw, 84px)",
      fontWeight: "900",
      lineHeight: "0.95",
      maxWidth: "1100px",
      marginBottom: "28px",
      letterSpacing: "-2px",
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? "translateY(0)" : "translateY(30px)",
      transition: "opacity 1s cubic-bezier(0.4, 0, 0.2, 1) 0.1s, transform 1s cubic-bezier(0.4, 0, 0.2, 1) 0.1s",
    },
    highlight: {
      color: "#c8ff00",
    },
    subtitle: {
      fontSize: "clamp(16px, 2.5vw, 22px)",
      color: "rgba(255, 255, 255, 0.6)",
      maxWidth: "700px",
      lineHeight: "1.5",
      marginBottom: "48px",
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? "translateY(0)" : "translateY(20px)",
      transition: "opacity 1s cubic-bezier(0.4, 0, 0.2, 1) 0.2s, transform 1s cubic-bezier(0.4, 0, 0.2, 1) 0.2s",
    },
    buttonContainer: {
      display: "flex",
      gap: "20px",
      marginBottom: "80px",
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? "translateY(0)" : "translateY(20px)",
      transition: "opacity 1s cubic-bezier(0.4, 0, 0.2, 1) 0.3s, transform 1s cubic-bezier(0.4, 0, 0.2, 1) 0.3s",
      flexWrap: "wrap",
      justifyContent: "center",
    },
    primaryBtn: {
      backgroundColor: "#c8ff00",
      color: "black",
      padding: "16px 36px",
      borderRadius: "100px",
      textDecoration: "none",
      fontWeight: "800",
      fontSize: "16px",
      transition: "all 0.3s ease",
      border: "2px solid #c8ff00",
    },
    secondaryBtn: {
      backgroundColor: "transparent",
      color: "white",
      padding: "16px 36px",
      borderRadius: "100px",
      textDecoration: "none",
      fontWeight: "800",
      fontSize: "16px",
      border: "2px solid rgba(255, 255, 255, 0.2)",
      transition: "all 0.3s ease",
    },
    statsContainer: {
      display: "flex",
      gap: "80px",
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? "translateY(0)" : "translateY(20px)",
      transition: "opacity 1s cubic-bezier(0.4, 0, 0.2, 1) 0.4s, transform 1s cubic-bezier(0.4, 0, 0.2, 1) 0.4s",
      flexWrap: "wrap",
      justifyContent: "center",
      borderTop: "1px solid rgba(255, 255, 255, 0.1)",
      paddingTop: "40px",
    },
    statBox: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    statValue: {
      fontSize: "44px",
      fontWeight: "900",
      marginBottom: "4px",
      color: "white",
    },
    statLabel: {
      color: "rgba(255, 255, 255, 0.4)",
      fontSize: "12px",
      textTransform: "uppercase",
      letterSpacing: "2px",
      fontWeight: "700",
    },
  };

  return (
    <div style={styles.wrapper}>
      <VideoBackground
        src="/videos/hero-bg.mp4"
        poster="/images/hero-poster.webp"
        fallbackImage="/images/hero-fallback.jpg"
      />
      <div style={styles.overlay}></div>
      <section style={styles.section}>
        <div style={styles.label}>Growth Intelligence Agency</div>
        <h1 style={styles.headline}>
          We Turn Insights Into <span style={styles.highlight}>Revenue</span>
        </h1>
        <p style={styles.subtitle}>
          We build your unfair advantage — a living system that learns faster, 
          experiments smarter, and compounds growth quarter after quarter.
        </p>
        
        <div style={styles.buttonContainer}>
          <a href="#" style={styles.primaryBtn}>Get Started</a>
          <a href="#" style={styles.secondaryBtn}>See Our Work</a>
        </div>

        <div style={styles.statsContainer}>
          <div style={styles.statBox}>
            <span style={styles.statValue}>120+</span>
            <span style={styles.statLabel}>Clients Served</span>
          </div>
          <div style={styles.statBox}>
            <span style={styles.statValue}>3.4x</span>
            <span style={styles.statLabel}>Average ROI</span>
          </div>
          <div style={styles.statBox}>
            <span style={styles.statValue}>98%</span>
            <span style={styles.statLabel}>Retention Rate</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
