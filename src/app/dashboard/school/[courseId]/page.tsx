"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  Loader2, 
  ArrowLeft, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Settings, 
  Maximize, 
  CheckCircle,
  Clock,
  FileText,
  Download
} from "lucide-react";
import Link from "next/link";

interface CourseVideo {
  id: number;
  title: string;
  video_url: string;
  position: number;
}

interface Course {
  id: number;
  title: string;
  description: string;
  course_url?: string;
  thumbnail_url?: string;
  product_file_url?: string;
  videos?: CourseVideo[];
}

export default function CoursePlayerPage() {
  const params = useParams();
  const router = useRouter();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeVideo, setActiveVideo] = useState<CourseVideo | null>(null);
  
  // Video player state
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showControls, setShowControls] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (params?.courseId) {
      fetchCourse(params.courseId as string);
    }
  }, [params]);

  const fetchCourse = async (id: string) => {
    try {
      const res = await fetch(`/api/school/courses/${id}`);
      if (res.ok) {
        const data = await res.json();
        setCourse(data);
        // Set initial video (either first in playlist or the main product file if it's a video)
        if (data.videos && data.videos.length > 0) {
          setActiveVideo(data.videos[0]);
        }
      } else {
        setError("Failed to load course");
      }
    } catch {
      setError("Failed to connect to server");
    } finally {
      setLoading(false);
    }
  };

  // Video Controls Logic
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume;
      videoRef.current.playbackRate = playbackRate;
    }
  }, [volume, playbackRate, activeVideo]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const total = videoRef.current.duration;
      setProgress((current / total) * 100);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    if (videoRef.current) {
      const time = (val / 100) * videoRef.current.duration;
      videoRef.current.currentTime = time;
      setProgress(val);
    }
  };

  const toggleFullscreen = () => {
    if (containerRef.current) {
      if (!document.fullscreenElement) containerRef.current.requestFullscreen();
      else document.exitFullscreen();
    }
  };

  const currentVideoUrl = activeVideo?.video_url || 
    (course?.product_file_url?.match(/\.(mp4|mov|webm)$/i) ? course.product_file_url : null);

  const isMainFileVideo = course?.product_file_url?.match(/\.(mp4|mov|webm)$/i);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <Loader2 className="w-10 h-10 animate-spin text-brand-600" />
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-slate-50 gap-4">
        <div className="p-4 bg-red-50 text-red-600 rounded-xl border border-red-200">
          {error || "Course not found"}
        </div>
        <Link href="/dashboard/school" className="text-brand-600 hover:underline flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to School
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col md:flex-row overflow-hidden">
      {/* Main Content Area - Player */}
      <div className="flex-1 flex flex-col h-screen overflow-y-auto">
        <div className="p-4 flex items-center gap-4 bg-white/80 border-b border-slate-200">
          <Link href="/dashboard/school" className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="font-bold text-lg">{course.title}</h1>
            <p className="text-xs text-slate-400">
              {activeVideo ? activeVideo.title : (isMainFileVideo ? "Main Course Video" : "Course Content")}
            </p>
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          {currentVideoUrl ? (
            <div 
              ref={containerRef}
              className="relative bg-white flex-1 flex items-center justify-center group w-full max-h-[70vh] md:max-h-none aspect-video md:aspect-auto"
              onMouseEnter={() => setShowControls(true)}
              onMouseLeave={() => setShowControls(false)}
            >
              <video
                ref={videoRef}
                src={currentVideoUrl}
                className="w-full h-full object-contain"
                onClick={togglePlay}
                onTimeUpdate={handleTimeUpdate}
                onEnded={() => setIsPlaying(false)}
              />
              
              {/* Controls Overlay */}
              <div className={`absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-brand-50/90 to-transparent transition-opacity duration-300 ${showControls || !isPlaying ? 'opacity-100' : 'opacity-0'}`}>
                {/* Progress Bar */}
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={progress}
                  onChange={handleSeek}
                  className="w-full h-1 bg-slate-200 rounded-full appearance-none cursor-pointer accent-brand-500 mb-4 hover:h-2 transition-all"
                />
                
                <div className="flex items-center gap-4">
                  <button onClick={togglePlay} className="p-2 hover:bg-white/20 rounded-full transition-colors">
                    {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current" />}
                  </button>

                  <div className="flex items-center gap-2 group/vol relative">
                    <button onClick={() => setVolume(v => v === 0 ? 1 : 0)} className="text-slate-700 hover:text-brand-600">
                      {volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={volume}
                      onChange={(e) => setVolume(parseFloat(e.target.value))}
                      className="w-20 h-1 bg-slate-200 rounded-full appearance-none cursor-pointer accent-brand-500"
                    />
                  </div>

                  <div className="ml-auto flex items-center gap-3">
                    <div className="relative group/speed">
                      <button className="text-xs font-bold px-2 py-1 bg-brand-100 rounded hover:bg-brand-200 text-slate-900">
                        {playbackRate}x
                      </button>
                      <div className="absolute bottom-full right-0 mb-2 bg-white rounded-lg overflow-hidden border border-slate-200 hidden group-hover/speed:block min-w-[80px]">
                        {[0.5, 1, 1.25, 1.5, 2].map(r => (
                          <button
                            key={r}
                            onClick={() => setPlaybackRate(r)}
                            className={`block w-full px-3 py-2 text-xs text-left hover:bg-slate-100 ${playbackRate === r ? 'text-brand-600' : 'text-slate-700'}`}
                          >
                            {r}x
                          </button>
                        ))}
                      </div>
                    </div>
                    <button onClick={toggleFullscreen} className="text-slate-700 hover:text-brand-600">
                      <Maximize className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center bg-white p-8 text-center">
              <FileText className="w-16 h-16 text-slate-700 mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">Non-Video Content</h3>
              <p className="text-slate-600 max-w-md mb-6">
                This course content is not a video. You can download or view the file below.
              </p>
              {course.product_file_url && (
                <a 
                  href={course.product_file_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-brand-600 hover:bg-brand-500 text-white rounded-xl font-bold transition-all flex items-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Download Resource
                </a>
              )}
            </div>
          )}

          {/* Description Area */}
          <div className="p-6 md:p-8 max-w-4xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">About this course</h2>
              {course.course_url && (
                <a 
                  href={course.course_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white rounded-xl font-semibold transition-colors flex items-center gap-2 text-sm"
                >
                  <FileText className="w-4 h-4" />
                  Visit Link
                </a>
              )}
            </div>
            <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">
              {course.description}
            </p>
          </div>
        </div>
      </div>

      {/* Playlist Sidebar */}
      <div className="w-full md:w-96 bg-white border-l border-slate-200 flex flex-col h-[40vh] md:h-screen">
        <div className="p-4 border-b border-slate-200 bg-white sticky top-0 z-10">
          <h3 className="font-bold text-slate-900 flex items-center gap-2">
            <Clock className="w-4 h-4 text-brand-500" />
            Course Content
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            {course.videos?.length || 0} lessons
          </p>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-1">
          {/* Main Video Item (if exists and hasn't been added to videos list manually) */}
          {isMainFileVideo && (
            <button
              onClick={() => setActiveVideo(null)} // Null means main video
              className={`w-full text-left p-3 rounded-xl transition-all flex gap-3 group ${
                !activeVideo ? 'bg-brand-50 border border-brand-200' : 'hover:bg-slate-50 border border-transparent'
              }`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                !activeVideo ? 'bg-brand-500 text-white' : 'bg-slate-100 text-slate-600'
              }`}>
                0
              </div>
              <div className="min-w-0">
                <p className={`text-sm font-medium truncate ${!activeVideo ? 'text-brand-700' : 'text-slate-700 group-hover:text-slate-900'}`}>
                  Introduction
                </p>
                <p className="text-[10px] text-slate-500 truncate">Main Course Video</p>
              </div>
              {!activeVideo && <div className="ml-auto self-center w-2 h-2 rounded-full bg-brand-500 animate-pulse" />}
            </button>
          )}

          {course.videos?.map((video, idx) => {
            const isActive = activeVideo?.id === video.id;
            return (
              <button
                key={video.id}
                onClick={() => setActiveVideo(video)}
                className={`w-full text-left p-3 rounded-xl transition-all flex gap-3 group ${
                  isActive ? 'bg-brand-50 border border-brand-200' : 'hover:bg-slate-50 border border-transparent'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                  isActive ? 'bg-brand-500 text-white' : 'bg-slate-100 text-slate-600'
                }`}>
                  {idx + 1}
                </div>
                <div className="min-w-0">
                  <p className={`text-sm font-medium truncate ${isActive ? 'text-brand-700' : 'text-slate-700 group-hover:text-slate-900'}`}>
                    {video.title}
                  </p>
                  <p className="text-[10px] text-slate-500 truncate">Video Lesson</p>
                </div>
                {isActive && <div className="ml-auto self-center w-2 h-2 rounded-full bg-brand-500 animate-pulse" />}
              </button>
            );
          })}

          {(!course.videos || course.videos.length === 0) && !isMainFileVideo && (
            <div className="p-8 text-center text-slate-500 text-sm">
              No video content available in playlist.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
