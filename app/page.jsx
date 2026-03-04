import Hero from "../src/components/Hero";
import ContactForm from "../src/components/ContactForm";

export default function Home() {
  const bulletStyle = {
    display: "flex",
    alignItems: "flex-start",
    gap: "12px",
    fontSize: "15px",
    color: "#ccc",
    marginBottom: "16px",
  };

  const bulletIconStyle = {
    color: "#c8ff00",
    fontSize: "18px",
    lineHeight: "1",
  };

  return (
    <main>
      <Hero />
      
      {/* Contact Section */}
      <section style={{ background: "#0d0d0d", padding: "100px 24px" }}>
        <div className="contact-grid" style={{ 
          maxWidth: "1200px", 
          margin: "0 auto", 
          display: "grid", 
          gridTemplateColumns: "1fr 1fr", 
          gap: "80px",
          alignItems: "start"
        }}>
          {/* Left Column */}
          <div>
            <span style={{
              display: "inline-block",
              border: "1px solid #c8ff00",
              color: "#c8ff00",
              padding: "6px 16px",
              borderRadius: "100px",
              fontSize: "12px",
              fontWeight: "700",
              textTransform: "uppercase",
              letterSpacing: "1px",
              marginBottom: "24px"
            }}>
              Start a Project
            </span>
            
            <h2 style={{ 
              fontSize: "clamp(32px, 4vw, 48px)", 
              fontWeight: "800", 
              color: "white", 
              lineHeight: "1.1",
              marginBottom: "24px",
              marginTop: 0
            }}>
              Your vision, <em style={{ color: "#c8ff00", fontStyle: "normal" }}>expertly</em> executed
            </h2>
            
            <p style={{ color: "#888", fontSize: "16px", lineHeight: "1.7", marginBottom: "40px" }}>
              See how RF Studio transforms your online presence into a powerful engine for business expansion.
            </p>
            
            <div style={{ marginBottom: "40px" }}>
              <div style={bulletStyle}>
                <span style={bulletIconStyle} aria-hidden="true">✦</span>
                <span>How RF Studio works to amplify your digital footprint</span>
              </div>
              <div style={bulletStyle}>
                <span style={bulletIconStyle} aria-hidden="true">✦</span>
                <span>Development services that turn visitors into customers</span>
              </div>
              <div style={bulletStyle}>
                <span style={bulletIconStyle} aria-hidden="true">✦</span>
                <span>Project structures that fit your company's ambitions</span>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div>
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}
