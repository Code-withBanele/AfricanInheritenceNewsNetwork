import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router";
import { searchArticles, searchSeedArticles } from "@/data/content";

function formatDate(iso: string) {
  try { return new Date(iso).toLocaleDateString("en-ZA", { day: "numeric", month: "long", year: "numeric" }); }
  catch { return iso; }
}

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQ = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQ);
  const [submitted, setSubmitted] = useState(initialQ);

  useEffect(() => {
    setQuery(searchParams.get("q") || "");
    setSubmitted(searchParams.get("q") || "");
  }, [searchParams]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim();
    setSubmitted(q);
    setSearchParams(q ? { q } : {});
  }

  const seedResults = submitted.trim() ? searchSeedArticles(submitted.trim()) : [];
  const trilogyResults = submitted.trim() ? searchArticles(submitted.trim()) : [];
  const total = seedResults.length + trilogyResults.length;

  return (
    <div className="bg-[#F7F4EE]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 pt-14 md:pt-20 pb-20">
        <p className="text-[#6B6257] text-xs tracking-[0.2em] uppercase mb-6 font-sans">Search</p>

        <form onSubmit={handleSubmit} className="mb-12 md:mb-16">
          <div className="relative border-b-2 border-[#1C1915] flex items-center gap-4">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles, authors, topics…"
              className="flex-1 bg-transparent text-3xl md:text-4xl py-4 outline-none placeholder-[#DDD8CE] text-[#1C1915] font-sans"
              style={{ fontFamily: '"DM Serif Display", Georgia, serif' }}
            />
            <button type="submit" className="flex-shrink-0 text-[#B85725] hover:text-[#1C1915] transition-colors duration-200" aria-label="Search">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
            </button>
          </div>
        </form>

        {submitted && (
          <div>
            <p className="text-[#6B6257] text-sm mb-8 font-sans">
              {total === 0 ? `No results for "${submitted}"` : `${total} result${total !== 1 ? "s" : ""} for "${submitted}"`}
            </p>

            <div className="flex flex-col gap-0">
              {seedResults.map((article, i) => (
                <div key={article.id} className={i > 0 ? "border-t border-[#DDD8CE]" : ""}>
                  <Link to={`/articles/${article.slug}`} className="group grid md:grid-cols-[1fr_160px] gap-6 items-center py-8">
                    <div>
                      <p className="text-[#B85725] text-[10px] tracking-[0.15em] uppercase mb-2 font-sans">
                        {article.category} &middot; {formatDate(article.publishedAt)}
                      </p>
                      <h3 className="text-2xl leading-snug mb-2 transition-colors duration-200 group-hover:text-[#B85725]"
                        style={{ fontFamily: '"DM Serif Display", Georgia, serif' }}>{article.title}</h3>
                      <p className="text-[#6B6257] text-sm leading-relaxed mb-2 font-sans line-clamp-2">{article.excerpt}</p>
                      <p className="text-[#9C9589] text-xs font-sans">{article.author}</p>
                    </div>
                    {article.image && (
                      <div className="hidden md:block overflow-hidden bg-[#DDD8CE]" style={{ aspectRatio: "1/1" }}>
                        <img src={article.image} alt={article.title} loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]" />
                      </div>
                    )}
                  </Link>
                </div>
              ))}
              {trilogyResults.map((article, i) => (
                <div key={article.id} className={(seedResults.length + i) > 0 ? "border-t border-[#DDD8CE]" : ""}>
                  <Link to={`/articles/${article.slug}`} className="group grid md:grid-cols-[1fr_160px] gap-6 items-center py-8">
                    <div>
                      <p className="text-[#B85725] text-[10px] tracking-[0.15em] uppercase mb-2 font-sans">
                        {article.category} &middot; {article.date}
                      </p>
                      <h3 className="text-2xl leading-snug mb-2 transition-colors duration-200 group-hover:text-[#B85725]"
                        style={{ fontFamily: '"DM Serif Display", Georgia, serif' }}>{article.title}</h3>
                      <p className="text-[#6B6257] text-sm leading-relaxed mb-2 font-sans line-clamp-2">{article.excerpt}</p>
                      <p className="text-[#9C9589] text-xs font-sans">{article.author.name}</p>
                    </div>
                    <div className="hidden md:block overflow-hidden bg-[#DDD8CE]" style={{ aspectRatio: "1/1" }}>
                      <img src={article.heroImage} alt={article.heroAlt} loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]" />
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {!submitted && (
          <p className="text-[#9C9589] text-base font-sans py-12">Begin typing to search the archive.</p>
        )}
      </div>
    </div>
  );
}
