import { Link } from "react-router";
import { articles, getCategories } from "@/data/content";
import { seedArticles } from "@/imports/articles";

const primaryPages = [
  { to: "/", label: "Home", description: "Featured stories and the latest editorial work." },
  { to: "/articles", label: "All Articles", description: "The complete archive." },
  { to: "/categories", label: "Categories", description: "Browse the archive by subject." },
  { to: "/manona-trilogy", label: "The Manona Trilogy", description: "A three-part editorial series on Dr Wele Cecil Manona." },
  { to: "/about", label: "About AHNN", description: "About the African Heritage & News Network." },
  { to: "/search", label: "Search", description: "Search the archive." },
];

export default function SitemapPage() {
  return (
    <div className="bg-[#F7F4EE]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 pt-14 md:pt-20 pb-20">
        <div className="max-w-3xl mb-16 md:mb-20">
          <p className="text-[#B85725] text-xs tracking-[0.2em] uppercase mb-4 font-sans">Directory</p>
          <h1 className="text-5xl md:text-6xl leading-tight mb-5" style={{ fontFamily: '"DM Serif Display", Georgia, serif' }}>
            Sitemap
          </h1>
          <p className="text-[#6B6257] text-base leading-relaxed font-sans">
            A complete guide to the pages, series, categories, and articles published by AHNN.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-x-20 gap-y-16 max-w-6xl">
          <SitemapSection title="Pages">
            {primaryPages.map((page) => (
              <SitemapLink key={page.to} {...page} />
            ))}
          </SitemapSection>

          <SitemapSection title="Categories">
            {getCategories().map((category) => (
              <SitemapLink
                key={category.id}
                to={`/categories/${category.slug}`}
                label={category.label}
                description="View articles in this category."
              />
            ))}
          </SitemapSection>

          <SitemapSection title="The Manona Trilogy">
            {articles.map((article) => (
              <SitemapLink
                key={article.id}
                to={`/manona-trilogy/${article.slug}`}
                label={article.title}
                description={article.subtitle}
              />
            ))}
          </SitemapSection>

          <SitemapSection title="Archive">
            {seedArticles.map((article) => (
              <SitemapLink
                key={article.id}
                to={`/articles/${article.slug}`}
                label={article.title}
                description={article.category}
              />
            ))}
          </SitemapSection>

          <SitemapSection title="Information">
            <SitemapLink to="/privacy" label="Privacy Policy" description="How we handle information and privacy." />
            <SitemapLink to="/feedback" label="Feedback" description="Share a correction, suggestion, or response." />
          </SitemapSection>
        </div>
      </div>
    </div>
  );
}

function SitemapSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-[#6B6257] text-xs tracking-[0.2em] uppercase mb-5 font-sans">{title}</h2>
      <ul className="border-t border-[#DDD8CE]">
        {children}
      </ul>
    </section>
  );
}

function SitemapLink({ to, label, description }: { to: string; label: string; description: string }) {
  return (
    <li className="border-b border-[#DDD8CE]">
      <Link to={to} className="group flex items-start justify-between gap-5 py-5">
        <span>
          <span className="block text-[#1C1915] text-xl leading-snug transition-[color,transform] duration-200 group-hover:text-[#B85725] group-hover:translate-x-[3px]" style={{ fontFamily: '"DM Serif Display", Georgia, serif' }}>
            {label}
          </span>
          <span className="block text-[#6B6257] text-sm leading-relaxed mt-1 font-sans">{description}</span>
        </span>
        <span aria-hidden="true" className="mt-1 text-[#B85725] transition-transform duration-200 group-hover:translate-x-1">&#8599;</span>
      </Link>
    </li>
  );
}
