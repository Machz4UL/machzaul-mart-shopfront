
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { useEffect } from "react";
import { seedProducts } from "@/lib/local-storage";

export default function Layout() {
  useEffect(() => {
    // Seed some initial products if none exist
    seedProducts();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet />
      </main>
      <footer className="bg-brand-purple-dark text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} MachzaulMart. All rights reserved.</p>
          <p className="text-sm mt-2">Made with ♥ by Lovable</p>
        </div>
      </footer>
    </div>
  );
}
