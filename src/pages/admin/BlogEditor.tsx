import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useBlogs } from '../../context/BlogContext';
import { FaArrowLeft, FaSave, FaImage, FaAlignLeft } from 'react-icons/fa';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const BlogEditor = () => {
    const { id } = useParams<{ id: string }>();
    const isEditing = Boolean(id);
    const { getBlog, addBlog, updateBlog } = useBlogs();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        excerpt: '',
        content: '',
        image: '',
        category: '',
        readTime: '5 min read'
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
                    readTime: existingBlog.readTime
                });
            } else {
                // If ID is not found, redirect to dashboard
                navigate('/admin/dashboard');
            }
        }
    }, [id, isEditing, getBlog, navigate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleContentChange = (content: string) => {
        setFormData(prev => ({ ...prev, content }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate network delay
        setTimeout(() => {
            if (isEditing && id) {
                updateBlog(id, formData);
            } else {
                addBlog(formData);
            }
            setIsLoading(false);
            navigate('/admin/dashboard');
        }, 600);
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

                    {/* Image URL */}
                    <div className="space-y-2">
                        <label htmlFor="image" className="block text-sm font-medium text-gray-300">
                            Featured Image URL *
                        </label>
                        <div className="relative">
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
                                placeholder="https://images.unsplash.com/photo-..."
                                className="w-full bg-black/50 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all text-sm"
                            />
                        </div>
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
