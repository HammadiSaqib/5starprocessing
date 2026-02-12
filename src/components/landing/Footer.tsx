"use client";

import { ArrowRight, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="bg-slate-50 text-slate-600 pt-16 pb-10 border-t border-slate-200 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[50%] -right-[20%] w-[100%] h-[100%] bg-brand-100/60 rounded-full blur-[150px] mix-blend-multiply" />
        <div className="absolute -bottom-[20%] -left-[10%] w-[80%] h-[80%] bg-brand-200/60 rounded-full blur-[150px] mix-blend-multiply" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Middle Footer: Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-20">
          <div className="lg:col-span-4">
             <h4 className="text-slate-900 font-bold text-lg mb-6">Get In Touch</h4>
            
            <div className="text-slate-600 mb-8 leading-relaxed max-w-sm space-y-2">
               <p><strong className="text-slate-900">Phone:</strong> (888) 253-9692</p>
               <p><strong className="text-slate-900">Email:</strong> info@5starprocessing.com</p>
               <p className="pt-2">
                 <strong className="text-slate-900 block">Address:</strong>
                 9245 Laguna Springs Dr #200, Elk Grove, CA 95758, United States
               </p>
            </div>
          </div>

          <div className="lg:col-span-3 lg:col-start-6">
            <h4 className="text-slate-900 font-bold text-lg mb-6">Important Links</h4>
            <ul className="space-y-4">
              {[
                { name: 'Payment Processing Services for Veterinary Practices', href: '#' },
                { name: 'Net 30', href: '#' },
                { name: 'Agent Program', href: '/partner' },
                { name: 'Portal Login', href: '/login' },
              ].map(item => (
                <li key={item.name}><Link href={item.href} className="hover:text-brand-600 transition-colors hover:translate-x-1 inline-block">{item.name}</Link></li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h4 className="text-slate-900 font-bold text-lg mb-6">Services</h4>
            <ul className="space-y-4">
              {[
                { name: 'Merchant Services', href: '/merchant-services' },
                { name: 'High Risk Merchant Accounts', href: '/high-risk' },
                { name: 'POS System for Small Businesses', href: '/merchant-services' },
                { name: 'Mobile Credit Card Processing for Small Businesses', href: '/merchant-services' },
              ].map(item => (
                <li key={item.name}><Link href={item.href} className="hover:text-brand-600 transition-colors hover:translate-x-1 inline-block">{item.name}</Link></li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-slate-200 text-sm font-medium text-slate-500">
          <p>&copy; {new Date().getFullYear()} 5 Star Processing, All Rights Reserved</p>
          <div className="mt-4 md:mt-0">
            Web Design and Digital Marketing by 5 Star Processing
          </div>
        </div>
      </div>
    </footer>
  );
}
