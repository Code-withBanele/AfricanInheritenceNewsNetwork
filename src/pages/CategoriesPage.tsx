import { Link, useParams } from "react-router";
import { getCategories, getAllArticlesByCategory } from "@/data/content";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-ZA", { day: "numeric", month: "long", year: "numeric" });
}

export function CategoriesIndexPage() {
  const categories = getCategories();

  return (
    <div className="bg-[#F7F4EE]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 pt-14 md:pt-20 pb-20">
        <p className="text-[#6B6257] text-xs tracking-[0.2em] uppercase mb-4 font-sans">Browse</p>
        <h1
          className="text-5xl md:text-6xl leading-tight mb-16"
          style={{ fontFamily: '"DM Serif Display", Georgia, serif' }}
        >
          Categories
        </h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#DDD8CE]">
          {categories.map((cat) => {
            const { legacy, seed } = getAllArticlesByCategory(cat.slug);
            const total = legacy.length + seed.length;
            return (
              <Link
                key={cat.id}
                to={`/categories/${cat.slug}`}
                className="group bg-[#F7F4EE] p-8 md:p-10 hover:bg-[#EFECE4] transition-colors duration-200"
              >
                <h2
                  className="text-2xl md:text-3xl leading-tight mb-4 transition-colors duration-200 group-hover:text-[#B85725]"
                  style={{ fontFamily: '"DM Serif Display", Georgia, serif' }}
                >
                  {cat.label}
                </h2>
                <p className="text-[#9C9589] text-xs font-sans">
                  {total} article{total !== 1 ? "s" : ""}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const categories = getCategories();
  const cat = categories.find((c) => c.slug === slug);
  const { legacy, seed } = slug ? getAllArticlesByCategory(slug) : { legacy: [], seed: [] };
  const otherCats = categories.filter((c) => c.slug !== slug);

  if (!cat) {
    return (
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 py-24 text-center">
        <h1 className="text-4xl mb-4" style={{ fontFamily: '"DM Serif Display", Georgia, serif' }}>Category not found</h1>
        <Link to="/categories" className="text-[#B85725] underline font-sans">All categories</Link>
      </div>
    );
  }

  const totalCount = legacy.length + seed.length;

  return (
    <div className="bg-[#F7F4EE]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 pt-14 md:pt-20">
        <div className="flex items-center gap-2 text-xs text-[#9C9589] mb-10 font-sans">
          <Link to="/" className="hover:text-[#B85725] transition-colors duration-200">Home</Link>
          <span>/</span>
          <Link to="/categories" className="hover:text-[#B85725] transition-colors duration-200">Categories</Link>
          <span>/</span>
          <span className="text-[#1C1915]">{cat.label}</span>
        </div>

        <p className="text-[#B85725] text-xs tracking-[0.15em] uppercase mb-2 font-sans">Category</p>
        <h1
          className="text-5xl md:text-6xl leading-tight mb-4"
          style={{ fontFamily: '"DM Serif Display", Georgia, serif' }}
        >
          {cat.label}
        </h1>
        <p className="text-[#6B6257] text-sm mb-14 font-sans">
          {totalCount} article{totalCount !== 1 ? "s" : ""}
        </p>

        <div className="flex flex-wrap gap-3 mb-14">
          {otherCats.map((c) => (
            <Link
              key={c.id}
              to={`/categories/${c.slug}`}
              className="text-xs border border-[#DDD8CE] px-4 py-2 text-[#6B6257] hover:border-[#B85725] hover:text-[#B85725] transition-all duration-200 font-sans"
            >
              {c.label}
            </Link>
          ))}
        </div>

        {totalCount === 0 ? (
          <p className="text-[#6B6257] text-base font-sans py-12">No articles in this category yet.</p>
        ) : (
          <div className="flex flex-col gap-0 pb-20">
            {/* Seed articles */}
            {seed.map((article, i) => (
              <div key={article.id} className={(i > 0 || legacy.length > 0) ? "border-t border-[#DDD8CE]" : ""}>
                <Link
                  to={`/articles/${article.slug}`}
                  className="group grid md:grid-cols-[1fr_240px] gap-6 md:gap-10 items-center py-10"
                >
                  <div>
                    <h2
                      className="text-2xl md:text-3xl leading-snug mb-3 transition-colors duration-200 group-hover:text-[#B85725]"
                      style={{ fontFamily: '"DM Serif Display", Georgia, serif' }}
                    >
                      {article.title}
                    </h2>
                    <p className="text-[#6B6257] text-sm leading-relaxed mb-4 font-sans line-clamp-2">{article.excerpt}</p>
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
            {/* Legacy articles (series stubs with real content) */}
            {legacy.map((article, i) => (
              <div key={article.id} className={(i > 0 || seed.length > 0) ? "border-t border-[#DDD8CE]" : ""}>
                <Link
                  to={`/articles/${article.slug}`}
                  className="group grid md:grid-cols-[1fr_240px] gap-6 md:gap-10 items-center py-10"
                >
                  <div>
                    <h2
                      className="text-2xl md:text-3xl leading-snug mb-3 transition-colors duration-200 group-hover:text-[#B85725]"
                      style={{ fontFamily: '"DM Serif Display", Georgia, serif' }}
                    >
                      {article.title}
                    </h2>
                    <p className="text-[#6B6257] text-sm leading-relaxed mb-4 font-sans line-clamp-2">{article.subtitle}</p>
                    <p className="text-[#9C9589] text-xs font-sans">
                      {article.author.name} &mdash; {article.date} &mdash; {article.readTime}
                    </p>
                  </div>
                  <div className="hidden md:block overflow-hidden bg-[#DDD8CE]" style={{ aspectRatio: "4/3" }}>
                    <img src={article.heroImage} alt={article.heroAlt} loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
