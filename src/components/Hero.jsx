"use client";

import React, { useState, useEffect } from "react";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const styles = {
    section: {
      minHeight: "100vh",
      backgroundColor: "#0a0a0a",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      padding: "0 20px",
      color: "white",
      overflow: "hidden",
      position: "relative",
    },
    label: {
      display: "inline-block",
      border: "1px solid #c8ff00",
      color: "#c8ff00",
      padding: "8px 20px",
      borderRadius: "100px",
      fontSize: "14px",
      fontWeight: "500",
      marginBottom: "24px",
      letterSpacing: "1px",
      textTransform: "uppercase",
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? "translateY(0)" : "translateY(20px)",
      transition: "opacity 0.8s ease, transform 0.8s ease",
    },
    headline: {
      fontSize: "clamp(40px, 8vw, 80px)",
      fontWeight: "800",
      lineHeight: "1.1",
      maxWidth: "1000px",
      marginBottom: "24px",
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? "translateY(0)" : "translateY(20px)",
      transition: "opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s",
    },
    highlight: {
      color: "#c8ff00",
    },
    subtitle: {
      fontSize: "clamp(16px, 2vw, 20px)",
      color: "#888",
      maxWidth: "600px",
      lineHeight: "1.6",
      marginBottom: "40px",
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? "translateY(0)" : "translateY(20px)",
      transition: "opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s",
    },
    buttonContainer: {
      display: "flex",
      gap: "16px",
      marginBottom: "60px",
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? "translateY(0)" : "translateY(20px)",
      transition: "opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s",
      flexWrap: "wrap",
      justifyContent: "center",
    },
    primaryBtn: {
      backgroundColor: "#c8ff00",
      color: "black",
      padding: "14px 32px",
      borderRadius: "100px",
      textDecoration: "none",
      fontWeight: "700",
      fontSize: "16px",
      transition: "all 0.3s ease",
    },
    secondaryBtn: {
      backgroundColor: "transparent",
      color: "white",
      padding: "14px 32px",
      borderRadius: "100px",
      textDecoration: "none",
      fontWeight: "700",
      fontSize: "16px",
      border: "1px solid white",
      transition: "all 0.3s ease",
    },
    statsContainer: {
      display: "flex",
      gap: "60px",
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? "translateY(0)" : "translateY(20px)",
      transition: "opacity 0.8s ease 0.4s, transform 0.8s ease 0.4s",
      flexWrap: "wrap",
      justifyContent: "center",
    },
    statBox: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    statValue: {
      fontSize: "40px",
      fontWeight: "800",
      marginBottom: "4px",
    },
    statLabel: {
      color: "#888",
      fontSize: "14px",
      textTransform: "uppercase",
      letterSpacing: "1px",
    },
  };

  return (
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
  );
};

export default Hero;
