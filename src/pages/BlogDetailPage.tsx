import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import AiPredictionHeader from '../components/AiPredictionHeader';
import AiPredictionFooter from '../components/AiPredictionFooter';
import { ScrollReveal } from '../components/ui/ScrollReveal';
import { useBlogs } from '../context/BlogContext';

const BlogDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { blogs, isLoading } = useBlogs();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const blog = blogs.find((b) => b.id === id);

  if (!blog && isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center">
        <AiPredictionHeader />
        <p className="text-gray-400">Loading article...</p>
        <AiPredictionFooter />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center">
        <AiPredictionHeader />
        <h1 className="text-3xl font-bold mb-4">Blog Post Not Found</h1>
        <Link to="/blogs" className="text-cyan-400 hover:underline">
          Return to Blogs
        </Link>
        <AiPredictionFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-cyan-500 selection:text-black flex flex-col">
      <Helmet>
        <title>{blog.title} | TradingSmart.AI</title>
        <meta name="description" content={blog.excerpt} />
      </Helmet>

      <AiPredictionHeader />

      {/* Blog Header */}
      <section className="pt-32 pb-12 px-4 relative overflow-hidden bg-zinc-950">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none"></div>
        <div className="container mx-auto max-w-4xl relative z-10">
          <Link
            to="/blogs"
            className="inline-flex items-center text-sm text-gray-400 hover:text-cyan-400 mb-8 transition-colors"
          >
            <FaArrowLeft className="mr-2" /> Back to all articles
          </Link>

          <ScrollReveal>
            <div className="mb-6 flex gap-3">
              <span className="bg-cyan-500/10 text-cyan-400 text-xs font-bold px-3 py-1 rounded-full border border-cyan-500/20 uppercase tracking-wider">
                {blog.category}
              </span>
              <span className="bg-white/5 text-gray-300 text-xs font-bold px-3 py-1 rounded-full border border-white/10 flex items-center">
                {blog.readTime}
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black mb-8 leading-tight tracking-tight">
              {blog.title}
            </h1>

            <div className="flex items-center gap-4 py-6 border-y border-white/5 mb-8">
              <img
                src={blog.author.avatar}
                alt={blog.author.name}
                className="w-12 h-12 rounded-full border border-white/10"
              />
              <div>
                <div className="text-white font-bold">{blog.author.name}</div>
                <div className="text-gray-500 text-sm">{blog.date}</div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Featured Image */}
      <section className="px-4 -mt-8 relative z-20">
        <div className="container mx-auto max-w-5xl">
          <ScrollReveal delay={0.2}>
            <div className="aspect-video w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative">
              <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-3xl">
          <ScrollReveal delay={0.3}>
            <div
              className="prose prose-invert prose-lg md:prose-xl max-w-none 
                            prose-headings:font-bold prose-headings:tracking-tight 
                            prose-h2:text-white prose-h2:mt-12 prose-h2:mb-6
                            prose-h3:text-gray-200 prose-h3:mt-8
                            prose-p:text-gray-300 prose-p:leading-relaxed prose-p:font-light
                            prose-a:text-cyan-400 hover:prose-a:text-cyan-300
                            prose-strong:text-white prose-strong:font-semibold
                            prose-ul:text-gray-300 prose-li:marker:text-cyan-500
                            prose-blockquote:border-l-cyan-500 prose-blockquote:bg-cyan-500/5 prose-blockquote:px-6 prose-blockquote:py-2 prose-blockquote:rounded-r-lg prose-blockquote:text-gray-300 prose-blockquote:font-light prose-blockquote:italic"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </ScrollReveal>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-zinc-950 border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-transparent to-cyan-900/10 pointer-events-none"></div>
        <div className="container mx-auto px-4 max-w-4xl text-center relative z-10">
          <ScrollReveal>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to trade smarter?</h2>
            <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
              Join thousands of traders using our AI models to predict market movements before they
              happen.
            </p>
            <Link
              to="/#pricing"
              className="inline-flex bg-cyan-500 text-black hover:bg-cyan-400 font-bold px-10 py-5 rounded-full shadow-[0_0_30px_rgba(6,182,212,0.3)] transition-all hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(6,182,212,0.5)]"
            >
              View Subscription Plans
            </Link>
          </ScrollReveal>
        </div>
      </section>

      <AiPredictionFooter />
    </div>
  );
};

export default BlogDetailPage;
