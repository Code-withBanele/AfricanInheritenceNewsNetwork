import { useLocation, useParams, Link } from "react-router";
import {
  getArticleBySlug, getRelatedArticles, getSeriesById, getSeriesArticles,
  getSeedArticleBySlug,
} from "@/data/content";
import ArticleContent from "@/components/ArticleContent";
import ShareButton from "@/components/ShareButton";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-ZA", { day: "numeric", month: "long", year: "numeric" });
}

// ── Imported (seed) article ────────────────────────────────────────────────
function SeedArticlePage({ slug }: { slug: string }) {
  const article = getSeedArticleBySlug(slug);
  if (!article) return <NotFoundInline />;

  return (
    <article className="bg-[#F7F4EE]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 pt-10 md:pt-14 pb-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 text-xs text-[#9C9589] mb-6 font-sans">
            <Link to="/" className="hover:text-[#B85725] transition-colors duration-200">Home</Link>
            <span>/</span>
            <Link to="/articles" className="hover:text-[#B85725] transition-colors duration-200">Articles</Link>
          </div>

          <p className="text-[#B85725] text-xs tracking-[0.15em] uppercase mb-3 font-sans">{article.category}</p>

          <h1
            className="text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.07] mb-5"
            style={{ fontFamily: '"DM Serif Display", Georgia, serif' }}
          >
            {article.title}
          </h1>

          <p
            className="text-[#4A4540] text-xl leading-relaxed mb-8 font-sans"
            style={{ fontFamily: '"DM Serif Display", Georgia, serif', fontStyle: "italic" }}
          >
            {article.excerpt}
          </p>

          <div className="flex items-center justify-between border-t border-b border-[#DDD8CE] py-4">
            <div>
              <p className="text-sm font-medium font-sans text-[#1C1915]">{article.author}</p>
              <p className="text-xs text-[#9C9589] font-sans">
                {formatDate(article.publishedAt)} &middot; {article.readingTime}
              </p>
            </div>
            <ShareButton title={article.title} text={article.excerpt} />
          </div>
        </div>
      </div>

      {article.image && (
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 mb-12">
          <div className="overflow-hidden bg-[#DDD8CE]" style={{ aspectRatio: "16/9" }}>
            <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
          </div>
        </div>
      )}

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 pb-16">
        <div className="max-w-2xl mx-auto">
          <ArticleContent blocks={article.content} />
        </div>
      </div>
    </article>
  );
}

