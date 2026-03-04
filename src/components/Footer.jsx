"use client";

import React from "react";
import VideoBackground from "./VideoBackground";

const Footer = () => {
  const styles = {
    footer: {
      backgroundColor: "#0a0a0a",
      borderTop: "1px solid rgba(255,255,255,0.08)",
      color: "white",
      position: "relative",
      overflow: "hidden",
    },
    overlay: {
      position: "absolute",
      inset: 0,
      background: "rgba(10, 10, 10, 0.9)",
      zIndex: 1,
    },
    topSection: {
      padding: "60px 40px",
      display: "flex",
      flexDirection: "column",
      gap: "40px",
      position: "relative",
      zIndex: 2,
    },
    mainRow: {
      display: "flex",
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: "40px",
    },
    brandColumn: {
      flex: "1 1 300px",
      maxWidth: "400px",
    },
    logo: {
      fontSize: "24px",
      fontWeight: "bold",
      marginBottom: "16px",
      display: "block",
    },
    logoHighlight: {
      color: "#c8ff00",
    },
    tagline: {
      color: "#666",
      fontSize: "14px",
      lineHeight: "1.6",
    },
    linksGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
      gap: "32px",
      flex: "2 1 600px",
    },
    linkColumn: {
      display: "flex",
      flexDirection: "column",
      gap: "12px",
    },
    columnHeader: {
      color: "white",
      fontWeight: "700",
      fontSize: "13px",
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      marginBottom: "16px",
    },
    link: {
      color: "#888",
      textDecoration: "none",
      fontSize: "14px",
      transition: "color 0.2s ease",
    },
    bottomSection: {
      padding: "20px 40px",
      borderTop: "1px solid rgba(255,255,255,0.06)",
      display: "flex",
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: "10px",
      fontSize: "13px",
      color: "#666",
      position: "relative",
      zIndex: 2,
    },
  };

  const footerData = [
    {
      title: "Growth Engine",
      links: ["Overview", "CRO", "Channel Optimization", "RevOps"],
    },
    {
      title: "Digital Experience",
      links: ["Agentic Commerce", "E-Commerce", "Shopify"],
    },
    {
      title: "Resources",
      links: ["Guidebooks", "Blog", "Events", "Communities"],
    },
    {
      title: "Company",
      links: ["Our Brands", "Partners", "Careers"],
    },
  ];

  return (
    <footer style={styles.footer}>
      <VideoBackground
        src="/videos/footer-bg.mp4"
        poster="/images/footer-poster.webp"
        fallbackImage="/images/footer-fallback.jpg"
      />
      <div style={styles.overlay}></div>
      
      <div style={styles.topSection}>
        <div style={styles.mainRow}>
          <div style={styles.brandColumn}>
            <span style={styles.logo}>
              <span style={styles.logoHighlight}>RF</span> Studio
            </span>
            <p style={styles.tagline}>
              Growth intelligence agency. We extract signals and compound 
              growth quarter after quarter.
            </p>
          </div>
          
          <div className="footer-links-grid" style={styles.linksGrid}>
            {footerData.map((column) => (
              <div key={column.title} style={styles.linkColumn}>
                <h4 style={styles.columnHeader}>{column.title}</h4>
                {column.links.map((link) => (
                  <a
                    key={link}
                    href="#"
                    style={styles.link}
                    onMouseEnter={(e) => (e.target.style.color = "white")}
                    onMouseLeave={(e) => (e.target.style.color = "#888")}
                  >
                    {link}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={styles.bottomSection}>
        <span>© 2026 RF Studio Global. All rights reserved.</span>
        <span>Boston · Riyadh · Doha · Pickering</span>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .footer-links-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 480px) {
          .footer-links-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
