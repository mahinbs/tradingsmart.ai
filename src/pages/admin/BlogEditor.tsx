import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useBlogs } from '../../context/BlogContext';
import { supabase } from '../../lib/supabaseClient';
import { FaArrowLeft, FaSave, FaImage, FaAlignLeft, FaCloudUploadAlt, FaUser } from 'react-icons/fa';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const BLOG_IMAGES_BUCKET = 'blog-images';

function getTodayIndiaYMD(): string {
  return new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });
}

function formatYmdToDisplay(ymd: string): string {
  if (!ymd) return '';
  const d = new Date(ymd + 'T12:00:00');
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function parseDisplayDateToYmd(display: string): string {
  if (!display?.trim()) return getTodayIndiaYMD();
  const d = new Date(display);
  if (!Number.isNaN(d.getTime())) return d.toISOString().slice(0, 10);
  const months: Record<string, string> = {
    January: '01', February: '02', March: '03', April: '04', May: '05', June: '06',
    July: '07', August: '08', September: '09', October: '10', November: '11', December: '12',
  };
  const parts = display.replace(',', '').trim().split(/\s+/);
  if (parts.length >= 3) {
    const month = months[parts[0]];
    const day = parts[1].padStart(2, '0');
    const year = parts[2];
    if (month && day && year) return `${year}-${month}-${day}`;
  }
  return getTodayIndiaYMD();
}

const BlogEditor = () => {
  const { id } = useParams<{ id: string }>();
  const isEditing = Boolean(id);
  const { getBlog, addBlog, updateBlog } = useBlogs();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [imageUploadError, setImageUploadError] = useState<string | null>(null);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [avatarUploadError, setAvatarUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    image: '',
    category: '',
    readTime: '5 min read',
    authorName: 'Admin User',
    authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop',
    dateYmd: getTodayIndiaYMD(),
  });

  useEffect(() => {
    if (isEditing && id) {
      const existingBlog = getBlog(id);
      if (existingBlog) {
        setFormData({
          title: existingBlog.title,
          excerpt: existingBlog.excerpt,
          content: existingBlog.content,
          image: existingBlog.image,
          category: existingBlog.category,
          readTime: existingBlog.readTime,
          authorName: existingBlog.author.name,
          authorAvatar: existingBlog.author.avatar,
          dateYmd: parseDisplayDateToYmd(existingBlog.date),
        });
      } else {
        navigate('/admin/dashboard');
      }
    } else {
      setFormData((prev) => ({ ...prev, dateYmd: getTodayIndiaYMD() }));
    }
  }, [id, isEditing, getBlog, navigate]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleContentChange = (content: string) => {
    setFormData((prev) => ({ ...prev, content }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setImageUploadError('Please select an image file (JPEG, PNG, WebP, etc.).');
      return;
    }
    setImageUploadError(null);
    setIsUploadingImage(true);
    const ext = file.name.split('.').pop() || 'jpg';
    const path = `blog/${Date.now()}-${crypto.randomUUID().slice(0, 8)}.${ext}`;
    const { data, error } = await supabase.storage
      .from(BLOG_IMAGES_BUCKET)
      .upload(path, file, { contentType: file.type, upsert: false });
    setIsUploadingImage(false);
    e.target.value = '';
    if (error) {
      setImageUploadError(error.message || 'Upload failed.');
      return;
    }
    const { data: urlData } = supabase.storage.from(BLOG_IMAGES_BUCKET).getPublicUrl(data.path);
    setFormData((prev) => ({ ...prev, image: urlData.publicUrl }));
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setAvatarUploadError('Please select an image file (JPEG, PNG, WebP, etc.).');
      return;
    }
    setAvatarUploadError(null);
    setIsUploadingAvatar(true);
    const ext = file.name.split('.').pop() || 'jpg';
    const path = `authors/${Date.now()}-${crypto.randomUUID().slice(0, 8)}.${ext}`;
    const { data, error } = await supabase.storage
      .from(BLOG_IMAGES_BUCKET)
      .upload(path, file, { contentType: file.type, upsert: false });
    setIsUploadingAvatar(false);
    e.target.value = '';
    if (error) {
      setAvatarUploadError(error.message || 'Upload failed.');
      return;
    }
    const { data: urlData } = supabase.storage.from(BLOG_IMAGES_BUCKET).getPublicUrl(data.path);
    setFormData((prev) => ({ ...prev, authorAvatar: urlData.publicUrl }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const dateDisplay = formatYmdToDisplay(formData.dateYmd);
    const author = { name: formData.authorName, avatar: formData.authorAvatar };

    if (isEditing && id) {
      await updateBlog(id, {
        title: formData.title,
        excerpt: formData.excerpt,
        content: formData.content,
        image: formData.image,
        category: formData.category,
        readTime: formData.readTime,
        date: dateDisplay,
        author,
      });
    } else {
      await addBlog({
        title: formData.title,
        excerpt: formData.excerpt,
        content: formData.content,
        image: formData.image,
        category: formData.category,
        readTime: formData.readTime,
        date: dateDisplay,
        author,
      });
    }

    setIsLoading(false);
    navigate('/admin/dashboard');
  };

  return (
    <div className="max-w-4xl space-y-6 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Link
                        to="/admin/dashboard"
                        className="p-2 bg-zinc-900 hover:bg-zinc-800 text-gray-400 hover:text-white rounded-lg transition-colors border border-white/5"
                    >
                        <FaArrowLeft />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-white">
                            {isEditing ? 'Edit Blog Post' : 'Create New Blog Post'}
                        </h1>
                        <p className="text-gray-500 text-xs mt-1">
                            {isEditing ? `Editing ID: ${id}` : 'Fill in the details below to publish a new article.'}
                        </p>
                    </div>
                </div>
            </div>

            {/* Editor Form */}
            <form onSubmit={handleSubmit} className="space-y-6">

                <div className="bg-zinc-900/60 border border-white/10 rounded-2xl p-6 md:p-8 space-y-6 backdrop-blur-sm">
                    {/* Title */}
                    <div className="space-y-2">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-300">
                            Post Title *
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            placeholder="e.g., The Future of AI in Options Trading"
                            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all font-semibold"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Category */}
                        <div className="space-y-2">
                            <label htmlFor="category" className="block text-sm font-medium text-gray-300">
                                Category *
                            </label>
                            <input
                                type="text"
                                id="category"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                required
                                placeholder="e.g., Market Analysis"
                                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all text-sm"
                            />
                        </div>

                        {/* Read Time */}
                        <div className="space-y-2">
                            <label htmlFor="readTime" className="block text-sm font-medium text-gray-300">
                                Read Time
                            </label>
                            <input
                                type="text"
                                id="readTime"
                                name="readTime"
                                value={formData.readTime}
                                onChange={handleChange}
                                placeholder="e.g., 5 min read"
                                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all text-sm"
                            />
                        </div>
                    </div>

                    {/* Excerpt */}
                    <div className="space-y-2">
                        <label htmlFor="excerpt" className="block text-sm font-medium text-gray-300">
                            Short Excerpt *
                        </label>
                        <textarea
                            id="excerpt"
                            name="excerpt"
                            value={formData.excerpt}
                            onChange={handleChange}
                            required
                            rows={2}
                            placeholder="A brief summary of the article (appears on cards)..."
                            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all text-sm resize-none"
                        />
                    </div>

                    {/* Author & Date */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label htmlFor="authorName" className="block text-sm font-medium text-gray-300">
                                Author name *
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500">
                                    <FaUser />
                                </div>
                                <input
                                    type="text"
                                    id="authorName"
                                    name="authorName"
                                    value={formData.authorName}
                                    onChange={handleChange}
                                    required
                                    placeholder="e.g., Sarah Jenkins"
                                    className="w-full bg-black/50 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all text-sm"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="dateYmd" className="block text-sm font-medium text-gray-300">
                                Post date *
                            </label>
                            <input
                                type="date"
                                id="dateYmd"
                                name="dateYmd"
                                value={formData.dateYmd}
                                onChange={handleChange}
                                required
                                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all text-sm"
                            />
                            <p className="text-gray-500 text-xs">Defaults to current date (India). You can set a past date.</p>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-300">
                            Author profile picture *
                        </label>
                        <div className="flex flex-col sm:flex-row gap-3 items-start">
                            <div className="relative flex-1 w-full">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500">
                                    <FaImage />
                                </div>
                                <input
                                    type="url"
                                    id="authorAvatar"
                                    name="authorAvatar"
                                    value={formData.authorAvatar}
                                    onChange={handleChange}
                                    required
                                    placeholder="Profile picture URL or upload below"
                                    className="w-full bg-black/50 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all text-sm"
                                />
                            </div>
                            <input
                                ref={avatarInputRef}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleAvatarUpload}
                            />
                            <button
                                type="button"
                                disabled={isUploadingAvatar}
                                onClick={() => avatarInputRef.current?.click()}
                                className="shrink-0 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-500 transition-all font-medium disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {isUploadingAvatar ? (
                                    <AiOutlineLoading3Quarters className="animate-spin" />
                                ) : (
                                    <FaCloudUploadAlt />
                                )}
                                {isUploadingAvatar ? 'Uploading…' : 'Upload photo'}
                            </button>
                        </div>
                        {avatarUploadError && (
                            <p className="text-red-500 text-xs font-medium">{avatarUploadError}</p>
                        )}
                        {formData.authorAvatar && (
                            <div className="mt-2 flex items-center gap-3">
                                <img
                                    src={formData.authorAvatar}
                                    alt="Author"
                                    className="w-12 h-12 rounded-full border border-white/10 object-cover"
                                    onError={(e) => (e.currentTarget.style.display = 'none')}
                                />
                                <span className="text-gray-400 text-sm">Preview</span>
                            </div>
                        )}
                    </div>

                    {/* Featured Image: upload or URL */}
                    <div className="space-y-2">
                        <label htmlFor="image" className="block text-sm font-medium text-gray-300">
                            Featured Image *
                        </label>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <div className="relative flex-1">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500">
                                    <FaImage />
                                </div>
                                <input
                                    type="url"
                                    id="image"
                                    name="image"
                                    value={formData.image}
                                    onChange={handleChange}
                                    required
                                    placeholder="Paste image URL or upload below"
                                    className="w-full bg-black/50 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all text-sm"
                                />
                            </div>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageUpload}
                            />
                            <button
                                type="button"
                                disabled={isUploadingImage}
                                onClick={() => fileInputRef.current?.click()}
                                className="shrink-0 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-500 transition-all font-medium disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {isUploadingImage ? (
                                    <AiOutlineLoading3Quarters className="animate-spin" />
                                ) : (
                                    <FaCloudUploadAlt />
                                )}
                                {isUploadingImage ? 'Uploading…' : 'Upload image'}
                            </button>
                        </div>
                        {imageUploadError && (
                            <p className="text-red-500 text-xs font-medium">{imageUploadError}</p>
                        )}
                        {formData.image && (
                            <div className="mt-4 rounded-xl overflow-hidden border border-white/10 aspect-video max-w-sm">
                                <img src={formData.image} alt="Preview" className="w-full h-full object-cover" onError={(e) => (e.currentTarget.style.display = 'none')} />
                            </div>
                        )}
                    </div>

                    {/* Content (Rich Text) */}
                    <div className="space-y-4 pt-6 border-t border-white/5">
                        <div className="flex items-center justify-between">
                            <label className="block text-sm font-medium text-gray-300">
                                Main Content *
                            </label>
                            <div className="flex items-center gap-2 text-xs text-cyan-400 bg-cyan-500/5 px-3 py-1.5 rounded-full border border-cyan-500/20">
                                <FaAlignLeft /> Rich Text Editor
                            </div>
                        </div>
                        <div className="blog-editor-quill bg-black/50 border border-white/10 rounded-2xl overflow-hidden min-h-[450px]
                            [&_.ql-toolbar]:bg-zinc-900/80 [&_.ql-toolbar]:border-none [&_.ql-toolbar]:border-b [&_.ql-toolbar]:border-white/10 [&_.ql-toolbar]:p-4
                            [&_.ql-container]:border-none [&_.ql-container]:bg-black/30
                            [&_.ql-editor]:min-h-[400px] [&_.ql-editor]:p-8 [&_.ql-editor]:leading-relaxed
                            [&_.ql-stroke]:stroke-gray-400 [&_.ql-fill]:fill-gray-400
                            [&_.ql-picker]:text-gray-400 [&_.ql-picker-options]:bg-zinc-900 [&_.ql-picker-options]:border-white/10
                            hover:[&_.ql-stroke]:stroke-cyan-400 hover:[&_.ql-fill]:fill-cyan-400
                            [&_.ql-active_.ql-stroke]:stroke-cyan-500 [&_.ql-active_.ql-fill]:fill-cyan-500">
                            <ReactQuill
                                theme="snow"
                                value={formData.content}
                                onChange={handleContentChange}
                                modules={{
                                    toolbar: [
                                        [{ 'header': [1, 2, 3, false] }],
                                        ['bold', 'italic', 'underline', 'strike'],
                                        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                                        ['link', 'blockquote', 'code-block'],
                                        ['clean']
                                    ],
                                }}
                                className="h-full"
                            />
                        </div>
                    </div>

                    {/* Submit Actions */}
                    <div className="flex justify-end gap-4 pt-8 border-t border-white/5">
                        <Link
                            to="/admin/dashboard"
                            className="px-8 py-4 rounded-xl border border-white/10 text-white hover:bg-white/5 transition-all font-medium"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="px-10 py-4 rounded-xl bg-cyan-500 text-black font-bold hover:bg-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-all flex items-center justify-center gap-3 min-w-[200px] disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <AiOutlineLoading3Quarters className="animate-spin text-xl" />
                            ) : (
                                <>
                                    <FaSave className="text-lg" />
                                    {isEditing ? 'Save Changes' : 'Publish Blog Post'}
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default BlogEditor;