// ── Trilogy / legacy article ───────────────────────────────────────────────
function LegacyArticlePage({ slug }: { slug: string }) {
  const article = getArticleBySlug(slug);
  if (!article) return <NotFoundInline />;

  const related = article.relatedSlugs ? getRelatedArticles(article.relatedSlugs).slice(0, 3) : [];
  const seriesData = article.seriesId ? getSeriesById(article.seriesId) : undefined;
  const seriesArticles = seriesData ? getSeriesArticles(seriesData.id) : [];

  return (
    <article className="bg-[#F7F4EE]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 pt-10 md:pt-14 pb-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 text-xs text-[#9C9589] mb-6 font-sans">
            <Link to="/" className="hover:text-[#B85725] transition-colors duration-200">Home</Link>
            <span>/</span>
            <Link to="/articles" className="hover:text-[#B85725] transition-colors duration-200">Articles</Link>
            {seriesData && (
              <>
                <span>/</span>
                <Link to={`/${seriesData.slug}`} className="hover:text-[#B85725] transition-colors duration-200">
                  {seriesData.title}
                </Link>
              </>
            )}
          </div>

          {seriesData && (
            <Link to={`/${seriesData.slug}`} className="inline-flex items-center gap-2 mb-5 group">
              <span className="text-[#B85725] text-[10px] tracking-[0.2em] uppercase font-sans border border-[#B85725] px-3 py-1 group-hover:bg-[#B85725] group-hover:text-[#F7F4EE] transition-colors duration-200">
                Part {article.seriesPosition} of {seriesArticles.length} — {seriesData.title}
              </span>
            </Link>
          )}

          <p className="text-[#B85725] text-xs tracking-[0.15em] uppercase mb-3 font-sans">{article.category}</p>

          <h1
            className="text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.07] mb-5"
            style={{ fontFamily: '"DM Serif Display", Georgia, serif' }}
          >
            {article.title}
          </h1>

          <p
            className="text-[#4A4540] text-xl md:text-2xl leading-relaxed mb-8 font-sans"
            style={{ fontFamily: '"DM Serif Display", Georgia, serif', fontStyle: "italic" }}
          >
            {article.subtitle}
          </p>

          <div className="flex items-center justify-between border-t border-b border-[#DDD8CE] py-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#DDD8CE] flex items-center justify-center text-[#6B6257] text-xs font-sans font-medium">
                {article.author.name.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-medium font-sans text-[#1C1915]">{article.author.name}</p>
                <p className="text-xs text-[#9C9589] font-sans">{article.date} &middot; {article.readTime}</p>
              </div>
            </div>
            <ShareButton title={article.title} text={article.excerpt} />
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 mb-12">
        <div className="overflow-hidden bg-[#DDD8CE]" style={{ aspectRatio: "16/9" }}>
          <img src={article.heroImage} alt={article.heroAlt} className="w-full h-full object-cover" />
        </div>
        {article.heroAlt && <p className="text-[#9C9589] text-xs mt-3 font-sans">{article.heroAlt}</p>}
      </div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 pb-16">
        <div className="max-w-2xl mx-auto">
          <p
            className="text-[#1C1915] text-xl md:text-2xl leading-relaxed mb-10 border-l-[3px] border-[#B85725] pl-6"
            style={{ fontFamily: '"DM Serif Display", Georgia, serif' }}
          >
            {article.excerpt}
          </p>
          <ArticleContent blocks={article.body} />
        </div>
      </div>

      {seriesData && seriesArticles.length > 1 && (
        <section className="bg-[#EFECE4] py-12 md:py-16">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
            <p className="text-[#6B6257] text-xs tracking-[0.2em] uppercase mb-8 font-sans">Continue the Series</p>
            <div className="grid md:grid-cols-3 gap-6">
              {seriesArticles.map((sa, i) => (
                <Link key={sa.id} to={`/manona-trilogy/${sa.slug}`}
                  className={`group p-6 border transition-all duration-200 ${sa.slug === article.slug ? "border-[#B85725] bg-white" : "border-[#DDD8CE] hover:border-[#B85725] bg-white"}`}
                >
                  <p className="text-[#B85725] text-[10px] tracking-[0.2em] uppercase mb-3 font-sans">Part {i + 1}</p>
                  <h3 className={`text-lg leading-snug mb-2 transition-[color,transform] duration-200 ${sa.slug === article.slug ? "text-[#B85725]" : "group-hover:text-[#B85725] group-hover:translate-y-[3px]"}`}
                    style={{ fontFamily: '"DM Serif Display", Georgia, serif' }}
                  >{sa.title}</h3>
                  <p className="text-[#9C9589] text-xs font-sans">
                    {sa.status === "coming-soon" ? "Coming Soon" : "Released · Read Now"}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-20">
          <p className="text-[#6B6257] text-xs tracking-[0.2em] uppercase mb-10 font-sans">Related Reading</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {related.map((ra) => (
              <Link key={ra.id} to={`/articles/${ra.slug}`} className="group">
                <div className="overflow-hidden bg-[#DDD8CE] mb-4" style={{ aspectRatio: "16/9" }}>
                  <img src={ra.heroImage} alt={ra.heroAlt} loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
                </div>
                <p className="text-[#B85725] text-[10px] tracking-[0.15em] uppercase mb-1 font-sans">{ra.category}</p>
                <h3 className="text-xl leading-snug transition-colors duration-200 group-hover:text-[#B85725]"
                  style={{ fontFamily: '"DM Serif Display", Georgia, serif' }}>{ra.title}</h3>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}

function NotFoundInline() {
  return (
    <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 py-24 text-center">
      <h1 className="text-4xl mb-4" style={{ fontFamily: '"DM Serif Display", Georgia, serif' }}>Article not found</h1>
      <Link to="/articles" className="text-[#B85725] underline font-sans">All articles</Link>
    </div>
  );
}

function ComingSoonPage({ articleNumber }: { articleNumber: number }) {
  return (
    <article className="bg-[#F7F4EE] min-h-[70vh] flex items-center">
      <div className="max-w-[1440px] mx-auto w-full px-6 md:px-12 lg:px-20 py-24 md:py-32">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-[#B85725] text-xs tracking-[0.2em] uppercase mb-5 font-sans">
            Manona Trilogy · Article {articleNumber}
          </p>
          <h1
            className="text-5xl md:text-7xl leading-tight mb-6"
            style={{ fontFamily: '"DM Serif Display", Georgia, serif' }}
          >
            Coming Soon
          </h1>
          <p className="text-[#6B6257] text-lg md:text-xl leading-relaxed mb-10 font-sans">
            Chapter {articleNumber} of the Manona Trilogy has not yet been released.
          </p>
          <Link
            to="/manona-trilogy"
            className="inline-flex items-center gap-2 text-sm text-[#1C1915] border border-[#1C1915] px-5 py-3 hover:bg-[#1C1915] hover:text-[#F7F4EE] transition-colors duration-200 font-sans"
          >
            Return to the Trilogy
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const { pathname } = useLocation();
  if (!slug) return <NotFoundInline />;

  const trilogyArticle = getArticleBySlug(slug);
  if (trilogyArticle?.status === "coming-soon") {
    return <ComingSoonPage articleNumber={trilogyArticle.seriesPosition ?? 2} />;
  }

  // Trilogy articles use their own URL namespace, avoiding collisions with
  // imported archive articles that may share a slug.
  const isTrilogyArticle = pathname.startsWith("/manona-trilogy/");
  const isSeed = !isTrilogyArticle && !!getSeedArticleBySlug(slug);
  return isSeed ? <SeedArticlePage slug={slug} /> : <LegacyArticlePage slug={slug} />;
}
