import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { Link } from "react-router-dom";
import { ScrollReveal } from "./ui/ScrollReveal";
import { useBlogs } from "../context/BlogContext";

const animation = { duration: 25000, easing: (t: number) => t };

const BlogsSlider = () => {
  const { blogs } = useBlogs();

  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    renderMode: "performance",
    drag: true,
    slides: {
      perView: 1.2,
      spacing: 16,
    },
    breakpoints: {
      "(min-width: 640px)": {
        slides: { perView: 2.2, spacing: 24 },
      },
      "(min-width: 1024px)": {
        slides: { perView: 3.2, spacing: 32 },
      },
    },
    created(s) {
      s.moveToIdx(1, true, animation);
    },
    updated(s) {
      s.moveToIdx(s.track.details.abs + 1, true, animation);
    },
    animationEnded(s) {
      s.moveToIdx(s.track.details.abs + 1, true, animation);
    },
  });

  const items = blogs.length > 0 ? blogs : [];

  if (items.length === 0) {
    return null;
  }

  const sliderItems = items.length >= 3 ? items : items.concat(items);

  return (
    <section className="py-24 bg-zinc-950 overflow-hidden relative">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none"></div>

      <div className="container mx-auto px-4 mb-12 flex justify-between items-end relative z-10">
        <ScrollReveal>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Latest Insights</h2>
          <p className="text-gray-400">Market analysis, strategy guides, and AI updates.</p>
        </ScrollReveal>
        <ScrollReveal delay={0.2} direction="left">
          <Link
            to="/blogs"
            className="hidden sm:inline-flex items-center text-cyan-400 font-medium hover:text-cyan-300 transition-colors group"
          >
            View All Articles
            <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </ScrollReveal>
      </div>

      <div className="pl-4 md:pl-0">
        <div ref={sliderRef} className="keen-slider h-full pb-8">
          {sliderItems.map((blog, idx) => (
            <div key={`${blog.id}-${idx}`} className="keen-slider__slide px-2">
              <Link to={`/blog/${blog.id}`} className="block h-full group">
                <div className="bg-black border border-white/5 rounded-2xl overflow-hidden hover:border-cyan-500/30 transition-all duration-500 h-full flex flex-col group-hover:-translate-y-1 group-hover:shadow-[0_10px_30px_-15px_rgba(6,182,212,0.3)]">
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
            </div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 mt-8 sm:hidden text-center">
        <Link
          to="/blogs"
          className="inline-flex items-center text-cyan-400 font-medium hover:text-cyan-300 transition-colors group"
        >
          View All Articles
          <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
        </Link>
      </div>
    </section>
  );
};

export default BlogsSlider;
