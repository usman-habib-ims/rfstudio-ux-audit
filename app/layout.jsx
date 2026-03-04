import Navbar from "../src/components/Navbar";
import CustomCursor from "../src/components/CustomCursor";
import Footer from "../src/components/Footer";

export const metadata = {
  title: "RF Studio | Growth Intelligence Agency",
  description: "We turn insights into revenue.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body style={{ margin: 0, backgroundColor: "#120422" }}>
        <Navbar />
        <CustomCursor />
        {children}
        <Footer />
      </body>
    </html>
  );
}
