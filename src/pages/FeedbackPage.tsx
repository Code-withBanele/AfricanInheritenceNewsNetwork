import { useState } from "react";

export default function FeedbackPage() {
  const [form, setForm] = useState({ type: "general", message: "", email: "" });
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="bg-[#F7F4EE]">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 pt-14 md:pt-20 pb-20">
          <div className="max-w-lg">
            <p className="text-[#B85725] text-xs tracking-[0.2em] uppercase mb-4 font-sans">Thank you</p>
            <h1
              className="text-4xl md:text-5xl leading-tight mb-5"
              style={{ fontFamily: '"DM Serif Display", Georgia, serif' }}
            >
              We've received your feedback.
            </h1>
            <p className="text-[#6B6257] text-base leading-relaxed font-sans">
              If you provided an email address and your message requires a response, we will be in touch.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F7F4EE]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 pt-14 md:pt-20 pb-20">
        <div className="max-w-lg">
          <p className="text-[#B85725] text-xs tracking-[0.2em] uppercase mb-4 font-sans">Feedback</p>
          <h1
            className="text-4xl md:text-5xl leading-tight mb-4"
            style={{ fontFamily: '"DM Serif Display", Georgia, serif' }}
          >
            Share your thoughts.
          </h1>
          <p className="text-[#6B6257] text-base leading-relaxed mb-12 font-sans">
            Your feedback helps us serve our readers better.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-7">
            {/* Type */}
            <div>
              <label className="text-xs tracking-[0.15em] uppercase text-[#6B6257] block mb-3 font-sans">Type</label>
              <div className="flex flex-wrap gap-3">
                {["general", "editorial", "correction", "suggestion"].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setForm({ ...form, type })}
                    className={`text-xs px-4 py-2 border transition-all duration-200 font-sans capitalize ${
                      form.type === type
                        ? "border-[#B85725] bg-[#B85725] text-[#F7F4EE]"
                        : "border-[#DDD8CE] text-[#6B6257] hover:border-[#B85725] hover:text-[#B85725]"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="text-xs tracking-[0.15em] uppercase text-[#6B6257] block mb-3 font-sans">
                Message <span className="text-[#B85725]">*</span>
              </label>
              <textarea
                id="message"
                required
                rows={6}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full border border-[#DDD8CE] bg-transparent text-[#1C1915] text-base p-4 outline-none focus:border-[#B85725] transition-colors duration-200 resize-none font-sans"
                placeholder="Your message…"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="text-xs tracking-[0.15em] uppercase text-[#6B6257] block mb-3 font-sans">
                Email <span className="text-[#9C9589] normal-case tracking-normal text-xs">(optional — only if you want a response)</span>
              </label>
              <input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full border border-[#DDD8CE] bg-transparent text-[#1C1915] text-base px-4 py-3 outline-none focus:border-[#B85725] transition-colors duration-200 font-sans"
                placeholder="your@email.com"
              />
            </div>

            <button
              type="submit"
              className="self-start bg-[#1C1915] text-[#F7F4EE] text-sm px-8 py-4 hover:bg-[#B85725] transition-colors duration-200 font-sans"
            >
              Send Feedback
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
