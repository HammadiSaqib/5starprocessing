"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, 
  Search, 
  Bell, 
  Plus, 
  MoreVertical, 
  Edit, 
  Trash2, 
  ExternalLink, 
  FileText,
  Video,
  Image as ImageIcon
} from "lucide-react";
import AdminSidebar from "@/app/admin/_components/AdminSidebar";
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

export default function AdminSchoolPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [viewCourse, setViewCourse] = useState<Course | null>(null);

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

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this course?")) return;
    try {
      const res = await fetch(`/api/school/courses/${id}`, { method: "DELETE" });
      if (res.ok) {
        setCourses(prev => prev.filter(c => c.id !== id));
      } else {
        alert("Failed to delete course");
      }
    } catch {
      alert("Error deleting course");
    }
  };

  const filteredCourses = courses.filter(c => 
    c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900 overflow-hidden relative">
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>
      <AdminSidebar sidebarOpen={sidebarOpen} />
      
      <main className="flex-1 h-screen overflow-y-auto overflow-x-hidden relative custom-scrollbar">
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-bold text-slate-900 capitalize tracking-tight">
              School Management
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-brand-500 transition-colors" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-slate-100 border-transparent focus:bg-white focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 rounded-xl text-sm w-64 transition-all outline-none border"
              />
            </div>
            <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-xl relative transition-all hover:scale-105 active:scale-95">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-brand-500 rounded-full border-2 border-white"></span>
            </button>
          </div>
        </header>

        <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Courses</h2>
              <p className="text-slate-500 mt-1">Manage educational content and resources.</p>
            </div>
            <button
              onClick={() => { setEditingCourse(null); setIsModalOpen(true); }}
              className="px-4 py-2 bg-brand-600 text-white rounded-xl font-semibold shadow-lg shadow-brand-500/20 hover:bg-brand-700 transition-all flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add Course
            </button>
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <div 
                  key={course.id} 
                  className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition-all group flex flex-col cursor-pointer"
                  onClick={() => setViewCourse(course)}
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
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleDelete(course.id); }}
                        className="p-2 bg-white/90 backdrop-blur-sm text-slate-600 rounded-lg hover:text-red-600 shadow-sm transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
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
                  No courses found. Add one to get started.
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <CourseModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchCourses}
        initialData={editingCourse}
      />
      <CourseViewModal
        isOpen={!!viewCourse}
        onClose={() => setViewCourse(null)}
        course={viewCourse}
      />
    </div>
  );
}
