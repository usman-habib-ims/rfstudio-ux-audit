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
      backgroundColor: "rgba(18, 4, 34, 0.8)",
      backdropFilter: "blur(12px)",
      zIndex: 1000,
      borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
      boxSizing: "border-box",
    },
    logo: {
      fontSize: "24px",
      fontWeight: "bold",
      color: "white",
      textDecoration: "none",
      display: "flex",
      alignItems: "center",
      zIndex: 1100,
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
      whiteSpace: "nowrap",
    },
    ctaButton: {
      backgroundColor: "#c8ff00",
      color: "black",
      padding: "12px 28px",
      borderRadius: "100px",
      textDecoration: "none",
      fontWeight: "700",
      fontSize: "14px",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      whiteSpace: "nowrap",
      border: "2px solid #c8ff00",
    },
    hamburger: {
      flexDirection: "column",
      justifyContent: "center",
      gap: "6px",
      width: "36px",
      height: "36px",
      background: "none",
      border: "none",
      cursor: "pointer",
      padding: 0,
      zIndex: 1100,
      position: "relative",
    },
    bar: {
      width: "100%",
      height: "2.5px",
      backgroundColor: "white",
      transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
      borderRadius: "4px",
    },
    mobileDrawer: {
      position: "fixed",
      top: 0,
      right: 0,
      width: "100%", // Default to 100% for mobile
      maxWidth: "500px", // Professional constraint for larger screens
      height: "100vh",
      backgroundColor: "rgba(22, 8, 44, 0.98)",
      backdropFilter: "blur(24px)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: "80px 10%",
      transform: isOpen ? "translateX(0)" : "translateX(100%)",
      transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
      zIndex: 1050,
      pointerEvents: isOpen ? "all" : "none",
      boxSizing: "border-box",
      boxShadow: "-10px 0 30px rgba(0,0,0,0.3)",
    },
    mobileNavLink: {
      fontSize: "44px",
      fontWeight: "800",
      color: "white",
      textDecoration: "none",
      margin: "12px 0",
      borderLeft: "4px solid transparent",
      paddingLeft: "24px",
      transition: "all 0.3s ease",
      display: "block",
      opacity: isOpen ? 1 : 0,
      transform: isOpen ? "translateX(0)" : "translateX(30px)",
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
              onMouseEnter={(e) => {
                e.target.style.color = "#c8ff00";
              }}
              onMouseLeave={(e) => {
                e.target.style.color = "white";
              }}
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#" 
            style={styles.ctaButton}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "transparent";
              e.target.style.color = "#c8ff00";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "#c8ff00";
              e.target.style.color = "black";
            }}
          >
            Get Started
          </a>
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
            transform: isOpen ? "translateY(8.5px) rotate(45deg)" : "none",
            backgroundColor: isOpen ? "#c8ff00" : "white"
          }} />
          <div style={{
            ...styles.bar,
            opacity: isOpen ? 0 : 1
          }} />
          <div style={{
            ...styles.bar,
            transform: isOpen ? "translateY(-8.5px) rotate(-45deg)" : "none",
            backgroundColor: isOpen ? "#c8ff00" : "white"
          }} />
        </button>
      </nav>

      <div 
        ref={drawerRef}
        style={styles.mobileDrawer}
        role="navigation"
        aria-label="Mobile navigation"
      >
        {navLinks.map((link, index) => (
          <a
            key={link.name}
            href={link.href}
            style={{
              ...styles.mobileNavLink,
              transitionDelay: `${0.1 + index * 0.05}s`
            }}
            onClick={() => setIsOpen(false)}
            onMouseEnter={(e) => {
              e.target.style.color = "#c8ff00";
              e.target.style.borderLeftColor = "#c8ff00";
              e.target.style.paddingLeft = "32px";
            }}
            onMouseLeave={(e) => {
              e.target.style.color = "white";
              e.target.style.borderLeftColor = "transparent";
              e.target.style.paddingLeft = "24px";
            }}
          >
            {link.name}
          </a>
        ))}
        <div style={{
          marginTop: "40px", 
          opacity: isOpen ? 1 : 0, 
          transform: isOpen ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.5s ease 0.4s"
        }}>
          <a 
            href="#" 
            style={{...styles.ctaButton, display: "inline-block", padding: "16px 40px", fontSize: "18px"}}
            onClick={() => setIsOpen(false)}
          >
            Get Started
          </a>
        </div>
      </div>

      <style jsx global>{`
        body {
          margin: 0;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          background-color: #120422;
          color: white;
        }
        .desktop-nav {
          display: flex !important;
        }
        .hamburger-btn {
          display: none !important;
        }
        @media (max-width: 992px) {
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
