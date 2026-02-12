"use client";

import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send, MessageSquare, Clock, Globe } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const [formState, setFormState] = useState({
    companyName: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    interest: "Merchant Accounts"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", formState);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 selection:bg-brand-500 selection:text-white overflow-x-hidden">
      <Navbar />

      {/* 🔵 HERO SECTION */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/80 to-slate-900/60" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-bold mb-8 shadow-lg"
            >
              <span className="w-2 h-2 rounded-full bg-brand-400 animate-pulse"></span>
              <span>CONTACT INFORMATION SECTION</span>
            </motion.div>
            
            <motion.h1
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-white drop-shadow-xl"
            >
              Reach Us <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-brand-200">Now</span>
            </motion.h1>
            
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ delay: 0.2 }}
              className="text-xl text-slate-200 leading-relaxed max-w-3xl mx-auto drop-shadow-md"
            >
              Take advantage of our Merchant Services and Net 30 Business Credit solutions to help grow your business. Whether you’re just getting started or ready to scale, our team is here to guide you every step of the way. Get set up today.
            </motion.p>
          </div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto"
          >
            {[
              {
                icon: Phone,
                title: "Phone Number",
                content: "(888) 253-9692",
                href: "tel:8882539692",
                color: "bg-brand-500",
                gradient: "from-brand-500 to-brand-600"
              },
              {
                icon: Mail,
                title: "Email Address",
                content: "info@5starprocessing.com",
                href: "mailto:info@5starprocessing.com",
                color: "bg-brand-600",
                gradient: "from-brand-600 to-brand-700"
              },
              {
                icon: MapPin,
                title: "Office Address",
                content: "9245 Laguna Springs Dr #200\nElk Grove, CA 95758\nUnited States",
                href: "#map",
                color: "bg-brand-700",
                gradient: "from-brand-700 to-brand-800"
              }
            ].map((item, i) => (
              <motion.a
                key={i}
                href={item.href}
                variants={fadeInUp}
                className="group relative p-8 rounded-[2rem] bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300 hover:-translate-y-2 overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-gradient-to-br ${item.gradient} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon className="w-7 h-7" />
                </div>
                <h3 className="text-brand-100 text-sm font-bold uppercase tracking-wider mb-3">{item.title}</h3>
                <p className="text-white font-bold text-lg whitespace-pre-line leading-relaxed">{item.content}</p>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 🔵 FORM SECTION */}
      <section className="py-24 bg-slate-50 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row">
            
            {/* Left Side - Image & Info */}
            <div className="lg:w-2/5 relative min-h-[400px] lg:min-h-full bg-slate-900">
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-60"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')" }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-brand-900/80 to-slate-900/90" />
              
              <div className="relative z-10 p-12 h-full flex flex-col justify-between text-white">
                <div>
                  <h3 className="text-3xl font-bold mb-4">Let&apos;s Connect</h3>
                  <p className="text-slate-300 leading-relaxed mb-8">
                    We&apos;d love to hear from you. Fill out the form and our team will get back to you shortly.
                  </p>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm">
                      <MessageSquare className="w-5 h-5 text-brand-300" />
                    </div>
                    <div>
                      <p className="font-bold">Chat with us</p>
                      <p className="text-sm text-slate-400">Our friendly team is here to help.</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm">
                      <Clock className="w-5 h-5 text-brand-300" />
                    </div>
                    <div>
                      <p className="font-bold">Mon-Fri 9am-5pm</p>
                      <p className="text-sm text-slate-400">We&apos;ll respond during business hours.</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm">
                      <Globe className="w-5 h-5 text-brand-300" />
                    </div>
                    <div>
                      <p className="font-bold">Global Support</p>
                      <p className="text-sm text-slate-400">Serving businesses nationwide.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="lg:w-3/5 p-8 md:p-12 lg:p-16 bg-white relative">
               {/* Glow effect */}
               <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-50/50 rounded-full blur-[100px] pointer-events-none" />

              <div className="text-center mb-10 relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">Ready To Start</h2>
                <p className="text-slate-600 text-lg">
                  Get started by submitting your information below. One of our specialists will contact you shortly.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Enter your Company Name*
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      required
                      value={formState.companyName}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 text-slate-900 focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-all placeholder:text-slate-400 font-medium"
                      placeholder="Company Name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Enter your First Name*
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      required
                      value={formState.firstName}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 text-slate-900 focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-all placeholder:text-slate-400 font-medium"
                      placeholder="First Name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Enter your Last Name*
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      required
                      value={formState.lastName}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 text-slate-900 focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-all placeholder:text-slate-400 font-medium"
                      placeholder="Last Name"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Enter your Email*
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formState.email}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 text-slate-900 focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-all placeholder:text-slate-400 font-medium"
                      placeholder="name@company.com"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Enter your Phone Number (SMS)*
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formState.phone}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 text-slate-900 focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-all placeholder:text-slate-400 font-medium"
                      placeholder="+1 405-647-3456"
                    />
                    <p className="mt-2 text-xs text-slate-500 font-medium">
                      Provide your phone number to subscribe. For example: +1 405-647-3456
                    </p>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      What are you interested in?*
                    </label>
                    <div className="relative">
                      <select
                        name="interest"
                        value={formState.interest}
                        onChange={handleChange}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 text-slate-900 focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-all appearance-none font-medium cursor-pointer"
                      >
                        <option value="Merchant Accounts">Merchant Accounts</option>
                        <option value="Business Credit">Business Credit</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-brand-50 p-4 rounded-xl border border-brand-100 text-sm text-brand-800 leading-relaxed">
                  We use Brevo as our marketing platform. By clicking below to submit this form, you acknowledge that the information you provided will be transferred to Brevo for processing in accordance with their terms of use.
                </div>

                {/* Bot Protection Mockup */}
                <div className="bg-white p-3 rounded-lg w-fit border border-slate-200 shadow-sm flex items-center gap-3 hover:shadow-md transition-shadow">
                  <div className="w-6 h-6 border-2 border-slate-300 rounded-sm bg-white cursor-pointer hover:border-slate-400 transition-colors" />
                  <span className="text-slate-700 text-sm font-medium">I’m not a robot</span>
                  <div className="ml-2 flex flex-col items-center">
                    <img src="https://www.gstatic.com/recaptcha/api2/logo_48.png" alt="reCAPTCHA" className="w-5 h-5 opacity-70" />
                    <span className="text-[10px] text-slate-500">reCAPTCHA</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-700 hover:to-brand-600 text-white font-bold rounded-xl text-lg transition-all shadow-lg shadow-brand-500/30 hover:shadow-xl hover:shadow-brand-500/40 hover:-translate-y-1 flex items-center justify-center gap-2"
                >
                  Submit
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* 🔵 MAP SECTION */}
      <section id="map" className="h-[500px] relative w-full bg-slate-100 border-t border-slate-200">
        <div className="absolute top-6 left-6 z-10 bg-white/90 backdrop-blur-md px-6 py-4 rounded-2xl shadow-xl border border-white/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brand-100 rounded-full flex items-center justify-center text-brand-600">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <p className="text-slate-900 font-bold text-sm">Our Headquarters</p>
              <p className="text-slate-500 text-xs">Elk Grove, California</p>
            </div>
          </div>
        </div>
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3122.569527666249!2d-121.4191636846617!3d38.42302197964661!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x809ac61a2b2b2b2b%3A0x2b2b2b2b2b2b2b2b!2s9245%20Laguna%20Springs%20Dr%20%23200%2C%20Elk%20Grove%2C%20CA%2095758!5e0!3m2!1sen!2sus!4v1625687452145!5m2!1sen!2sus" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen={true} 
          loading="lazy"
          title="Google Map"
          className="absolute inset-0 w-full h-full grayscale hover:grayscale-0 transition-all duration-700"
        ></iframe>
      </section>

      <Footer />
    </main>
  );
}
