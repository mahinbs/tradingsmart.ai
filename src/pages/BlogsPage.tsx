import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import AiPredictionHeader from '../components/AiPredictionHeader';
import AiPredictionFooter from '../components/AiPredictionFooter';
import { blogsData } from '../data/blogs';
import { ScrollReveal } from '../components/ui/ScrollReveal';

const BlogsPage = () => {
    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-cyan-500 selection:text-black flex flex-col">
            <Helmet>
                <title>Trading Insights & AI Analysis | TradingSmart.AI</title>
                <meta name="description" content="Read our latest insights on AI trading, market analysis, and strategies." />
            </Helmet>

            <AiPredictionHeader />

            {/* Header Section */}
            <section className="pt-40 pb-20 px-4 relative overflow-hidden bg-zinc-950">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-900/10 rounded-full blur-[100px] pointer-events-none"></div>

                <div className="container mx-auto text-center relative z-10">
                    <ScrollReveal>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tight">
                            Market <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-500">Insights</span>
                        </h1>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light">
                            Deep dives into AI prediction models, market sentiment, and quantitative trading strategies.
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            {/* Blogs Grid */}
            <section className="py-20 flex-1 relative">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {blogsData.map((blog, idx) => (
                            <ScrollReveal key={blog.id} delay={idx * 0.1}>
                                <Link to={`/blog/${blog.id}`} className="block h-full group">
                                    <div className="bg-zinc-900 border border-white/5 rounded-2xl overflow-hidden hover:border-cyan-500/30 transition-all duration-500 h-full flex flex-col group-hover:-translate-y-1 group-hover:shadow-[0_10px_30px_-15px_rgba(6,182,212,0.3)]">
                                        <div className="relative aspect-video overflow-hidden">
                                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10"></div>
                                            <img
                                                src={blog.image}
                                                alt={blog.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                            />
                                            <div className="absolute top-4 left-4 z-20">
                                                <span className="bg-cyan-500 text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                                                    {blog.category}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-6 flex flex-col flex-1">
                                            <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-cyan-400 transition-colors">
                                                {blog.title}
                                            </h3>
                                            <p className="text-gray-400 text-sm mb-6 line-clamp-3 font-light leading-relaxed flex-1">
                                                {blog.excerpt}
                                            </p>
                                            <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        src={blog.author.avatar}
                                                        alt={blog.author.name}
                                                        className="w-8 h-8 rounded-full border border-white/10"
                                                    />
                                                    <div>
                                                        <div className="text-white text-xs font-bold">{blog.author.name}</div>
                                                        <div className="text-gray-500 text-[10px]">{blog.date}</div>
                                                    </div>
                                                </div>
                                                <div className="text-gray-500 text-xs flex flex-col items-end">
                                                    {blog.readTime}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            <AiPredictionFooter />
        </div>
    );
};

export default BlogsPage;
