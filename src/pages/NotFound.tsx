import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 py-24 text-center">
      <h1 className="text-8xl mb-6 text-[#DDD8CE]" style={{ fontFamily: '"DM Serif Display", Georgia, serif' }}>404</h1>
      <p className="text-[#6B6257] text-xl mb-8 font-sans">This page could not be found.</p>
      <Link to="/" className="text-sm text-[#B85725] border border-[#B85725] px-6 py-3 hover:bg-[#B85725] hover:text-[#F7F4EE] transition-all duration-200 font-sans">
        Return Home
      </Link>
    </div>
  );
}
