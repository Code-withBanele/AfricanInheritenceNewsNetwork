import { useEffect, useRef } from "react";
import { Link } from "react-router";
import { articles, series, getCategories } from "@/data/content";
import { seedArticles } from "@/imports/articles";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-ZA", { day: "numeric", month: "long", year: "numeric" });
}

export default function Home() {
  const trilogy = series[0];
  const trilogyArticles = trilogy.articleIds
    .map((id) => articles.find((a) => a.id === id))
    .filter(Boolean) as typeof articles;

  const heroRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;
    let ticking = false;
    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          // Move image at 40% of scroll speed — creates depth without disorientation
          img!.style.transform = `translateY(${scrollY * 0.4}px) scale(1.1)`;
          ticking = false;
        });
        ticking = true;
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const featured = seedArticles.filter((a) => a.featured);
  const recent = [...seedArticles]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 5);

  return (
    <div className="bg-[#F7F4EE]">
      {/* ── HERO: Trilogy ── */}
      <section
        ref={heroRef}
        className="relative overflow-hidden bg-[#1C1915]"
        style={{ minHeight: "92vh" }}
      >
        {/* Full-bleed parallax underlay */}
        <img
          ref={imgRef}
          src={trilogy.heroImage}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover will-change-transform"
          style={{ transform: "translateY(0px) scale(1.1)" }}
        />
        {/* Gradient overlay — heavier at bottom for legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/80" />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-end max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 pb-14 md:pb-20 pt-32">
          <div className="max-w-3xl">
            <span className="inline-block border border-[#B85725] text-[#B85725] text-[10px] tracking-[0.25em] uppercase px-3 py-1 font-sans mb-6
              opacity-0 animate-[fadeUp_0.8s_cubic-bezier(.4,0,.2,1)_0.5s_forwards]">
              Featured Series
            </span>

            <Link to="/manona-trilogy" className="group block">
              <h1
                className="text-[#F7F4EE] text-4xl md:text-6xl lg:text-7xl leading-[1.04] mb-6 transition-colors duration-300 group-hover:text-[#E8C4A8]
                  opacity-0 animate-[fadeUp_0.9s_cubic-bezier(.4,0,.2,1)_0.65s_forwards]"
                style={{ fontFamily: '"DM Serif Display", Georgia, serif', WebkitTextStroke: '0.5px rgba(0,0,0,0.4)', textShadow: '0 1px 3px rgba(0,0,0,0.6), 0 4px 16px rgba(0,0,0,0.3)' }}
              >
                {trilogy.title}
              </h1>
            </Link>

            <p className="text-[#C8C0B4] text-base md:text-lg leading-relaxed mb-10 max-w-2xl
              opacity-0 animate-[fadeUp_0.9s_cubic-bezier(.4,0,.2,1)_0.8s_forwards] font-sans [text-shadow:0_1px_4px_rgba(0,0,0,0.5)]">
              {trilogy.description.slice(0, 220)}&hellip;
            </p>

            {/* Trilogy index */}
            <div className="border-t border-white/20 pt-7 flex flex-col gap-4 mb-10">
              {trilogyArticles.map((article, i) => (
                <Link key={article.id} to={`/manona-trilogy/${article.slug}`} aria-label={`Read ${article.title}`} className="group/item relative z-10 flex cursor-pointer items-start gap-4">
                  <span className="flex-shrink-0 text-[#B85725] text-sm font-sans font-medium" style={{ minWidth: 24 }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h4 className="text-[#F7F4EE] text-sm font-sans font-medium leading-snug transition-[color,transform] duration-200 group-hover/item:text-[#B85725] group-hover/item:translate-y-[3px]">
                      {article.title}
                    </h4>
                    <p className="text-white/40 text-xs mt-0.5 font-sans">{article.readTime}</p>
                  </div>
                </Link>
              ))}
            </div>

            <Link
              to="/manona-trilogy"
              className="inline-flex items-center gap-2 text-sm text-[#F7F4EE] border border-white/40 px-5 py-3
                hover:bg-[#F7F4EE] hover:text-[#1C1915] hover:border-[#F7F4EE] transition-all duration-300 self-start font-sans
                opacity-0 animate-[fadeUp_0.9s_cubic-bezier(.4,0,.2,1)_1.1s_forwards]"
            >
              Enter the Series
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="border-t border-[#DDD8CE]" />
      </div>


      {/* ── FEATURED ARTICLES ── */}
      {featured.length > 0 && (
        <section className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-20">
          <div className="flex items-baseline justify-between mb-10">
            <h2 className="text-xs tracking-[0.2em] uppercase text-[#6B6257] font-sans">Featured</h2>
            <Link to="/articles" className="text-xs text-[#B85725] hover:underline font-sans">All articles →</Link>
          </div>
          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            {featured.slice(0, 2).map((article) => (
              <Link key={article.id} to={`/articles/${article.slug}`} className="group block">
                {article.image && (
                  <div className="overflow-hidden bg-[#DDD8CE] mb-5" style={{ aspectRatio: "16/9" }}>
                    <img src={article.image} alt={article.title} loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  </div>
                )}
                <p className="text-[#B85725] text-xs tracking-[0.15em] uppercase mb-2 font-sans">{article.category}</p>
                <h2 className="text-3xl md:text-4xl leading-tight mb-3 transition-colors duration-200 group-hover:text-[#B85725]"
                  style={{ fontFamily: '"DM Serif Display", Georgia, serif' }}>
                  {article.title}
                </h2>
                <p className="text-[#6B6257] text-base leading-relaxed mb-3 font-sans line-clamp-2">{article.excerpt}</p>
                <p className="text-[#9C9589] text-xs font-sans">{article.author} &mdash; {formatDate(article.publishedAt)}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="border-t border-[#DDD8CE]" />
      </div>

      {/* ── RECENT ── */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-20">
        <div className="flex items-baseline justify-between mb-10">
          <h2 className="text-xs tracking-[0.2em] uppercase text-[#6B6257] font-sans">Recent</h2>
        </div>
        <div className="flex flex-col gap-0">
          {recent.map((article, i) => (
            <div key={article.id} className={i > 0 ? "border-t border-[#DDD8CE]" : ""}>
              <Link to={`/articles/${article.slug}`}
                className="group grid md:grid-cols-[1fr_200px] gap-6 items-center py-8"
              >
                <div>
                  <p className="text-[#B85725] text-[10px] tracking-[0.15em] uppercase mb-2 font-sans">{article.category}</p>
                  <h3 className="text-xl md:text-2xl leading-snug mb-2 transition-colors duration-200 group-hover:text-[#B85725]"
                    style={{ fontFamily: '"DM Serif Display", Georgia, serif' }}>
                    {article.title}
                  </h3>
                  <p className="text-[#6B6257] text-sm leading-relaxed mb-3 font-sans line-clamp-2">{article.excerpt}</p>
                  <p className="text-[#9C9589] text-xs font-sans">
                    {article.author} &mdash; {formatDate(article.publishedAt)} &mdash; {article.readingTime}
                  </p>
                </div>
                {article.image && (
                  <div className="hidden md:block overflow-hidden bg-[#DDD8CE]" style={{ aspectRatio: "4/3" }}>
                    <img src={article.image} alt={article.title} loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
                  </div>
                )}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section className="bg-[#1C1915] py-16 md:py-20">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
          <p className="text-[#9C9589] text-xs tracking-[0.2em] uppercase mb-10 font-sans">Explore by Category</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-[#2E2B27]">
            {getCategories().map((cat) => (
              <Link key={cat.id} to={`/categories/${cat.slug}`}
                className="group bg-[#1C1915] px-5 py-8 hover:bg-[#B85725] active:translate-x-[3px] active:translate-y-[3px] transition-all duration-150">
                <h3 className="text-[#F7F4EE] text-lg leading-tight mb-2 transition-colors duration-300"
                  style={{ fontFamily: '"DM Serif Display", Georgia, serif' }}>{cat.label}</h3>
                <p className="text-[#6B6257] text-xs leading-snug group-hover:text-[#F7F4EE]/70 transition-colors duration-300 font-sans">
                  &rarr;
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
