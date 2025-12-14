import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Chatbot from "@/components/Chatbot";

interface LayoutProps {
  children: ReactNode;
  showFooter?: boolean;
}

const Layout = ({ children, showFooter = true }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col neural-grid">
      <Navbar />

      <main className="flex-1 pt-20">
        {children}
      </main>

      {showFooter && <Footer />}

      {/* Floating Chatbot (GLOBAL) */}
      <Chatbot />
    </div>
  );
};

export default Layout;
