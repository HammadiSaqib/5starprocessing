"use client";

import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  BookOpen, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle,
  Search
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { blogPosts } from "@/lib/blog-data";

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />

      {/* 🔵 HERO SECTION */}
      <section className="pt-40 pb-20 relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-brand-600/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] bg-brand-400/5 rounded-full blur-[120px]" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-600 text-sm font-semibold mb-6"
            >
              <BookOpen className="w-4 h-4" />
              <span>KNOWLEDGE HUB</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-slate-900"
            >
              5 Star Processing <span className="text-brand-600">– Blog</span>
            </motion.h1>
          </div>
        </div>
      </section>

      {/* 🔵 BLOG INTRO SECTION */}
      <section className="py-12 bg-white border-y border-slate-200">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xl text-slate-600 leading-relaxed mb-8"
          >
            Welcome to the 5 Star Processing Blog — your resource for insights on payment processing, business credit, merchant services, and financial strategies for growing businesses.
          </motion.p>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-500 leading-relaxed"
          >
            Our blog is designed to help business owners make informed decisions, stay compliant, and understand the tools available to improve cash flow, credit strength, and payment efficiency.
          </motion.p>
        </div>
      </section>

      {/* 🔵 BLOG GRID SECTION */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900">Latest Articles & Resources</h2>
            <p className="text-xl text-slate-600">
              Explore our latest articles covering merchant accounts, business credit cards, funding strategies, payment technology, and industry-specific insights. Whether you’re just starting or scaling an established business, our content is created to educate and empower.
            </p>
          </div>

          {blogPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {blogPosts.map((post, i) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-brand-500/30 transition-all group flex flex-col h-full shadow-sm hover:shadow-md"
                >
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image 
                      src={post.image} 
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-brand-600 border border-slate-200">
                      {post.category}
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-brand-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
                      {post.excerpt}
                    </p>
                    <Link 
                      href={`/blog/${post.slug}`} 
                      className="inline-flex items-center text-brand-600 font-bold text-sm hover:text-brand-500 transition-colors mt-auto"
                    >
                      Read More <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
           ) : (
             <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 mb-16">
               <Search className="w-16 h-16 text-slate-300 mx-auto mb-6" />
               <h3 className="text-2xl font-bold text-slate-900 mb-4">No Articles Found</h3>
               <p className="text-slate-600 max-w-md mx-auto">
                We’re currently updating our blog with fresh insights. Please check back soon for the latest articles on payment processing and business growth.
               </p>
             </div>
           )}

          {/* 🔵 PAGINATION SECTION */}
          <div className="flex justify-center items-center gap-2">
            <button className="p-2 text-slate-400 hover:text-brand-600 transition-colors disabled:opacity-50">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 rounded-lg bg-brand-600 text-white font-bold flex items-center justify-center shadow-lg shadow-brand-500/20">
              1
            </button>
            <button className="w-10 h-10 rounded-lg bg-white text-slate-600 hover:bg-slate-50 border border-slate-200 font-bold flex items-center justify-center transition-colors">
              2
            </button>
            <button className="w-10 h-10 rounded-lg bg-white text-slate-600 hover:bg-slate-50 border border-slate-200 font-bold flex items-center justify-center transition-colors">
              3
            </button>
            <span className="text-slate-400 px-2">...</span>
            <button className="w-10 h-10 rounded-lg bg-white text-slate-600 hover:bg-slate-50 border border-slate-200 font-bold flex items-center justify-center transition-colors">
              21
            </button>
            <button className="p-2 text-slate-400 hover:text-brand-600 transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* 🔵 VALUE SECTION */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900">Why Read the 5 Star Processing Blog?</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Our articles are written with business owners in mind. We focus on real-world challenges and practical solutions — not hype or misleading promises.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Topics We Cover</h3>
              <ul className="space-y-4">
                {[
                  "Merchant account comparisons",
                  "Business credit card guides",
                  "Credit-building strategies",
                  "Payment processing trends",
                  "Industry-specific payment solutions",
                  "Compliance-aware financial education"
                ].map((topic, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-600">
                    <CheckCircle className="w-5 h-5 text-brand-500 flex-shrink-0 mt-0.5" />
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-2xl font-bold text-slate-900 mb-6">
                Our goal is to help you navigate payments and credit with confidence.
              </p>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Stay ahead of industry changes and learn how to optimize your financial operations with expert advice from our team.
              </p>
              <div className="p-6 bg-brand-500/5 border border-brand-500/20 rounded-2xl">
                <p className="text-brand-700 font-medium italic">
                  &quot;Knowledge is the key to financial power. Our blog puts that power in your hands.&quot;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🔵 CTA SECTION */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white to-brand-500/5" />
        <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-slate-900">Have Questions or Need Help?</h2>
          <p className="text-xl text-slate-600 mb-10 leading-relaxed">
            If you’d like personalized guidance after reading our articles, our team is ready to help you explore the best solutions for your business.
          </p>
          <Link href="/contact" className="inline-flex items-center px-10 py-5 bg-brand-600 hover:bg-brand-500 text-white rounded-full font-bold text-xl transition-all shadow-lg shadow-brand-500/20 hover:scale-105">
            Contact Us
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
