import { Link } from "react-router";
import logoImg from "@/imports/Frame1/f9eb0c431aeee7540324fcfe5f4dba822951b059.png";
import { getCategories } from "@/data/content";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#1C1915] text-[#F7F4EE] mt-24">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-5">
              <img src={logoImg} alt="AHNN" className="h-12 w-auto brightness-0 invert opacity-90" />
            </Link>
            <p className="text-[#9C9589] text-sm leading-relaxed max-w-sm">
              African Heritage &amp; News Network documents the stories, memories, histories, and ideas that constitute African heritage — past, present, and still unfolding.
            </p>
            <div className="flex gap-4 mt-6">
              {/* Social icons */}
              {[
                { label: "X / Twitter", path: "M4 4l16 16M4 20 20 4" },
                { label: "Instagram", path: "M12 2H8C4.7 2 2 4.7 2 8v8c0 3.3 2.7 6 6 6h8c3.3 0 6-2.7 6-6V8c0-3.3-2.7-6-6-6zm0 0" },
              ].map(({ label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-8 h-8 border border-[#3A3630] flex items-center justify-center text-[#9C9589] hover:text-[#B85725] hover:border-[#B85725] transition-all duration-200"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-[#9C9589] text-xs tracking-[0.15em] uppercase mb-5 font-sans">Navigation</h3>
            <ul className="flex flex-col gap-3">
              {[
                { to: "/", label: "Home" },
                { to: "/articles", label: "Articles" },
                { to: "/categories", label: "Categories" },
                { to: "/about", label: "About" },
                { to: "/search", label: "Search" },
                { to: "/manona-trilogy", label: "The Manona Trilogy" },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-sm text-[#C8C0B4] hover:text-[#F7F4EE] transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-[#9C9589] text-xs tracking-[0.15em] uppercase mb-5 font-sans">Categories</h3>
            <ul className="flex flex-col gap-3">
              {getCategories().map((cat) => (
                <li key={cat.id}>
                  <Link
                    to={`/categories/${cat.slug}`}
                    className="text-sm text-[#C8C0B4] hover:text-[#F7F4EE] transition-colors duration-200"
                  >
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#2E2B27] pt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <p className="text-[#6B6257] text-xs">
            &copy; {year} African Heritage &amp; News Network. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-xs text-[#6B6257] hover:text-[#9C9589] transition-colors duration-200">
              Privacy Policy
            </Link>
            <Link to="/feedback" className="text-xs text-[#6B6257] hover:text-[#9C9589] transition-colors duration-200">
              Feedback
            </Link>
            <Link to="/sitemap" className="text-xs text-[#6B6257] hover:text-[#9C9589] transition-colors duration-200">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
