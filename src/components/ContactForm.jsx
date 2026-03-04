"use client";

import React, { useState, useRef } from "react";

const ContactForm = () => {
  const formRef = useRef(null);
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const companyRef = useRef(null);
  const messageRef = useRef(null);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.fullName || formData.fullName.length < 2) {
      newErrors.fullName = "Full Name is required (minimum 2 characters)";
    }
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (formData.phone && formData.phone.length < 7) {
      newErrors.phone = "Phone number must be at least 7 characters";
    }
    if (!formData.message || formData.message.length < 20) {
      newErrors.message = "Message is required (minimum 20 characters)";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      
      // Focus first error field
      if (validationErrors.fullName) nameRef.current.focus();
      else if (validationErrors.email) emailRef.current.focus();
      else if (validationErrors.phone) phoneRef.current.focus();
      else if (validationErrors.message) messageRef.current.focus();
      
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        company: "",
        message: "",
      });
    }, 1500);
  };

  const resetForm = () => {
    setIsSuccess(false);
    setErrors({});
  };

  const getFieldStyle = (fieldName) => ({
    width: "100%",
    background: "rgba(255, 255, 255, 0.04)",
    border: `1px solid ${
      errors[fieldName] 
        ? "#ff4444" 
        : focusedField === fieldName 
          ? "#c8ff00" 
          : "rgba(255, 255, 255, 0.1)"
    }`,
    borderRadius: "8px",
    color: "white",
    fontSize: "15px",
    padding: "12px 16px",
    outline: "none",
    fontFamily: "inherit",
    boxShadow: errors[fieldName] 
      ? "0 0 0 3px rgba(255, 68, 68, 0.12)" 
      : focusedField === fieldName 
        ? "0 0 0 3px rgba(200, 255, 0, 0.12)" 
        : "none",
    transition: "all 0.2s ease",
    boxSizing: "border-box",
  });

  const labelStyle = {
    display: "block",
    fontSize: "13px",
    fontWeight: "600",
    color: "#ccc",
    marginBottom: "6px",
  };

  const hintStyle = (isError) => ({
    display: "block",
    fontSize: "12px",
    marginTop: "5px",
    color: isError ? "#ff4444" : "#666",
    transition: "color 0.2s ease",
  });

  if (isSuccess) {
    return (
      <div style={{
        background: "#111111",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        borderRadius: "16px",
        padding: "80px 48px",
        textAlign: "center",
        color: "white"
      }}>
        <div style={{ fontSize: "64px", color: "#c8ff00", marginBottom: "20px" }}>✓</div>
        <h2 style={{ fontSize: "32px", fontWeight: "800", marginBottom: "12px" }}>Message Sent!</h2>
        <p style={{ color: "#888", marginBottom: "32px" }}>We'll be in touch within 24 hours.</p>
        <button 
          onClick={resetForm}
          style={{
            background: "#c8ff00",
            color: "black",
            fontWeight: "800",
            fontSize: "16px",
            padding: "16px 32px",
            borderRadius: "100px",
            border: "none",
            cursor: "pointer"
          }}
        >
          Send Another
        </button>
      </div>
    );
  }

  return (
    <div style={{
      background: "#111111",
      border: "1px solid rgba(255, 255, 255, 0.08)",
      borderRadius: "16px",
      padding: "48px",
      color: "white",
      boxSizing: "border-box"
    }}>
      <h2 style={{ fontSize: "28px", fontWeight: "800", marginBottom: "8px", marginTop: 0 }}>
        Let's Build Something Powerful
      </h2>
      <p style={{ fontSize: "15px", color: "#888", marginBottom: "32px" }}>
        Fill in the form and we'll get back to you within 24 hours.
      </p>

      <form ref={formRef} onSubmit={handleSubmit} noValidate>
        <div className="form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
          <div style={{ position: "relative" }}>
            <label htmlFor="fullName" style={labelStyle}>
              Full Name <span aria-hidden="true" style={{ color: "#c8ff00" }}>*</span>
            </label>
            <input
              ref={nameRef}
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              onFocus={() => setFocusedField("fullName")}
              onBlur={() => setFocusedField(null)}
              aria-required="true"
              aria-invalid={errors.fullName ? "true" : "false"}
              aria-describedby="fullName-hint"
              placeholder="e.g. John Doe"
              style={getFieldStyle("fullName")}
            />
            <span id="fullName-hint" style={hintStyle(errors.fullName)}>
              {errors.fullName || "Enter your first and last name"}
            </span>
          </div>

          <div style={{ position: "relative" }}>
            <label htmlFor="email" style={labelStyle}>
              Email Address <span aria-hidden="true" style={{ color: "#c8ff00" }}>*</span>
            </label>
            <input
              ref={emailRef}
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onFocus={() => setFocusedField("email")}
              onBlur={() => setFocusedField(null)}
              aria-required="true"
              aria-invalid={errors.email ? "true" : "false"}
              aria-describedby="email-hint"
              placeholder="john@company.com"
              style={getFieldStyle("email")}
            />
            <span id="email-hint" style={hintStyle(errors.email)}>
              {errors.email || "We'll reply to this address within 24 hours"}
            </span>
          </div>
        </div>

        <div className="form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
          <div style={{ position: "relative" }}>
            <label htmlFor="phone" style={labelStyle}>Phone Number</label>
            <input
              ref={phoneRef}
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              onFocus={() => setFocusedField("phone")}
              onBlur={() => setFocusedField(null)}
              aria-invalid={errors.phone ? "true" : "false"}
              aria-describedby="phone-hint"
              placeholder="+1 555 000 0000"
              style={getFieldStyle("phone")}
            />
            <span id="phone-hint" style={hintStyle(errors.phone)}>
              {errors.phone || "Optional — include country code e.g. +1 555 000 0000"}
            </span>
          </div>

          <div style={{ position: "relative" }}>
            <label htmlFor="company" style={labelStyle}>Company Name</label>
            <input
              ref={companyRef}
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              onFocus={() => setFocusedField("company")}
              onBlur={() => setFocusedField(null)}
              aria-describedby="company-hint"
              placeholder="Company Inc."
              style={getFieldStyle("company")}
            />
            <span id="company-hint" style={hintStyle(false)}>
              Optional — helps us tailor our response
            </span>
          </div>
        </div>

        <div style={{ position: "relative", marginBottom: "32px" }}>
          <label htmlFor="message" style={labelStyle}>
            Message / How can we help? <span aria-hidden="true" style={{ color: "#c8ff00" }}>*</span>
          </label>
          <textarea
            ref={messageRef}
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            onFocus={() => setFocusedField("message")}
            onBlur={() => setFocusedField(null)}
            aria-required="true"
            aria-invalid={errors.message ? "true" : "false"}
            aria-describedby="message-hint"
            placeholder="Describe your project..."
            style={{ ...getFieldStyle("message"), height: "120px", resize: "vertical" }}
          />
          <span id="message-hint" style={hintStyle(errors.message)}>
            {errors.message || "Tell us about your project, goals, or challenges"}
          </span>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            width: "100%",
            background: "#c8ff00",
            color: "black",
            fontWeight: "800",
            fontSize: "16px",
            padding: "16px",
            borderRadius: "100px",
            border: "none",
            cursor: isSubmitting ? "not-allowed" : "pointer",
            opacity: isSubmitting ? 0.6 : 1,
            transition: "all 0.2s ease",
            transform: isSubmitting ? "none" : "translateY(0)"
          }}
          onMouseEnter={(e) => { if(!isSubmitting) { e.target.style.opacity = "0.85"; e.target.style.transform = "translateY(-2px)"; } }}
          onMouseLeave={(e) => { if(!isSubmitting) { e.target.style.opacity = "1"; e.target.style.transform = "translateY(0)"; } }}
        >
          {isSubmitting ? "Sending..." : "Get Started →"}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
