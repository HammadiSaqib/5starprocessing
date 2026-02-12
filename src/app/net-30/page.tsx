"use client";

import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { motion } from "framer-motion";
import { 
  Calendar, 
  ArrowRight, 
  Briefcase,
  CreditCard,
  BookOpen,
  Megaphone,
  Layout,
  Tag,
  Play,
  CheckCircle,
  Star,
  Users
} from "lucide-react";
import Link from "next/link";

export default function Net30Page() {
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
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/80 to-slate-900/60" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-bold mb-8 shadow-lg"
            >
              <Calendar className="w-4 h-4 text-brand-400" />
              <span>Net 30</span>
            </motion.div>
            
            <motion.h1 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight tracking-tight drop-shadow-xl"
            >
              Net 30
            </motion.h1>
          </div>
        </div>
      </section>

      {/* 🔵 WHAT ARE NET 30 ACCOUNTS SECTION */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="relative order-2 lg:order-1"
            >
              <div className="absolute -top-10 -left-10 w-32 h-32 bg-brand-100 rounded-full blur-3xl opacity-50" />
              <div className="relative z-10 bg-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl border border-slate-100">
                <div className="w-16 h-16 bg-brand-100 rounded-2xl flex items-center justify-center mb-8 text-brand-600">
                  <CreditCard className="w-8 h-8" />
                </div>
                <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                  What Are Net 30 Accounts?
                </h2>
                <div className="space-y-6 text-lg text-slate-600 leading-relaxed mb-10">
                  <p>
                    Net 30 accounts, also known as vendor credit, trade credit, or supplier credit, are accounts that allow you to make business purchases, then invoice you to pay the bill in full within 30 days. Essentially, net 30 accounts allow you to buy now and pay later based on a 30-day term. Vendors then report your payments to business credit bureaus, which helps to build your business credit score as long as you make your payments on time.
                  </p>
                  <p>
                    Net 30 account providers can offer a variety of business products and services, including credit cards linked to your business account, office supplies and equipment, marketing services, financial tools, and more. However, it’s important to understand that approval requirements vary between each provider.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/signup" className="inline-flex items-center text-brand-600 font-bold hover:text-brand-700 text-lg group">
                    Get Started 
                    <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ delay: 0.2 }}
              className="relative order-1 lg:order-2"
            >
              <div className="relative h-[600px] rounded-[2.5rem] overflow-hidden shadow-2xl group">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: "url('https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-10">
                  <div className="flex items-center gap-4 text-white mb-4">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                      <CheckCircle className="w-6 h-6" />
                    </div>
                    <span className="text-xl font-bold">Build Credit Fast</span>
                  </div>
                  <p className="text-slate-200 leading-relaxed">
                    Start building your business credit history with reliable reporting.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 🔵 WHY CHOOSE A NET 30 ACCOUNT WITH 5 STAR PROCESSING SECTION */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-50/50 rounded-full blur-3xl mix-blend-multiply opacity-70" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-50/50 rounded-full blur-3xl mix-blend-multiply opacity-70" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="lg:w-1/2"
            >
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')" }}
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-900/80 to-transparent mix-blend-multiply" />
                <div className="relative z-10 p-12 h-[500px] flex flex-col justify-end">
                  <h3 className="text-3xl font-bold text-white mb-4">Partner in Your Growth</h3>
                  <p className="text-brand-100 text-lg">We provide the tools you need to succeed, not just a service.</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ delay: 0.2 }}
              className="lg:w-1/2"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-100 text-brand-700 text-sm font-bold mb-6">
                <Star className="w-4 h-4" />
                <span>Why Choose Us?</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-8 leading-tight">
                Why Choose a Net 30 Account With 5 Star Processing?
              </h2>
              <div className="space-y-6 text-lg text-slate-600 leading-relaxed mb-10">
                <p>
                  What makes us the easiest Net 30 provider around? First of all, with 5 Star Processing, you are purchasing something you will actually use. Our products are essential financial tools that directly help to build businesses. Other Net 30 accounts require large dollar purchases for a minimum of 3 months just to do your first reporting. Instead, we report your payment history on a monthly basis from the start.
                </p>
                <p>
                  With your monthly subscription to our Perks Portal, your payments automatically get reported to business credit bureaus, while you get the benefit of saving time and money with access to our resources that you are already hunting for. Subscribe with us today and let your business credit build itself.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact" className="inline-flex items-center justify-center px-8 py-4 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-bold text-lg transition-all hover:shadow-lg hover:shadow-brand-500/20 hover:-translate-y-1">
                  Contact Us
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 🔵 WHAT’S INCLUDED IN THE PERKS PORTAL SECTION */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-3xl md:text-5xl font-bold text-slate-900 mb-8"
            >
              What’s Included in the Perks Portal
            </motion.h2>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ delay: 0.1 }}
              className="bg-slate-900 rounded-[2rem] overflow-hidden shadow-2xl max-w-4xl mx-auto relative aspect-video flex items-center justify-center group cursor-pointer"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-60 group-hover:opacity-40 transition-opacity duration-500"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')" }}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-brand-600/40 to-slate-900/80 z-10" />
              <div className="relative z-20 flex flex-col items-center gap-6 p-8 text-center">
                <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-110 transition-transform border border-white/20 shadow-lg shadow-black/20">
                  <Play className="w-8 h-8 text-white fill-white ml-1" />
                </div>
                <p className="text-white text-xl md:text-2xl font-bold px-4 drop-shadow-lg max-w-2xl">
                  Check out this video for a quick overview of what your Perks Portal looks like!
                </p>
              </div>
            </motion.div>
          </div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              {
                title: "Business Credit Tools",
                desc: "The Perks Portal is designed to provide you with as many resources as possible to help build your business credit.",
                icon: Briefcase,
                color: "text-brand-600",
                bg: "bg-brand-50"
              },
              {
                title: "Business Funding Options",
                desc: "Get access to around 70 different business lenders simply by signing up with us.",
                icon: CreditCard,
                color: "text-brand-600",
                bg: "bg-brand-50"
              },
              {
                title: "Financial E-Courses",
                desc: "Our educational resources for businesses include a Financial Literacy E-course with all the top methods to grow your business and build your reputation.",
                icon: BookOpen,
                color: "text-brand-600",
                bg: "bg-brand-50"
              },
              {
                title: "Sales & Marketing Products",
                desc: "Among our sales and marketing products that you can opt into is our Rocket Review Tool, which optimizes your online feedback for 5-star reviews.",
                icon: Megaphone,
                color: "text-brand-600",
                bg: "bg-brand-50"
              },
              {
                title: "Website Design Solutions",
                desc: "Part of having a reputable business in today’s landscape is having a well-designed and informative website. We can help you with that, too.",
                icon: Layout,
                color: "text-brand-600",
                bg: "bg-brand-50"
              },
              {
                title: "Business Product Discounts",
                desc: "We offer a variety of different business credit-building products and services. By going through us for some of your supplies and equipment.",
                icon: Tag,
                color: "text-brand-600",
                bg: "bg-brand-50"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-lg hover:shadow-2xl hover:shadow-brand-500/10 transition-all duration-300 group flex flex-col relative overflow-hidden"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 ${item.bg} rounded-full blur-3xl opacity-50 -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-700`} />
                <div className={`w-14 h-14 ${item.bg} rounded-2xl flex items-center justify-center ${item.color} mb-6 group-hover:scale-110 transition-transform duration-300 relative z-10`}>
                  <item.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4 relative z-10">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed flex-grow relative z-10">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 🔵 ASK US ANYTHING SECTION */}
      <section className="py-24 bg-slate-50 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="bg-white rounded-[3rem] p-12 shadow-xl border border-slate-100 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-400 via-brand-600 to-brand-400" />
              <div className="w-20 h-20 bg-brand-50 rounded-full flex items-center justify-center mx-auto mb-8 text-brand-600">
                <Users className="w-10 h-10" />
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
                Ask Us Anything
              </h2>
              <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
                Have questions about Net 30 accounts or how to build your business credit? We&apos;re here to help you every step of the way.
              </p>
              <Link href="/contact" className="inline-flex items-center justify-center px-10 py-5 bg-brand-600 hover:bg-brand-700 text-white rounded-full font-bold text-lg transition-all hover:shadow-lg hover:shadow-brand-500/20 hover:-translate-y-1">
                Contact Support
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
