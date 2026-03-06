import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useBlogs } from '../../context/BlogContext';
import type { BlogPost } from '../../context/BlogContext';
import { FaEdit, FaTrash, FaPlus, FaSearch } from 'react-icons/fa';

const AdminDashboard = () => {
  const { blogs, deleteBlog } = useBlogs();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id: string, title: string) => {
    if (
      window.confirm(
        `Are you sure you want to delete "${title}"? This action cannot be undone.`
      )
    ) {
      setIsDeleting(id);
      await deleteBlog(id);
      setIsDeleting(null);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Blog Management</h1>
                    <p className="text-gray-400 text-sm mt-1">Manage, edit, and publish your insights.</p>
                </div>
                <Link
                    to="/admin/blog/new"
                    className="inline-flex items-center justify-center gap-2 bg-cyan-500 text-black hover:bg-cyan-400 font-bold px-6 py-3 rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.2)] transition-all hover:-translate-y-0.5"
                >
                    <FaPlus /> New Post
                </Link>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-zinc-900 border border-white/5 rounded-2xl p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl"></div>
                    <div className="text-gray-400 text-sm mb-2 relative z-10">Total Published</div>
                    <div className="text-4xl font-bold text-white relative z-10">{blogs.length}</div>
                </div>
                {/* Placeholders for future stats */}
                <div className="bg-zinc-900 border border-white/5 rounded-2xl p-6 opacity-60">
                    <div className="text-gray-500 text-sm mb-2">Drafts</div>
                    <div className="text-4xl font-bold text-gray-400">0</div>
                </div>
                <div className="bg-zinc-900 border border-white/5 rounded-2xl p-6 opacity-60">
                    <div className="text-gray-500 text-sm mb-2">Total Views</div>
                    <div className="text-4xl font-bold text-gray-400">---</div>
                </div>
            </div>

            {/* Content Area */}
            <div className="bg-zinc-900/50 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm">

                {/* Toolbar */}
                <div className="p-4 border-b border-white/5 flex items-center justify-between bg-zinc-950/50">
                    <div className="relative w-full max-w-sm">
                        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search posts..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-black/50 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all"
                        />
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-zinc-950/80 text-gray-400 text-xs uppercase tracking-wider">
                                <th className="p-4 font-medium w-1/2">Post Details</th>
                                <th className="p-4 font-medium hidden sm:table-cell">Category</th>
                                <th className="p-4 font-medium hidden md:table-cell">Date</th>
                                <th className="p-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-sm">
                            {filteredBlogs.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="p-8 text-center text-gray-500">
                                        No blog posts found matching your search.
                                    </td>
                                </tr>
                            ) : (
                                filteredBlogs.map((blog: BlogPost) => (
                                    <tr
                                        key={blog.id}
                                        className={`hover:bg-white/2 transition-colors group ${isDeleting === blog.id ? 'opacity-50 pointer-events-none' : ''}`}
                                    >
                                        <td className="p-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-16 h-12 rounded-lg overflow-hidden shrink-0 border border-white/10 hidden sm:block">
                                                    <img src={blog.image} alt="" className="w-full h-full object-cover" />
                                                </div>
                                                <div>
                                                    <div className="font-semibold text-white mb-1 line-clamp-1 group-hover:text-cyan-400 transition-colors">
                                                        {blog.title}
                                                    </div>
                                                    <div className="text-gray-500 text-xs font-mono">/{blog.id}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4 hidden sm:table-cell">
                                            <span className="inline-block px-2 py-1 bg-white/5 rounded border border-white/5 text-xs text-gray-300">
                                                {blog.category}
                                            </span>
                                        </td>
                                        <td className="p-4 text-gray-400 hidden md:table-cell whitespace-nowrap">
                                            {blog.date}
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => navigate(`/admin/blog/edit/${blog.id}`)}
                                                    className="p-2 text-gray-400 hover:text-cyan-400 hover:bg-cyan-400/10 rounded-lg transition-all"
                                                    title="Edit Post"
                                                >
                                                    <FaEdit />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(blog.id, blog.title)}
                                                    disabled={isDeleting === blog.id}
                                                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all disabled:opacity-50"
                                                    title="Delete Post"
                                                >
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
