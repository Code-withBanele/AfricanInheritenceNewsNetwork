import { Link } from "react-router";
import { series, getSeriesArticles } from "@/data/content";

export default function ManonaTrilogyPage() {
  const trilogy = series[0];
  const articles = getSeriesArticles(trilogy.id);

  return (
    <div className="bg-[#F7F4EE]">
      {/* Hero */}
      <section className="relative h-[60vh] md:h-[75vh] overflow-hidden bg-[#1C1915]">
        <img
          src={trilogy.heroImage}
          alt={trilogy.heroAlt}
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1C1915]/30 via-transparent to-[#1C1915]/80" />
        <div className="absolute bottom-0 left-0 right-0 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 pb-12 md:pb-16">
          <span className="inline-block border border-[#B85725] text-[#B85725] text-[10px] tracking-[0.25em] uppercase px-3 py-1 mb-5 font-sans">
            Editorial Series
          </span>
          <h1
            className="text-[#F7F4EE] text-4xl md:text-6xl lg:text-7xl leading-[1.05] max-w-4xl"
            style={{ fontFamily: '"DM Serif Display", Georgia, serif' }}
          >
            {trilogy.title}
          </h1>
        </div>
      </section>

      {/* Introduction */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 py-14 md:py-20">
        <div className="grid lg:grid-cols-[200px_1fr] gap-8 lg:gap-16">
          <div>
            <p className="text-[#6B6257] text-xs tracking-[0.15em] uppercase font-sans">About this series</p>
          </div>
          <div className="max-w-3xl">
            <p className="text-[#1C1915] text-xl md:text-2xl leading-relaxed font-sans" style={{ fontFamily: '"DM Serif Display", Georgia, serif' }}>
              {trilogy.description}
            </p>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="border-t border-[#DDD8CE]" />
      </div>

      {/* Articles */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 py-14 md:py-20">
        <p className="text-[#6B6257] text-xs tracking-[0.2em] uppercase mb-12 font-sans">Three Parts</p>

        <div className="flex flex-col gap-0">
          {articles.map((article, i) => (
            <div key={article.id} className={i > 0 ? "border-t border-[#DDD8CE]" : ""}>
              <Link
                to={`/manona-trilogy/${article.slug}`}
                aria-label={`Read ${article.title}`}
                className="group relative z-10 grid cursor-pointer md:grid-cols-[80px_1fr_320px] gap-6 md:gap-10 items-center py-10 md:py-14"
              >
                {/* Number */}
                <div>
                  <span
                    className="text-[4rem] md:text-[5rem] leading-none text-[#DDD8CE] transition-colors duration-300 group-hover:text-[#B85725]/30 select-none"
                    style={{ fontFamily: '"DM Serif Display", Georgia, serif' }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Text */}
                <div>
                  <p className="text-[#B85725] text-[10px] tracking-[0.15em] uppercase mb-3 font-sans">{article.category}</p>
                  <h2
                    className="text-[#1C1915] text-2xl md:text-3xl leading-tight mb-3 transition-[color,transform] duration-200 group-hover:text-[#B85725] group-hover:translate-y-[3px]"
                    style={{ fontFamily: '"DM Serif Display", Georgia, serif' }}
                  >
                    {article.title}
                  </h2>
                  <p className="text-[#4A4540] text-base leading-relaxed mb-4 font-sans max-w-xl">{article.subtitle}</p>
                  <p className="text-[#9C9589] text-xs font-sans">
                    {article.author.name} &mdash; {article.date} &mdash; {article.readTime}
                  </p>
                </div>

                {/* Image */}
                <div className="hidden md:block overflow-hidden bg-[#DDD8CE]" style={{ aspectRatio: "16/10" }}>
                  <img
                    src={article.heroImage}
                    alt={article.heroAlt}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Return */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 pb-16 md:pb-20">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-[#6B6257] hover:text-[#1C1915] transition-colors duration-200 font-sans"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back to Home
        </Link>
      </div>
    </div>
  );
}
