"use client";

import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  Calendar, 
  User, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Share2,
  CheckCircle,
  XCircle,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useParams, notFound } from "next/navigation";
import { blogPosts } from "@/lib/blog-data";

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return (
      <main className="min-h-screen bg-slate-950 text-white flex flex-col">
        <Navbar />
        <div className="flex-grow flex flex-col items-center justify-center p-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Blog Post Not Found</h1>
          <p className="text-slate-400 mb-8">The article you are looking for does not exist.</p>
          <Link href="/blog" className="text-blue-500 hover:text-blue-400 flex items-center gap-2">
            <ChevronLeft className="w-4 h-4" /> Back to Blog
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      {/* 🔵 HERO SECTION */}
      <section className="pt-40 pb-20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px]" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-semibold mb-6">
              <span>{post.category}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {post.title}
            </h1>
            <div className="flex items-center justify-center gap-6 text-slate-400 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>By 5 Star Processing</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🔵 CONTENT SECTION */}
      <section className="py-12 bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
            
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Featured Image */}
              <div className="relative h-[400px] w-full rounded-3xl overflow-hidden mb-12 border border-slate-800">
                <Image 
                  src={post.image} 
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Intro */}
              <div className="prose prose-invert prose-lg max-w-none mb-12">
                <p className="text-xl text-slate-300 leading-relaxed">
                  {post.content.intro}
                </p>
              </div>

              {/* Sections */}
              <div className="space-y-16">
                {post.content.sections.map((section, idx) => (
                  <div key={idx}>
                    <h2 className="text-3xl font-bold text-white mb-6">{section.heading}</h2>
                    {section.content && (
                      <p className="text-slate-400 leading-relaxed mb-6 text-lg">
                        {section.content}
                      </p>
                    )}
                    
                    {/* List Items */}
                    {section.listItems && (
                      <ul className="space-y-4 mb-8">
                        {section.listItems.map((item, i) => (
                          <li key={i} className="flex items-start gap-3 text-slate-300">
                            <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-1" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Subsections (for comparisons etc) */}
                    {section.subsections && (
                      <div className="space-y-12 mt-8">
                        {section.subsections.map((sub, sIdx) => (
                          <div key={sIdx} className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800">
                            <h3 className="text-2xl font-bold text-white mb-4">{sub.title}</h3>
                            <p className="text-slate-400 mb-6">{sub.content}</p>
                            
                            <div className="grid md:grid-cols-2 gap-8">
                              {sub.pros && (
                                <div>
                                  <h4 className="text-green-400 font-bold mb-4 flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4" /> Pros
                                  </h4>
                                  <ul className="space-y-2">
                                    {sub.pros.map((pro, pIdx) => (
                                      <li key={pIdx} className="text-sm text-slate-300 flex items-start gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                                        {pro}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                              
                              {sub.cons && (
                                <div>
                                  <h4 className="text-red-400 font-bold mb-4 flex items-center gap-2">
                                    <XCircle className="w-4 h-4" /> Cons
                                  </h4>
                                  <ul className="space-y-2">
                                    {sub.cons.map((con, cIdx) => (
                                      <li key={cIdx} className="text-sm text-slate-300 flex items-start gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                                        {con}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Conclusion */}
              <div className="mt-16 bg-blue-900/10 border-l-4 border-blue-500 p-8 rounded-r-xl">
                <h3 className="text-2xl font-bold text-white mb-4">Conclusion</h3>
                <p className="text-slate-300 leading-relaxed">
                  {post.content.conclusion}
                </p>
              </div>

              {/* Post Navigation */}
              <div className="mt-16 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between gap-6">
                <Link href="#" className="flex-1 p-6 rounded-xl bg-slate-900 border border-slate-800 hover:border-blue-500/30 transition-colors group">
                  <span className="text-xs text-slate-500 uppercase tracking-wider mb-2 block">Previous Article</span>
                  <div className="flex items-center gap-2 text-slate-300 group-hover:text-blue-400 font-bold">
                    <ChevronLeft className="w-4 h-4" />
                    Benefits of Business Credit Card Balance Transfers
                  </div>
                </Link>
                <Link href="#" className="flex-1 p-6 rounded-xl bg-slate-900 border border-slate-800 hover:border-blue-500/30 transition-colors group text-right">
                  <span className="text-xs text-slate-500 uppercase tracking-wider mb-2 block">Next Article</span>
                  <div className="flex items-center justify-end gap-2 text-slate-300 group-hover:text-blue-400 font-bold">
                    Applying for a Business Credit Card
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </Link>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-8">
                
                {/* Contact Form Card */}
                <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
                  <h3 className="text-xl font-bold text-white mb-6">Send Us a Message</h3>
                  <form className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Company Name</label>
                      <input 
                        type="text" 
                        placeholder="Enter Your Company Name"
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Email Address</label>
                      <input 
                        type="email" 
                        placeholder="Enter Your Email Address"
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Phone Number</label>
                      <input 
                        type="tel" 
                        placeholder="Enter Your Phone Number"
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>
                    <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl transition-colors">
                      Submit
                    </button>
                  </form>
                </div>

                {/* Share Card */}
                <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <Share2 className="w-5 h-5 text-blue-500" /> Share
                  </h3>
                  <div className="flex gap-4">
                    <button className="flex-1 py-3 bg-slate-950 border border-slate-800 rounded-lg text-slate-400 hover:text-white hover:border-blue-500/50 transition-colors flex justify-center">
                      <Facebook className="w-5 h-5" />
                    </button>
                    <button className="flex-1 py-3 bg-slate-950 border border-slate-800 rounded-lg text-slate-400 hover:text-white hover:border-blue-500/50 transition-colors flex justify-center">
                      <Twitter className="w-5 h-5" />
                    </button>
                    <button className="flex-1 py-3 bg-slate-950 border border-slate-800 rounded-lg text-slate-400 hover:text-white hover:border-blue-500/50 transition-colors flex justify-center">
                      <Linkedin className="w-5 h-5" />
                    </button>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
