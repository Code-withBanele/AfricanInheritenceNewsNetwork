import { Link } from "react-router";
import { articles } from "@/data/content";
import { seedArticles } from "@/imports/articles";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-ZA", { day: "numeric", month: "long", year: "numeric" });
}

export default function ArticlesPage() {
  // Seed articles sorted newest first
  const sorted = [...seedArticles].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  return (
    <div className="bg-[#F7F4EE]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 pt-14 md:pt-20 pb-20">
        <p className="text-[#6B6257] text-xs tracking-[0.2em] uppercase mb-4 font-sans">Archive</p>
        <h1
          className="text-5xl md:text-6xl leading-tight mb-16"
          style={{ fontFamily: '"DM Serif Display", Georgia, serif' }}
        >
          All Articles
        </h1>

        {/* Imported articles */}
        <div className="flex flex-col gap-0">
          {sorted.map((article, i) => (
            <div key={article.id} className={i > 0 ? "border-t border-[#DDD8CE]" : ""}>
              <Link
                to={`/articles/${article.slug}`}
                className="group grid md:grid-cols-[1fr_240px] gap-6 md:gap-10 items-center py-10"
              >
                <div>
                  <p className="text-[#B85725] text-[10px] tracking-[0.15em] uppercase mb-2 font-sans">{article.category}</p>
                  <h2
                    className="text-2xl md:text-3xl leading-snug mb-3 transition-colors duration-200 group-hover:text-[#B85725]"
                    style={{ fontFamily: '"DM Serif Display", Georgia, serif' }}
                  >
                    {article.title}
                  </h2>
                  <p className="text-[#6B6257] text-sm leading-relaxed mb-4 font-sans max-w-xl line-clamp-2">
                    {article.excerpt}
                  </p>
                  <p className="text-[#9C9589] text-xs font-sans">
                    {article.author} &mdash; {formatDate(article.publishedAt)} &mdash; {article.readingTime}
                  </p>
                </div>
                {article.image && (
                  <div className="hidden md:block overflow-hidden bg-[#DDD8CE]" style={{ aspectRatio: "4/3" }}>
                    <img
                      src={article.image}
                      alt={article.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  </div>
                )}
              </Link>
            </div>
          ))}
        </div>

        {/* Trilogy articles */}
        {articles.length > 0 && (
          <>
            <div className="border-t-2 border-[#DDD8CE] my-12" />
            <p className="text-[#6B6257] text-xs tracking-[0.2em] uppercase mb-8 font-sans">The Manona Trilogy</p>
            <div className="flex flex-col gap-0">
              {articles.map((article, i) => (
                <div key={article.id} className={i > 0 ? "border-t border-[#DDD8CE]" : ""}>
                  <Link
                    to={`/articles/${article.slug}`}
                    className="group grid md:grid-cols-[1fr_240px] gap-6 md:gap-10 items-center py-10"
                  >
                    <div>
                      <p className="text-[#B85725] text-[10px] tracking-[0.15em] uppercase mb-2 font-sans">{article.category}</p>
                      <h2
                        className="text-2xl md:text-3xl leading-snug mb-3 transition-colors duration-200 group-hover:text-[#B85725]"
                        style={{ fontFamily: '"DM Serif Display", Georgia, serif' }}
                      >
                        {article.title}
                      </h2>
                      <p className="text-[#6B6257] text-sm leading-relaxed mb-4 font-sans max-w-xl">{article.subtitle}</p>
                      <p className="text-[#9C9589] text-xs font-sans">
                        {article.author.name} &mdash; {article.date} &mdash; {article.readTime}
                      </p>
                    </div>
                    <div className="hidden md:block overflow-hidden bg-[#DDD8CE]" style={{ aspectRatio: "4/3" }}>
                      <img
                        src={article.heroImage}
                        alt={article.heroAlt}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      />
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
