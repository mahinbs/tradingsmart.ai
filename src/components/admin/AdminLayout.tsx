import { Navigate, Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaSignOutAlt, FaTachometerAlt, FaPlus, FaHome } from 'react-icons/fa';

const AdminLayout = () => {
    const { isAuthenticated, logout } = useAuth();
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to="/admin/login" replace />;
    }

    const navigation = [
        { name: 'Dashboard', href: '/admin/dashboard', icon: FaTachometerAlt },
        { name: 'New Blog Post', href: '/admin/blog/new', icon: FaPlus },
    ];

    return (
        <div className="min-h-screen bg-black text-white font-sans flex flex-col md:flex-row">
            {/* Sidebar */}
            <aside className="w-full md:w-64 bg-zinc-950 border-r border-white/10 hidden md:flex flex-col min-h-screen sticky top-0">
                <div className="p-6 border-b border-white/10">
                    <img src="/logo.png" alt="logo" className="w-32 object-contain mb-2" />
                    <div className="text-xs uppercase tracking-[0.2em] text-cyan-500 font-bold">Admin Portal</div>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    {navigation.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                to={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${isActive
                                    ? 'bg-cyan-500 text-black font-bold shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                <Icon className={isActive ? 'text-black' : 'text-gray-500'} />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-white/10 space-y-2">
                    <Link to="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
                        <FaHome className="text-gray-500" />
                        Main Site
                    </Link>
                    <button
                        onClick={logout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-500/10 transition-colors text-left"
                    >
                        <FaSignOutAlt />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Mobile Header */}
            <div className="md:hidden bg-zinc-950 border-b border-white/10 p-4 flex justify-between items-center sticky top-0 z-50">
                <img src="/logo.png" alt="logo" className="w-24 object-contain" />
                <button
                    onClick={logout}
                    className="text-red-500 text-sm font-medium border border-red-500/20 px-3 py-1.5 rounded-md"
                >
                    Logout
                </button>
            </div>

            {/* Mobile Nav */}
            <div className="md:hidden bg-zinc-900 flex overflow-x-auto">
                {navigation.map((item) => {
                    const isActive = location.pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            to={item.href}
                            className={`flex-1 py-3 text-center text-sm font-medium whitespace-nowrap px-4 border-b-2 transition-colors ${isActive
                                ? 'border-cyan-500 text-cyan-400 bg-cyan-500/10'
                                : 'border-transparent text-gray-400 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            {item.name}
                        </Link>
                    );
                })}
            </div>

            {/* Main Content */}
            <main className="flex-1 overflow-x-hidden relative">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none mix-blend-overlay"></div>
                <div className="p-6 md:p-10 relative z-10 max-w-6xl mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
