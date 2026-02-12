"use client";

import { Phone, Mail, MapPin, MessageSquare, ArrowRight, User, Globe, Send } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ContactSection() {
  return (
    <section className="py-12 md:py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="bg-white rounded-[2rem] md:rounded-[3rem] p-3 md:p-6 shadow-2xl border border-slate-100 overflow-hidden relative">
          
          {/* Decorative Blur */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-600/5 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-600/5 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="bg-white/50 backdrop-blur-xl rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden grid lg:grid-cols-2 gap-8 lg:gap-0">
            
            {/* Left Side: Content & Buttons */}
            <div className="p-4 sm:p-8 md:p-16 flex flex-col justify-between relative z-10">
              <div>
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-100 text-brand-600 text-xs sm:text-sm font-semibold mb-6 md:mb-8"
                >
                  <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>Get in touch</span>
                </motion.div>
                
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-2xl sm:text-3xl md:text-6xl font-bold text-slate-900 mb-4 md:mb-6 tracking-tight leading-tight"
                >
                  We&apos;re Ready, <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-brand-500">Let&apos;s Talk</span>
                </motion.h2>
                
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-slate-600 text-sm sm:text-base md:text-lg mb-8 md:mb-12 max-w-md leading-relaxed"
                >
                  5 Star Processing is committed to providing exceptional customer service and support to all of their clients. They have a team of experienced professionals who are available 24/7 to answer questions, provide guidance, and troubleshoot any issues that arise.
                </motion.p>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <Link 
                    href="/signup" 
                    className="inline-flex items-center justify-center px-8 py-4 bg-brand-600 hover:bg-brand-700 text-white rounded-2xl font-bold text-lg transition-all hover:shadow-[0_20px_40px_-15px_rgba(255,0,0,0.5)] hover:-translate-y-1"
                  >
                    Get Started
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                  
                  <Link 
                    href="/partner" 
                    className="inline-flex items-center justify-center px-8 py-4 bg-white border border-slate-200 text-slate-900 hover:bg-slate-50 rounded-2xl font-bold text-lg transition-all hover:-translate-y-1"
                  >
                    Become a Partner
                  </Link>
                </motion.div>
              </div>
            </div>

            {/* Right Side: Details & Map */}
            <div className="relative bg-slate-50/50 p-4 sm:p-8 md:p-12 flex flex-col gap-8">
              
              {/* Contact Details */}
              <div className="space-y-4">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="flex items-start gap-4 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm"
                >
                  <div className="p-3 bg-brand-100 text-brand-600 rounded-xl">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">Email</h3>
                    <p className="text-slate-600 break-all">info@5starprocessing.com</p>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="flex items-start gap-4 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm"
                >
                  <div className="p-3 bg-brand-100 text-brand-600 rounded-xl">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">Phone</h3>
                    <p className="text-slate-600">(888) 253-9692</p>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="flex items-start gap-4 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm"
                >
                  <div className="p-3 bg-brand-100 text-brand-600 rounded-xl">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">Address</h3>
                    <p className="text-slate-600">
                      9245 Laguna Springs Dr #200, Elk Grove, CA 95758, United States
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Map */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="relative flex-1 min-h-[300px] rounded-2xl overflow-hidden shadow-lg border border-slate-200"
              >
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3122.569527666249!2d-121.4191636846617!3d38.42302197964661!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x809ac61a2b2b2b2b%3A0x2b2b2b2b2b2b2b2b!2s9245%20Laguna%20Springs%20Dr%20%23200%2C%20Elk%20Grove%2C%20CA%2095758!5e0!3m2!1sen!2sus!4v1625687452145!5m2!1sen!2sus" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0, filter: "grayscale(1) contrast(1.2) opacity(0.8)" }} 
                  allowFullScreen={true} 
                  loading="lazy"
                  title="Google Map"
                  className="absolute inset-0"
                ></iframe>
                <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent pointer-events-none" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
