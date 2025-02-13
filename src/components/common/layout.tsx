import { ReactNode } from "react";
import Navbar from "./navbar";
import Footer from "./footer";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen"> 
      <Navbar />
      <main className="container mx-auto py-8 flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}
