"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Play, 
  Lock, 
  CheckCircle2, 
  ArrowRight, 
  Clock, 
  ShieldAlert, 
  GraduationCap,
  Unlock,
  Check
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function VideoGate() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [percent, setPercent] = useState(0);
  const [maxPercent, setMaxPercent] = useState(0);
  const [initialPercent, setInitialPercent] = useState(0);
  const [saving, setSaving] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const [hasCompleted, setHasCompleted] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/portal/video-progress?videoId=industry");
        if (res.ok) {
          const data = await res.json();
          const p = Math.min(100, Math.max(0, Math.floor(Number(data.percent || 0))));
          setPercent(p);
          setMaxPercent(p);
          setInitialPercent(p);
          if (p >= 90) setHasCompleted(true);
        }
      } catch {}
    })();
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onLoaded = () => {
      const startTime = (initialPercent / 100) * (v.duration || 0);
      if (!isNaN(startTime) && isFinite(startTime)) {
        v.currentTime = startTime;
      }
    };
    const onTime = () => {
      const p = Math.floor(((v.currentTime || 0) / (v.duration || 1)) * 100);
      setPercent(p);
      setMaxPercent((prev) => Math.max(prev, p));
      if (p >= 90) setHasCompleted(true);
    };
    const onSeeking = () => {
      const allowedTime = (maxPercent / 100) * (v.duration || 0);
      if ((v.currentTime || 0) > allowedTime + 0.2) {
        v.currentTime = allowedTime;
      }
    };
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    v.addEventListener("loadedmetadata", onLoaded);
    v.addEventListener("timeupdate", onTime);
    v.addEventListener("seeking", onSeeking);
    v.addEventListener("play", onPlay);
    v.addEventListener("pause", onPause);
    
    return () => {
      v.removeEventListener("loadedmetadata", onLoaded);
      v.removeEventListener("timeupdate", onTime);
      v.removeEventListener("seeking", onSeeking);
      v.removeEventListener("play", onPlay);
      v.removeEventListener("pause", onPause);
    };
  }, [initialPercent, maxPercent]);

  useEffect(() => {
    const send = async () => {
      setSaving(true);
      try {
        await fetch("/api/portal/video-progress", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ videoId: "industry", percent }),
        });
      } finally {
        setSaving(false);
      }
    };
    send();
  }, [percent]);

  const canProceed = hasCompleted || percent >= 90;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring" as const, stiffness: 40 } }
  };

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4 md:p-8 font-sans overflow-hidden">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-brand-200/20 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-200/20 rounded-full blur-[100px] animate-pulse animation-delay-2000"></div>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-5xl bg-white/80 backdrop-blur-xl border border-white/40 shadow-2xl shadow-slate-200/50 rounded-[2.5rem] overflow-hidden relative z-10 flex flex-col lg:flex-row"
      >
        
        {/* Left Side - Video Player */}
        <div className="w-full lg:w-2/3 p-6 md:p-10 flex flex-col gap-6">
          <motion.div variants={itemVariants} className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-50 flex items-center justify-center border border-brand-100 shadow-sm">
              <GraduationCap className="w-6 h-6 text-brand-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Mandatory Education</h1>
              <p className="text-slate-500 font-medium">Step 2 of 3 • Industry Standards</p>
            </div>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="relative rounded-3xl overflow-hidden bg-slate-950 shadow-2xl shadow-slate-900/20 border border-slate-800 aspect-video group"
          >
            <video
              ref={videoRef}
              controls
              playsInline
              controlsList="nodownload noplaybackrate"
              className="w-full h-full object-cover"
              onContextMenu={(e) => e.preventDefault()}
            >
              <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
            </video>
            
            {/* Custom overlay when not playing and not started */}
            {!isPlaying && percent === 0 && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity group-hover:bg-black/30 pointer-events-none">
                <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-2xl animate-pulse">
                  <Play className="w-8 h-8 text-white fill-white ml-1" />
                </div>
              </div>
            )}
          </motion.div>

          <motion.div variants={itemVariants} className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
            <div className="flex items-center gap-3 mb-3">
               <ShieldAlert className="w-5 h-5 text-amber-500" />
               <span className="font-semibold text-slate-700 text-sm">Important Note</span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed">
              This video contains critical compliance information required for your application. 
              The &quot;Continue&quot; button will unlock automatically once you have watched at least 90% of the content.
            </p>
          </motion.div>
        </div>

        {/* Right Side - Progress & Action */}
        <div className="w-full lg:w-1/3 bg-slate-50/50 border-l border-white/50 p-6 md:p-10 flex flex-col justify-between relative">
          
          <div className="space-y-8">
            <motion.div variants={itemVariants}>
              <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Clock className="w-5 h-5 text-brand-500" />
                Progress Tracker
              </h2>

              <div className="relative pt-4 pb-8">
                <div className="flex justify-between text-sm font-bold mb-3">
                  <span className="text-slate-500">Completion</span>
                  <span className={canProceed ? "text-emerald-600" : "text-brand-600"}>
                    {percent}%
                  </span>
                </div>
                
                {/* Custom Progress Bar */}
                <div className="h-4 bg-slate-200 rounded-full overflow-hidden shadow-inner relative">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${percent}%` }}
                    transition={{ type: "spring", stiffness: 50 }}
                    className={`h-full rounded-full relative overflow-hidden ${
                      canProceed 
                        ? "bg-gradient-to-r from-emerald-500 to-emerald-400" 
                        : "bg-gradient-to-r from-brand-600 to-brand-400"
                    }`}
                  >
                    <div className="absolute inset-0 bg-white/20 animate-[shimmer_2s_infinite] skew-x-12"></div>
                  </motion.div>
                </div>

                <AnimatePresence>
                  {canProceed && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute bottom-0 right-0 flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-100"
                    >
                      <Check className="w-3 h-3" /> Ready to proceed
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-4">
               <div className={`p-4 rounded-xl border transition-all duration-300 ${canProceed ? "bg-emerald-50 border-emerald-100" : "bg-white border-slate-100 opacity-50 grayscale"}`}>
                 <div className="flex gap-3">
                   <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${canProceed ? "bg-emerald-100 text-emerald-600" : "bg-slate-100 text-slate-400"}`}>
                     <span className="text-xs font-bold">1</span>
                   </div>
                   <div>
                     <p className={`text-sm font-semibold ${canProceed ? "text-emerald-900" : "text-slate-900"}`}>Video Completed</p>
                     <p className="text-xs text-slate-500">Requirement met</p>
                   </div>
                 </div>
               </div>
               
               <div className={`p-4 rounded-xl border transition-all duration-300 ${canProceed ? "bg-white border-slate-200 shadow-sm" : "bg-slate-100 border-slate-200"}`}>
                 <div className="flex gap-3">
                   <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${canProceed ? "bg-brand-100 text-brand-600" : "bg-slate-200 text-slate-400"}`}>
                     <span className="text-xs font-bold">2</span>
                   </div>
                   <div>
                     <p className={`text-sm font-semibold ${canProceed ? "text-slate-900" : "text-slate-500"}`}>Next Step</p>
                     <p className="text-xs text-slate-500">Application Form</p>
                   </div>
                 </div>
               </div>
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="mt-8 lg:mt-0">
            <button
              disabled={!canProceed}
              onClick={() => router.push("/portal/application")}
              className={`w-full relative overflow-hidden rounded-2xl py-5 font-bold text-lg shadow-xl transition-all duration-300 flex items-center justify-center gap-3 group ${
                canProceed 
                  ? "bg-brand-600 hover:bg-brand-700 text-white shadow-brand-500/30 hover:shadow-brand-500/50 hover:-translate-y-1" 
                  : "bg-slate-100 text-slate-400 cursor-not-allowed shadow-none border border-slate-200"
              }`}
            >
              {canProceed ? (
                <>
                  <span className="relative z-10 font-extrabold tracking-wide uppercase text-sm">Continue Application</span>
                  <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                </>
              ) : (
                <>
                  <Lock className="w-5 h-5" />
                  <span>Locked</span>
                </>
              )}
            </button>
            {!canProceed && (
               <p className="text-xs text-center text-slate-400 mt-4 font-medium">
                 Complete the video to unlock
               </p>
            )}
          </motion.div>
          
        </div>

      </motion.div>
    </main>
  );
}
