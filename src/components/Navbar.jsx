"use client";

import React, { useState, useEffect, useRef } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const drawerRef = useRef(null);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target) && !event.target.closest('#hamburger-btn')) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "auto";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const navLinks = [
    { name: "Services", href: "#" },
    { name: "Work", href: "#" },
    { name: "About", href: "#" },
    { name: "Contact", href: "#" },
  ];

  const styles = {
    nav: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "80px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 5%",
      backgroundColor: "rgba(10, 10, 10, 0.8)",
      backdropFilter: "blur(10px)",
      zIndex: 1000,
      borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
    },
    logo: {
      fontSize: "24px",
      fontWeight: "bold",
      color: "white",
      textDecoration: "none",
      display: "flex",
      alignItems: "center",
    },
    logoHighlight: {
      color: "#c8ff00",
      marginRight: "4px",
    },
    desktopNav: {
      alignItems: "center",
      gap: "32px",
    },
    navLink: {
      color: "white",
      textDecoration: "none",
      fontSize: "16px",
      fontWeight: "500",
      transition: "color 0.2s ease",
    },
    ctaButton: {
      backgroundColor: "#c8ff00",
      color: "black",
      padding: "12px 24px",
      borderRadius: "100px",
      textDecoration: "none",
      fontWeight: "600",
      fontSize: "14px",
      transition: "transform 0.2s ease",
    },
    hamburger: {
      flexDirection: "column",
      justifyContent: "center",
      gap: "5px",
      width: "30px",
      height: "30px",
      background: "none",
      border: "none",
      cursor: "pointer",
      padding: 0,
      zIndex: 1100,
      position: "relative",
    },
    bar: {
      width: "100%",
      height: "2px",
      backgroundColor: "white",
      transition: "all 0.3s ease",
    },
    mobileDrawer: {
      position: "fixed",
      top: 0,
      right: 0,
      width: "100%",
      height: "100vh",
      backgroundColor: "rgba(10, 10, 10, 0.95)",
      backdropFilter: "blur(20px)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: "80px 40px",
      transform: isOpen ? "translateX(0)" : "translateX(100%)",
      transition: "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
      zIndex: 1050,
      pointerEvents: isOpen ? "all" : "none",
    },
    mobileNavLink: {
      fontSize: "40px",
      fontWeight: "bold",
      color: "white",
      textDecoration: "none",
      margin: "15px 0",
      borderLeft: "3px solid transparent",
      paddingLeft: "20px",
      transition: "color 0.2s ease, border-color 0.2s ease",
      display: "block",
    },
  };

  return (
    <>
      <nav style={styles.nav}>
        <a href="/" style={styles.logo}>
          <span style={styles.logoHighlight}>RF</span> Studio
        </a>

        <div className="desktop-nav" style={styles.desktopNav}>
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              style={styles.navLink}
              onMouseEnter={(e) => e.target.style.color = "#c8ff00"}
              onMouseLeave={(e) => e.target.style.color = "white"}
            >
              {link.name}
            </a>
          ))}
          <a href="#" style={styles.ctaButton}>Get Started</a>
        </div>

        <button 
          id="hamburger-btn"
          className="hamburger-btn"
          style={styles.hamburger} 
          onClick={toggleMenu}
          aria-expanded={isOpen}
          aria-label="Toggle navigation menu"
        >
          <div style={{
            ...styles.bar,
            transform: isOpen ? "translateY(7px) rotate(45deg)" : "none"
          }} />
          <div style={{
            ...styles.bar,
            opacity: isOpen ? 0 : 1
          }} />
          <div style={{
            ...styles.bar,
            transform: isOpen ? "translateY(-7px) rotate(-45deg)" : "none"
          }} />
        </button>
      </nav>

      <div 
        ref={drawerRef}
        style={styles.mobileDrawer}
        role="navigation"
        aria-label="Mobile navigation"
      >
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            style={styles.mobileNavLink}
            onClick={() => setIsOpen(false)}
            onMouseEnter={(e) => {
              e.target.style.color = "#c8ff00";
              e.target.style.borderLeftColor = "#c8ff00";
            }}
            onMouseLeave={(e) => {
              e.target.style.color = "white";
              e.target.style.borderLeftColor = "transparent";
            }}
          >
            {link.name}
          </a>
        ))}
        <a 
          href="#" 
          style={{...styles.ctaButton, display: "inline-block", marginTop: "30px", textAlign: "center", width: "fit-content"}}
          onClick={() => setIsOpen(false)}
        >
          Get Started
        </a>
      </div>

      <style jsx global>{`
        body {
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          background-color: #0a0a0a;
          color: white;
        }
        .desktop-nav {
          display: flex !important;
        }
        .hamburger-btn {
          display: none !important;
        }
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .hamburger-btn {
            display: flex !important;
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;
