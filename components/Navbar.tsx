import React, { useState, useEffect } from "react";
import { Menu, X, Terminal } from "lucide-react";
import { PERSONAL_INFO } from "../constants";
import { scrollToSection } from "../utils/scroll";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Identity", id: "about" },
    { name: "Arsenal", id: "skills" },
    { name: "History", id: "experience" },
    { name: "Labs", id: "projects" },
  ];

  const handleLinkClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    scrollToSection(id);
    setIsOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 mx-auto max-w-7xl px-4`}
    >
      <div
        className={`rounded-b-[2rem] border transition-all duration-500 ${scrolled ? "bg-gray-950/80 backdrop-blur-xl border-gray-800/50 shadow-2xl py-3 px-8" : "bg-transparent border-transparent py-5 px-4"}`}
      >
        <div className="flex items-center justify-between">
          {/* Professional Brand Logo */}
          <div
            className="flex items-center gap-4 cursor-pointer group"
            onClick={(e) => handleLinkClick(e, "about")}
          >
            <div className="p-2.5 bg-gray-900 border border-gray-800 rounded-xl shadow-2xl group-hover:border-blue-500/50 group-hover:bg-gray-800 transition-all duration-300">
              <Terminal className="w-5 h-5 text-blue-500" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center">
                <span className="text-xl font-black tracking-tighter text-white uppercase leading-none">
                  KASHISH<span className="text-blue-500">.</span>
                </span>
              </div>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="flex items-center space-x-2">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={(e) => handleLinkClick(e, link.id)}
                  className="text-gray-400 hover:text-white px-6 py-3 text-sm font-black transition-all rounded-2xl hover:bg-gray-800/50"
                >
                  {link.name}
                </button>
              ))}
              <div className="w-px h-6 bg-gray-800 mx-4"></div>
              <button
                onClick={(e) => handleLinkClick(e, "contact")}
                className="bg-white text-gray-950 hover:bg-blue-600 hover:text-white px-10 py-4 rounded-2xl text-sm font-black transition-all shadow-xl active:scale-95"
              >
                Hire Now
              </button>
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-3 rounded-2xl bg-gray-900 border border-gray-800 text-gray-400 hover:text-white transition-all"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-28 left-4 right-4 transition-all duration-500 transform ${isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"}`}
      >
        <div className="p-6 bg-gray-950/95 border border-gray-800 rounded-[2.5rem] shadow-2xl space-y-3 backdrop-blur-2xl">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={(e) => handleLinkClick(e, link.id)}
              className="text-gray-400 hover:text-white hover:bg-gray-900 block w-full text-left px-8 py-5 rounded-2xl text-xl font-black transition-all"
            >
              {link.name}
            </button>
          ))}
          <button
            onClick={(e) => handleLinkClick(e, "contact")}
            className="w-full bg-blue-600 text-white py-6 rounded-2xl font-black text-center mt-6 shadow-xl"
          >
            Start Project
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
