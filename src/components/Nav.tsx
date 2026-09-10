import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import logoImg from "@/imports/Frame1/f9eb0c431aeee7540324fcfe5f4dba822951b059.png";

type Theme = "light" | "dark";
type TextSize = "small" | "medium" | "large";

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [theme, setTheme] = useState<Theme>(() =>
    localStorage.getItem("ahnn-theme") === "dark" ? "dark" : "light"
  );
  const [textSize, setTextSize] = useState<TextSize>(() => {
    const saved = localStorage.getItem("ahnn-text-size");
    return saved === "small" || saved === "large" ? saved : "medium";
  });
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.dataset.textSize = textSize;
    document.body.dataset.theme = theme;
    document.body.dataset.textSize = textSize;
    localStorage.setItem("ahnn-theme", theme);
    localStorage.setItem("ahnn-text-size", textSize);
  }, [theme, textSize]);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setSearchOpen(false);
    }
  }

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm tracking-wide transition-all duration-200 relative ${
      isActive
        ? "text-[#B85725]"
        : "text-[#1C1915] hover:text-[#B85725]"
    } after:absolute after:bottom-[-2px] after:left-0 after:h-[1px] after:bg-[#B85725] after:transition-all after:duration-300 ${
      isActive ? "after:w-full" : "after:w-0 hover:after:w-full"
    }`;

  const preferenceControls = (
    <div className="flex items-center gap-2 text-xs font-sans" aria-label="Display preferences">
      <div className="flex items-center border border-[#DDD8CE]" role="group" aria-label="Text size">
        {(["small", "medium", "large"] as TextSize[]).map((size) => (
          <button
            key={size}
            type="button"
            aria-pressed={textSize === size}
            onClick={() => setTextSize(size)}
            className={`min-w-7 px-1.5 py-1 transition-colors ${
              textSize === size
                ? "bg-[#1C1915] text-[#F7F4EE]"
                : "text-[#6B6257] hover:text-[#B85725]"
            }`}
          >
            {size === "small" ? "A-" : size === "large" ? "A+" : "A"}
          </button>
        ))}
      </div>
      <button
        type="button"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        className="w-8 h-8 border border-[#DDD8CE] text-[#6B6257] hover:text-[#B85725] transition-colors"
      >
        {theme === "light" ? "☾" : "☀"}
      </button>
    </div>
  );

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-[#F7F4EE]/95 backdrop-blur-sm shadow-[0_2px_16px_0_rgba(28,25,21,0.10),0_1px_0_0_#DDD8CE]" : "bg-[#F7F4EE]"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <img
                src={logoImg}
                alt="AHNN — African Heritage &amp; News Network"
                className="h-12 md:h-14 w-auto object-contain"
              />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-8 lg:gap-10">
              <NavLink to="/" end className={linkClass}>Home</NavLink>
              <NavLink to="/articles" className={linkClass}>Articles</NavLink>
              <NavLink to="/categories" className={linkClass}>Categories</NavLink>
              <NavLink to="/about" className={linkClass}>About</NavLink>
              {preferenceControls}
              <button
                onClick={() => setSearchOpen(true)}
                aria-label="Search"
                className="ml-2 text-[#6B6257] hover:text-[#B85725] transition-colors duration-200"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
              </button>
            </nav>

            {/* Mobile controls */}
            <div className="flex items-center gap-4 md:hidden">
              <button
                onClick={() => setSearchOpen(true)}
                aria-label="Search"
                className="text-[#6B6257] hover:text-[#B85725] transition-colors duration-200"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
              </button>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                className="text-[#1C1915] transition-colors duration-200"
              >
                {menuOpen ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                    <path d="M18 6 6 18M6 6l12 12"/>
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                    <path d="M3 12h18M3 6h18M3 18h18"/>
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out border-t border-[#DDD8CE] ${
            menuOpen ? "max-h-72 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="flex flex-col px-6 py-4 gap-0 bg-[#F7F4EE]">
            {[
              { to: "/", label: "Home", end: true },
              { to: "/articles", label: "Articles" },
              { to: "/categories", label: "Categories" },
              { to: "/about", label: "About" },
            ].map(({ to, label, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `py-3 text-base border-b border-[#DDD8CE] last:border-0 transition-colors duration-200 ${
                    isActive ? "text-[#B85725]" : "text-[#1C1915]"
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
            <div className="pt-4 mt-1 border-t border-[#DDD8CE]">
              {preferenceControls}
            </div>
          </nav>
        </div>
      </header>

      {/* Search overlay */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#1C1915]/80 backdrop-blur-sm flex items-start justify-center pt-24 px-6 transition-opacity duration-200"
          onClick={(e) => { if (e.target === e.currentTarget) setSearchOpen(false); }}
        >
          <div className="w-full max-w-2xl">
            <form onSubmit={handleSearch} className="relative">
              <input
                autoFocus
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles, topics, people…"
                className="w-full bg-[#F7F4EE] text-[#1C1915] placeholder-[#6B6257] text-xl md:text-2xl px-6 py-5 pr-16 outline-none font-[var(--font-serif)]"
                style={{ fontFamily: '"DM Serif Display", Georgia, serif' }}
              />
              <button
                type="submit"
                className="absolute right-5 top-1/2 -translate-y-1/2 text-[#B85725]"
                aria-label="Submit search"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
              </button>
            </form>
            <p className="text-[#6B6257] text-xs mt-3 px-1">Press Esc to close</p>
          </div>
        </div>
      )}
    </>
  );
}
