"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronRight, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [industriesOpen, setServicesIndustriesOpen] = useState(false);
  const [net30Open, setNet30Open] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Partners", href: "/partner" },
    { name: "Contact", href: "/contact" },
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className={clsx(
          "fixed top-4 left-0 right-0 z-50 transition-all duration-300 mx-auto max-w-7xl px-4",
          scrolled 
            ? "top-2" 
            : "top-6"
        )}
      >
        <div className={clsx(
          "w-full rounded-full border transition-all duration-300 flex items-center justify-between px-6 py-3",
          scrolled
            ? "bg-white/80 backdrop-blur-2xl border-slate-200/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
            : "bg-white/60 backdrop-blur-xl border-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.02)]"
        )}>
          <Link href="/" className="flex items-center gap-2">
            <Image 
              src="/logo.png" 
              alt="5 Star Processing" 
              width={160} 
              height={45} 
              className="object-contain h-10 w-auto"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-6">
            <Link 
              href="/" 
              className="text-sm font-medium text-slate-700 hover:text-brand-600 transition-colors relative group"
            >
              Home
              <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-brand-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </Link>
            {/* Services Dropdown */}
            <div 
              className="relative group"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button className="flex items-center gap-1 text-sm font-medium text-slate-700 hover:text-brand-600 transition-colors py-2">
                Services
                <ChevronDown className={clsx("w-4 h-4 transition-transform", servicesOpen && "rotate-180")} />
              </button>
              
              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-56"
                  >
                    <div className="bg-white/90 backdrop-blur-xl border border-slate-200/60 rounded-2xl shadow-xl overflow-hidden p-2">
                      <Link 
                        href="/mobile-processing" 
                        className="block px-4 py-2.5 text-sm text-slate-700 hover:text-brand-600 hover:bg-brand-50/50 rounded-xl transition-all"
                      >
                        Mobile Processing
                      </Link>
                      <Link 
                        href="/pos-systems" 
                        className="block px-4 py-2.5 text-sm text-slate-700 hover:text-brand-600 hover:bg-brand-50/50 rounded-xl transition-all"
                      >
                        POS Systems
                      </Link>
                      <Link 
                        href="/high-risk" 
                        className="block px-4 py-2.5 text-sm text-slate-700 hover:text-brand-600 hover:bg-brand-50/50 rounded-xl transition-all"
                      >
                        High-Risk Merchant Accounts
                      </Link>
                      <Link 
                        href="/merchant-services" 
                        className="block px-4 py-2.5 text-sm text-slate-700 hover:text-brand-600 hover:bg-brand-50/50 rounded-xl transition-all"
                      >
                        Merchant Services
                      </Link>
                      <Link 
                        href="/#services" 
                        className="block px-4 py-2.5 text-sm font-semibold text-brand-600 hover:bg-brand-50/50 rounded-xl transition-all mt-1 border-t border-slate-100"
                      >
                        All Services
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Industries Dropdown */}
            <div 
              className="relative group"
              onMouseEnter={() => setServicesIndustriesOpen(true)}
              onMouseLeave={() => setServicesIndustriesOpen(false)}
            >
              <button className="flex items-center gap-1 text-sm font-medium text-slate-700 hover:text-brand-600 transition-colors py-2">
                Industries
                <ChevronDown className={clsx("w-4 h-4 transition-transform", industriesOpen && "rotate-180")} />
              </button>
              
              <AnimatePresence>
                {industriesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-56"
                  >
                    <div className="bg-white/90 backdrop-blur-xl border border-slate-200/60 rounded-2xl shadow-xl overflow-hidden p-2">
                      <Link 
                        href="/industries/towing" 
                        className="block px-4 py-2.5 text-sm text-slate-700 hover:text-brand-600 hover:bg-brand-50/50 rounded-xl transition-all"
                      >
                        Towing Companies
                      </Link>
                      <Link 
                        href="/industries/veterinary" 
                        className="block px-4 py-2.5 text-sm text-slate-700 hover:text-brand-600 hover:bg-brand-50/50 rounded-xl transition-all"
                      >
                        Veterinary Practices
                      </Link>
                      <Link 
                        href="/industries/auto-dealerships" 
                        className="block px-4 py-2.5 text-sm text-slate-700 hover:text-brand-600 hover:bg-brand-50/50 rounded-xl transition-all"
                      >
                        Auto Dealerships
                      </Link>
                      <Link 
                        href="/industries" 
                        className="block px-4 py-2.5 text-sm font-semibold text-brand-600 hover:bg-brand-50/50 rounded-xl transition-all mt-1 border-t border-slate-100"
                      >
                        All Industries
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Net 30 Dropdown */}
            <div 
              className="relative group"
              onMouseEnter={() => setNet30Open(true)}
              onMouseLeave={() => setNet30Open(false)}
            >
              <button className="flex items-center gap-1 text-sm font-medium text-slate-700 hover:text-brand-600 transition-colors py-2">
                Net 30
                <ChevronDown className={clsx("w-4 h-4 transition-transform", net30Open && "rotate-180")} />
              </button>
              
              <AnimatePresence>
                {net30Open && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-56"
                  >
                    <div className="bg-white/90 backdrop-blur-xl border border-slate-200/60 rounded-2xl shadow-xl overflow-hidden p-2">
                      <Link 
                        href="/credit-repair" 
                        className="block px-4 py-2.5 text-sm text-slate-700 hover:text-brand-600 hover:bg-brand-50/50 rounded-xl transition-all"
                      >
                        Credit Repair
                      </Link>
                      <Link 
                        href="/credibility-program" 
                        className="block px-4 py-2.5 text-sm text-slate-700 hover:text-brand-600 hover:bg-brand-50/50 rounded-xl transition-all"
                      >
                        Credibility Program
                      </Link>
                      <Link 
                        href="/net-30" 
                        className="block px-4 py-2.5 text-sm font-semibold text-brand-600 hover:bg-brand-50/50 rounded-xl transition-all mt-1 border-t border-slate-100"
                      >
                        Net 30 Overview
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {navLinks.filter((l) => l.name !== "Home").map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className="text-sm font-medium text-slate-700 hover:text-brand-600 transition-colors relative group"
              >
                {link.name}
                <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-brand-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <Link 
              href="/login" 
              className="text-sm font-medium text-slate-700 hover:text-brand-600 transition-colors"
            >
              Log in
            </Link>
            <Link 
              href="/signup" 
              className="group flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-brand-500 to-brand-400 text-white rounded-full text-sm font-bold shadow-lg shadow-brand-500/30 hover:shadow-brand-500/40 hover:scale-105 transition-all"
            >
              Get Started
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="lg:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-white md:hidden flex flex-col p-6"
          >
            <div className="flex justify-between items-center mb-10">
              <span className="text-xl font-bold text-slate-900">Menu</span>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-slate-500 hover:text-slate-900"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex flex-col gap-6 flex-1 overflow-y-auto">
              <Link 
                href="/"
                className="text-2xl font-bold text-slate-900 hover:text-brand-600 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <div className="flex flex-col gap-4">
                <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Services</span>
                <Link 
                  href="/mobile-processing"
                  className="text-2xl font-bold text-slate-900 hover:text-brand-600 transition-colors pl-4 border-l-2 border-slate-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Mobile Processing
                </Link>
                <Link 
                  href="/pos-systems"
                  className="text-2xl font-bold text-slate-900 hover:text-brand-600 transition-colors pl-4 border-l-2 border-slate-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  POS Systems
                </Link>
                <Link 
                  href="/high-risk"
                  className="text-2xl font-bold text-slate-900 hover:text-brand-600 transition-colors pl-4 border-l-2 border-slate-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  High-Risk Merchant Accounts
                </Link>
                <Link 
                  href="/merchant-services"
                  className="text-2xl font-bold text-slate-900 hover:text-brand-600 transition-colors pl-4 border-l-2 border-slate-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Merchant Services
                </Link>
                <Link 
                  href="/#services"
                  className="text-2xl font-bold text-slate-900 hover:text-brand-600 transition-colors pl-4 border-l-2 border-slate-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  All Services
                </Link>
              </div>

              <div className="flex flex-col gap-4">
                <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Industries</span>
                <Link 
                  href="/industries/towing"
                  className="text-2xl font-bold text-slate-900 hover:text-brand-600 transition-colors pl-4 border-l-2 border-slate-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Towing Companies
                </Link>
                <Link 
                  href="/industries/veterinary"
                  className="text-2xl font-bold text-slate-900 hover:text-brand-600 transition-colors pl-4 border-l-2 border-slate-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Veterinary Practices
                </Link>
                <Link 
                  href="/industries/auto-dealerships"
                  className="text-2xl font-bold text-slate-900 hover:text-brand-600 transition-colors pl-4 border-l-2 border-slate-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Auto Dealerships
                </Link>
                <Link 
                  href="/industries"
                  className="text-2xl font-bold text-slate-900 hover:text-brand-600 transition-colors pl-4 border-l-2 border-slate-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  All Industries
                </Link>
              </div>

              <div className="flex flex-col gap-4">
                <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Net 30</span>
                <Link 
                  href="/credit-repair"
                  className="text-2xl font-bold text-slate-900 hover:text-brand-600 transition-colors pl-4 border-l-2 border-slate-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Credit Repair
                </Link>
                <Link 
                  href="/credibility-program"
                  className="text-2xl font-bold text-slate-900 hover:text-brand-600 transition-colors pl-4 border-l-2 border-slate-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Credibility Program
                </Link>
                <Link 
                  href="/net-30"
                  className="text-2xl font-bold text-slate-900 hover:text-brand-600 transition-colors pl-4 border-l-2 border-slate-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Net 30 Overview
                </Link>
              </div>

              {navLinks.filter((l) => l.name !== "Home").map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href}
                  className="text-2xl font-bold text-slate-900 hover:text-brand-600 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="h-px bg-slate-200 my-4" />
              <Link 
                href="/login"
                className="text-lg font-medium text-slate-600 hover:text-brand-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                Log in
              </Link>
              <Link 
                href="/signup"
                className="w-full py-4 bg-brand-600 text-white rounded-xl text-center font-bold text-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
