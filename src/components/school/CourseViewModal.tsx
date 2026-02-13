"use client";
import { useState, useRef } from "react";
import { X, Volume2, VolumeX, Play, Pause, Settings, Maximize, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CourseViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: {
    title: string;
    description: string;
    course_url?: string;
    product_file_url?: string;
  } | null;
}

export default function CourseViewModal({ isOpen, onClose, course }: CourseViewModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showControls, setShowControls] = useState(false);

  const handleClose = () => {
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    onClose();
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
    }
  };

  const handleSpeedChange = (rate: number) => {
    setPlaybackRate(rate);
    if (videoRef.current) {
      videoRef.current.playbackRate = rate;
    }
  };

  const toggleFullscreen = () => {
    if (containerRef.current) {
      if (!document.fullscreenElement) {
        containerRef.current.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    }
  };

  const isVideo = course?.product_file_url?.match(/\.(mp4|mov|webm)$/i);

  return (
    <AnimatePresence>
      {isOpen && course && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-md z-[100]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 m-auto w-full max-w-4xl h-fit max-h-[90vh] bg-white rounded-3xl shadow-2xl z-[101] overflow-hidden flex flex-col"
          >
            <div className="p-4 flex items-center justify-between bg-white/80 border-b border-slate-200 absolute top-0 left-0 right-0 z-10 pointer-events-none">
              <h2 className="text-slate-900 font-bold text-lg pointer-events-auto">{course.title}</h2>
              <button onClick={handleClose} className="p-2 text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-full transition-all pointer-events-auto">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div 
              ref={containerRef}
              className="flex-1 bg-white flex items-center justify-center relative group"
              onMouseEnter={() => setShowControls(true)}
              onMouseLeave={() => setShowControls(false)}
            >
              {isVideo ? (
                <>
                  <video
                    ref={videoRef}
                    src={course.product_file_url}
                    className="max-w-full max-h-[80vh] w-full"
                    onClick={togglePlay}
                    onEnded={() => setIsPlaying(false)}
                  />
                  
                  <div className={`absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-brand-50/90 to-transparent transition-opacity duration-300 ${showControls || !isPlaying ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="flex items-center gap-4">
                      <button 
                        onClick={togglePlay}
                        className="p-3 bg-white text-black rounded-full hover:scale-105 transition-transform"
                      >
                        {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
                      </button>

                      <div className="flex items-center gap-2 group/vol relative">
                        <button onClick={() => {
                          const newVol = volume === 0 ? 1 : 0;
                          setVolume(newVol);
                          if(videoRef.current) videoRef.current.volume = newVol;
                        }} className="text-slate-700 hover:text-brand-600 transition-colors">
                          {volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                        </button>
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.1"
                          value={volume}
                          onChange={handleVolumeChange}
                          className="w-24 accent-brand-500 h-1 bg-slate-200 rounded-full appearance-none cursor-pointer"
                        />
                      </div>

                      <div className="ml-auto flex items-center gap-2">
                         <div className="relative group/speed">
                           <button className="flex items-center gap-1 px-3 py-1.5 bg-brand-100 hover:bg-brand-200 rounded-lg text-slate-900 text-sm font-medium transition-colors">
                             <Settings className="w-4 h-4" />
                             {playbackRate}x
                           </button>
                           <div className="absolute bottom-full right-0 mb-2 p-1 bg-white border border-slate-200 rounded-xl shadow-xl opacity-0 group-hover/speed:opacity-100 invisible group-hover/speed:visible transition-all flex flex-col gap-1 min-w-[100px]">
                             {[0.5, 0.75, 1, 1.25, 1.5, 2].map(rate => (
                               <button
                                 key={rate}
                                 onClick={() => handleSpeedChange(rate)}
                                 className={`px-3 py-2 text-left text-sm rounded-lg hover:bg-slate-100 transition-colors ${playbackRate === rate ? 'text-brand-600 font-bold' : 'text-slate-700'}`}
                               >
                                 {rate}x Speed
                               </button>
                             ))}
                           </div>
                         </div>
                         
                         <button 
                           onClick={toggleFullscreen}
                           className="p-2 text-slate-700 hover:text-brand-600 transition-colors"
                         >
                           <Maximize className="w-5 h-5" />
                         </button>
                      </div>
                    </div>
                  </div>
                </>
              ) : course.product_file_url ? (
                <div className="text-slate-900 text-center p-10">
                  <a 
                    href={course.product_file_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-brand-600 text-white rounded-xl font-bold hover:bg-brand-700 transition-colors inline-flex items-center gap-2"
                  >
                    Download / View Resource
                  </a>
                </div>
              ) : (
                <div className="text-slate-500 italic">No media content</div>
              )}
            </div>
            
            <div className="p-6 bg-white text-slate-700 flex items-start justify-between gap-6 border-t border-slate-200">
              <div>
                <h3 className="text-slate-900 font-bold text-lg mb-2">Description</h3>
                <p className="leading-relaxed">{course.description}</p>
              </div>
              
              {course.course_url && (
                <a 
                  href={course.course_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white rounded-xl font-semibold transition-colors flex items-center gap-2 text-sm"
                >
                  <ExternalLink className="w-4 h-4" />
                  Visit Link
                </a>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
