"use client";

import { useEffect, useState, type MouseEvent } from "react";
import { 
  Search, 
  ExternalLink, 
  FileText,
  Video,
  GraduationCap,
  PlayCircle
} from "lucide-react";
import { motion } from "framer-motion";
import CourseViewModal from "@/components/school/CourseViewModal";

interface Course {
  id: number;
  title: string;
  description: string;
  course_url?: string;
  thumbnail_url?: string;
  product_file_url?: string;
  created_at: string;
}

export default function ClientSchoolPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await fetch("/api/school/courses");
      if (res.ok) {
        const data = await res.json();
        setCourses(data);
      } else {
        setError("Failed to load courses");
      }
    } catch {
      setError("Failed to connect to server");
    } finally {
      setLoading(false);
    }
  };

  const handleCourseClick = (course: Course) => {
    setSelectedCourse(course);
  };

  const handleCourseLinkClick = (event: MouseEvent<HTMLButtonElement>, courseUrl?: string) => {
    event.stopPropagation();
    if (courseUrl) {
      window.open(courseUrl, "_blank", "noopener,noreferrer");
    }
  };

  const filteredCourses = courses.filter(c => 
    c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
            Learning Center
            <GraduationCap className="w-8 h-8 text-brand-500" />
          </h1>
          <p className="text-slate-500 mt-1 font-medium">Expand your knowledge with our curated courses.</p>
        </div>
        <div className="relative group w-full md:w-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-brand-500 transition-colors" />
          <input
            type="text"
            placeholder="Find a course..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-72 pl-10 pr-4 py-3 bg-white border border-slate-200 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 rounded-xl text-sm transition-all outline-none shadow-sm"
          />
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 font-medium shadow-sm">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="w-10 h-10 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCourses.map((course) => (
            <motion.div 
              key={course.id}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-xl hover:shadow-brand-900/5 transition-all cursor-pointer group flex flex-col h-full"
              onClick={() => handleCourseClick(course)}
            >
              <div className="relative aspect-video bg-slate-100 overflow-hidden">
                {course.thumbnail_url ? (
                  <img src={course.thumbnail_url} alt={course.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
                    <GraduationCap className="w-12 h-12 text-slate-300" />
                  </div>
                )}
                
                {/* Overlays */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                  {course.course_url ? (
                    <button
                      type="button"
                      onClick={(event) => handleCourseLinkClick(event, course.course_url)}
                      className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all shadow-lg"
                    >
                      <ExternalLink className="w-5 h-5 text-brand-600" />
                    </button>
                  ) : course.product_file_url?.match(/\.(mp4|mov|webm)$/i) ? (
                    <div className="w-12 h-12 bg-brand-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all shadow-lg shadow-brand-600/30">
                      <PlayCircle className="w-6 h-6 text-white" />
                    </div>
                  ) : course.product_file_url ? (
                    <div className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all shadow-lg">
                      <FileText className="w-5 h-5 text-brand-600" />
                    </div>
                  ) : null}
                </div>

                {/* Badges */}
                <div className="absolute top-3 right-3 flex gap-2">
                  {course.product_file_url?.match(/\.(mp4|mov|webm)$/i) && (
                    <span className="px-2 py-1 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider rounded-md flex items-center gap-1">
                      <Video className="w-3 h-3" /> Video
                    </span>
                  )}
                  {course.course_url && (
                    <span className="px-2 py-1 bg-brand-600/90 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider rounded-md flex items-center gap-1 shadow-lg shadow-brand-600/20">
                      Link
                    </span>
                  )}
                </div>
              </div>
              
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="font-bold text-lg text-slate-900 mb-2 line-clamp-2 leading-tight group-hover:text-brand-600 transition-colors">{course.title}</h3>
                <p className="text-slate-500 text-sm line-clamp-3 mb-4 leading-relaxed flex-1">{course.description}</p>
                
                <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between text-xs font-medium text-slate-400">
                  <span>
                    {new Date(course.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                  <span className="group-hover:translate-x-1 transition-transform text-brand-600 flex items-center gap-1">
                    View Details
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
          
          {!filteredCourses.length && (
            <div className="col-span-full py-20 flex flex-col items-center justify-center text-center bg-slate-50 rounded-3xl border border-dashed border-slate-200">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                <GraduationCap className="w-8 h-8 text-slate-300" />
              </div>
              <h3 className="text-slate-900 font-bold text-lg mb-1">No courses available yet</h3>
              <p className="text-slate-500 max-w-sm mx-auto">Check back soon for new educational content and resources.</p>
            </div>
          )}
        </div>
      )}
      <CourseViewModal 
        isOpen={!!selectedCourse}
        onClose={() => setSelectedCourse(null)}
        course={selectedCourse}
      />
    </div>
  );
}
