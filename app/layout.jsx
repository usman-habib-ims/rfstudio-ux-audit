import Navbar from "../src/components/Navbar";
import CustomCursor from "../src/components/CustomCursor";

export const metadata = {
  title: "RF Studio | Growth Intelligence Agency",
  description: "We turn insights into revenue.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body style={{ margin: 0, backgroundColor: "#0a0a0a" }}>
        <Navbar />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
