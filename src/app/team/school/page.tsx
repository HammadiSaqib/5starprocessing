"use client";

import { useEffect, useState } from "react";
import { 
  Search, 
  Bell, 
  Plus, 
  Edit, 
  ExternalLink, 
  FileText,
  Video,
  Image as ImageIcon
} from "lucide-react";
import CourseModal from "@/components/school/CourseModal";
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

export default function TeamSchoolPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
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

  const filteredCourses = courses.filter(c => 
    c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <header className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">School Management</h1>
          <p className="text-slate-500 mt-1">Manage educational content and resources.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative group hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-brand-500 transition-colors" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white border border-slate-200 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 rounded-xl text-sm w-64 transition-all outline-none"
            />
          </div>
          <button
            onClick={() => { setEditingCourse(null); setIsModalOpen(true); }}
            className="px-4 py-2 bg-brand-600 text-white rounded-xl font-semibold shadow-lg shadow-brand-500/20 hover:bg-brand-700 transition-all flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Course
          </button>
        </div>
      </header>

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
                <div 
                  key={course.id} 
                  className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-all group flex flex-col cursor-pointer"
                  onClick={() => setSelectedCourse(course)}
                >
              <div className="relative h-48 bg-slate-100 overflow-hidden">
                {course.thumbnail_url ? (
                  <img src={course.thumbnail_url} alt={course.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400 bg-slate-50">
                    <ImageIcon className="w-12 h-12 opacity-20" />
                  </div>
                )}
                <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none group-hover:pointer-events-auto">
                  <button 
                    onClick={(e) => { e.stopPropagation(); setEditingCourse(course); setIsModalOpen(true); }}
                    className="p-2 bg-white/90 backdrop-blur-sm text-slate-600 rounded-lg hover:text-brand-600 shadow-sm transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="font-bold text-lg text-slate-900 mb-2 line-clamp-1">{course.title}</h3>
                <p className="text-slate-500 text-sm line-clamp-3 mb-4 flex-1">{course.description}</p>
                
                <div className="flex items-center gap-3 mt-auto pt-4 border-t border-slate-50">
                  {course.course_url && (
                    <a href={course.course_url} target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-brand-600 flex items-center gap-1 hover:underline">
                      <ExternalLink className="w-3.5 h-3.5" /> External Link
                    </a>
                  )}
                  {course.product_file_url && (
                    <span className="text-xs font-medium text-slate-500 flex items-center gap-1 ml-auto">
                      {course.product_file_url.match(/\.(mp4|mov|webm)$/i) ? <Video className="w-3.5 h-3.5" /> : <FileText className="w-3.5 h-3.5" />}
                      Resource
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {!filteredCourses.length && (
            <div className="col-span-full py-12 text-center text-slate-400">
              No courses found.
            </div>
          )}
        </div>
      )}

      <CourseModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchCourses}
        initialData={editingCourse}
      />
      <CourseViewModal
        isOpen={!!selectedCourse}
        onClose={() => setSelectedCourse(null)}
        course={selectedCourse}
      />
    </div>
  );
}
