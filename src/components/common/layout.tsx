import { ReactNode } from "react";
import Navbar from "./navbar";
import Footer from "./footer"; 

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="container mx-auto py-8"> {/* styling container */}
        {children}
      </main>
      <Footer />
    </>
  );
}
