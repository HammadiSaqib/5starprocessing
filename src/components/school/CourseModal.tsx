"use client";
import { useState, useEffect, useRef } from "react";
import { X, Upload, FileText, Image as ImageIcon, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Course {
  id?: number;
  title: string;
  description: string;
  course_url?: string;
  thumbnail_url?: string;
  product_file_url?: string;
}

interface CourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  initialData?: Course | null;
}

export default function CourseModal({ isOpen, onClose, onSuccess, initialData }: CourseModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [courseUrl, setCourseUrl] = useState("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string>("");
  const [productFile, setProductFile] = useState<File | null>(null);
  const [productFileName, setProductFileName] = useState<string>("");
  const [videos, setVideos] = useState<{ title: string, video_url: string, id?: number, position: number }[]>([]);
  const [newVideoTitle, setNewVideoTitle] = useState("");
  const [newVideoFile, setNewVideoFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [videoUploadLoading, setVideoUploadLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description);
      setCourseUrl(initialData.course_url || "");
      setThumbnailPreview(initialData.thumbnail_url || "");
      setProductFileName(initialData.product_file_url ? initialData.product_file_url.split('/').pop() || "Existing file" : "");
      
      if (initialData.id) {
        // Fetch videos for this course
        fetch(`/api/school/courses/${initialData.id}`)
          .then(res => res.json())
          .then(data => {
            if (data.videos) setVideos(data.videos);
          })
          .catch(() => {});
      }
    } else {
      resetForm();
    }
  }, [initialData, isOpen]);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setCourseUrl("");
    setThumbnail(null);
    setThumbnailPreview("");
    setProductFile(null);
    setProductFileName("");
    setVideos([]);
    setNewVideoTitle("");
    setNewVideoFile(null);
    setError(null);
  };

  const handleAddVideo = async () => {
    if (!newVideoTitle || !newVideoFile) return;
    setVideoUploadLoading(true);
    try {
      const url = await uploadFile(newVideoFile, "product");
      setVideos(prev => [...prev, { title: newVideoTitle, video_url: url, position: prev.length }]);
      setNewVideoTitle("");
      setNewVideoFile(null);
    } catch (e) {
      alert("Failed to upload video");
    } finally {
      setVideoUploadLoading(false);
    }
  };

  const handleRemoveVideo = (index: number) => {
    setVideos(prev => prev.filter((_, i) => i !== index));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: "thumbnail" | "product") => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (type === "thumbnail") {
        setThumbnail(file);
        setThumbnailPreview(URL.createObjectURL(file));
      } else {
        setProductFile(file);
        setProductFileName(file.name);
      }
    }
  };

  const uploadFile = async (file: File, type: "thumbnail" | "product") => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", type);
    const res = await fetch("/api/school/upload", {
      method: "POST",
      body: formData,
    });
    if (!res.ok) throw new Error("Upload failed");
    const data = await res.json();
    return data.url;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let thumbUrl = initialData?.thumbnail_url;
      let prodUrl = initialData?.product_file_url;

      if (thumbnail) {
        thumbUrl = await uploadFile(thumbnail, "thumbnail");
      }
      if (productFile) {
        prodUrl = await uploadFile(productFile, "product");
      }

      const payload = {
        title,
        description,
        course_url: courseUrl,
        thumbnail_url: thumbUrl,
        product_file_url: prodUrl,
        videos,
      };

      const url = initialData?.id 
        ? `/api/school/courses/${initialData.id}` 
        : "/api/school/courses";
      
      const method = initialData?.id ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to save course");

      onSuccess();
      onClose();
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 m-auto w-full max-w-2xl h-fit max-h-[90vh] bg-white rounded-3xl shadow-2xl z-[101] overflow-hidden flex flex-col"
          >
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h2 className="text-xl font-bold text-slate-900">
                {initialData ? "Edit Course" : "Add New Course"}
              </h2>
              <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto custom-scrollbar">
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="p-4 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100">
                    {error}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Course Title</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none transition-all"
                    placeholder="e.g. Advanced Payment Processing"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Description</label>
                  <textarea
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none transition-all resize-none"
                    placeholder="Course details..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Course URL (Optional)</label>
                  <input
                    type="url"
                    value={courseUrl}
                    onChange={(e) => setCourseUrl(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none transition-all"
                    placeholder="https://..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Thumbnail Upload */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Thumbnail (Optional)</label>
                    <div className="relative border-2 border-dashed border-slate-200 rounded-xl p-4 hover:bg-slate-50 transition-colors text-center cursor-pointer group">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, "thumbnail")}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      {thumbnailPreview ? (
                        <div className="relative h-32 w-full">
                          <img src={thumbnailPreview} alt="Preview" className="w-full h-full object-cover rounded-lg" />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                            <p className="text-white text-xs font-medium">Change Image</p>
                          </div>
                        </div>
                      ) : (
                        <div className="py-8 flex flex-col items-center">
                          <div className="w-10 h-10 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mb-2 group-hover:bg-white group-hover:text-brand-500 transition-colors shadow-sm">
                            <ImageIcon className="w-5 h-5" />
                          </div>
                          <p className="text-xs text-slate-500 font-medium">Click or drag image</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Product Upload */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Main Course File (Optional)</label>
                    <div className="relative border-2 border-dashed border-slate-200 rounded-xl p-4 hover:bg-slate-50 transition-colors text-center cursor-pointer group">
                      <input
                        type="file"
                        onChange={(e) => handleFileChange(e, "product")}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      {productFileName ? (
                        <div className="py-8 flex flex-col items-center">
                          <div className="w-10 h-10 bg-brand-50 text-brand-600 rounded-full flex items-center justify-center mb-2 shadow-sm">
                            <FileText className="w-5 h-5" />
                          </div>
                          <p className="text-xs text-slate-700 font-medium px-2 truncate w-full">{productFileName}</p>
                          <p className="text-[10px] text-slate-400 mt-1">Click to replace</p>
                        </div>
                      ) : (
                        <div className="py-8 flex flex-col items-center">
                          <div className="w-10 h-10 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mb-2 group-hover:bg-white group-hover:text-brand-500 transition-colors shadow-sm">
                            <Upload className="w-5 h-5" />
                          </div>
                          <p className="text-xs text-slate-500 font-medium">Click or drag file/video</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-6">
                  <label className="block text-sm font-semibold text-slate-700 mb-4">Course Videos (Playlist)</label>
                  
                  <div className="space-y-3 mb-4">
                    {videos.map((video, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                        <div className="flex items-center gap-3 overflow-hidden">
                          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center border border-slate-200 text-slate-400 shrink-0">
                            <span className="text-xs font-bold">{idx + 1}</span>
                          </div>
                          <div className="truncate">
                            <p className="text-sm font-medium text-slate-900 truncate">{video.title}</p>
                            <p className="text-xs text-slate-400 truncate">{video.video_url}</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveVideo(idx)}
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-3 items-end">
                    <div className="flex-1">
                      <label className="text-xs font-medium text-slate-500 mb-1 block">Video Title</label>
                      <input
                        type="text"
                        value={newVideoTitle}
                        onChange={(e) => setNewVideoTitle(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-brand-500 outline-none text-sm"
                        placeholder="Lesson Title"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="text-xs font-medium text-slate-500 mb-1 block">Video File</label>
                      <div className="relative">
                        <input
                          type="file"
                          accept="video/*"
                          onChange={(e) => e.target.files && setNewVideoFile(e.target.files[0])}
                          className="hidden"
                          id="video-upload"
                        />
                        <label 
                          htmlFor="video-upload"
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-sm text-slate-500 flex items-center justify-between cursor-pointer hover:border-brand-300"
                        >
                          <span className="truncate">{newVideoFile ? newVideoFile.name : "Select Video"}</span>
                          <Upload className="w-4 h-4" />
                        </label>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleAddVideo}
                      disabled={!newVideoTitle || !newVideoFile || videoUploadLoading}
                      className="px-4 py-2 bg-slate-900 text-white rounded-xl font-medium text-sm hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      {videoUploadLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Add"}
                    </button>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-5 py-2.5 text-slate-600 font-bold text-sm hover:bg-slate-100 rounded-xl transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2.5 bg-brand-600 text-white font-bold text-sm rounded-xl hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-brand-500/20 flex items-center gap-2"
                  >
                    {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                    {initialData ? "Save Changes" : "Add Course"}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
