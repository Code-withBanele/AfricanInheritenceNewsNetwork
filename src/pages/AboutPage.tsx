const founders = [
  {
    initial: "Z",
    role: "Founder & Chairman",
    name: "Zola Pinda",
    bio: [
      "Zola Pinda is the founder of AHNN and a journalist, public-affairs writer, and institutional communicator whose work has been rooted in public-interest journalism, democratic accountability, and African intellectual history.",
      "Under his leadership, AHNN brings together heritage, analysis, research, and contemporary reporting in service of a stronger public culture across Africa.",
    ],
  },
  {
    initial: "B",
    role: "Founder & Digital Strategist",
    name: "Banele Mjayezi",
    bio: [
      "Banele Mjayezi is a co-founder of AHNN and a digital media practitioner focused on building credible, contemporary platforms for African public discourse.",
      "His work brings together editorial integrity, digital storytelling, and accessible publishing systems that help important African histories and ideas reach wider audiences.",
      "Banele is a software developer and digital builder with a growing focus on frontend technology, web design, and the relationship between creativity and technology. As the technical lead and developer behind African Inheritence News Network Platform, he turns editorial vision into a digital experience — from frontend architecture and interface to the way readers discover and interact with stories.",
    ],
  },
];

export default function AboutPage() {
  return (
    <div className="bg-[#F7F4EE]">
      <section className="border-b border-[#DDD8CE]">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 pt-16 md:pt-24 pb-16 md:pb-24">
          <p className="text-[#B85725] text-xs tracking-[0.2em] uppercase mb-6 font-sans">About AHNN</p>
          <div className="grid lg:grid-cols-[minmax(0,1.35fr)_minmax(260px,.65fr)] gap-12 lg:gap-20 items-end">
            <h1 className="text-[#1C1915] text-5xl md:text-7xl leading-[0.98] tracking-[-0.035em]" style={{ fontFamily: '"DM Serif Display", Georgia, serif' }}>
              African Heritage<br />News Network
            </h1>
            <p className="text-[#4A4540] text-lg leading-relaxed pb-1 font-sans">
              Stories that move a continent.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-24">
        <div className="grid lg:grid-cols-[200px_minmax(0,1fr)] gap-10 lg:gap-20">
          <p className="text-[#6B6257] text-xs tracking-[0.16em] uppercase font-sans">Our purpose</p>
          <div className="max-w-3xl">
            <p className="text-[#1C1915] text-2xl md:text-[2rem] leading-[1.38] mb-12" style={{ fontFamily: '"DM Serif Display", Georgia, serif' }}>
              African Heritage News Network is an African media, history, heritage, ideas, and public-interest platform designed to connect journalism with memory, scholarship, and contemporary affairs.
            </p>
            <div className="space-y-7 text-[#4A4540] text-lg leading-[1.8] font-sans">
              <p>We are building a publication that understands Africa not as a single story, but as many histories, communities, and futures. Our work is grounded in people, places, history, and perspectives that deserve serious attention and sustained public debate.</p>
              <p>AHNN is intended to serve as a credible institution for public understanding—bringing together reporting, research, heritage, analysis, and intellectual reflection in ways that strengthen democratic culture and public life.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#1C1915] text-[#F7F4EE]">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-24">
          <div className="grid lg:grid-cols-[200px_minmax(0,1fr)] gap-10 lg:gap-20 mb-14 md:mb-20">
            <p className="text-[#B85725] text-xs tracking-[0.16em] uppercase font-sans">Founders</p>
            <p className="max-w-2xl text-3xl md:text-4xl leading-[1.18]" style={{ fontFamily: '"DM Serif Display", Georgia, serif' }}>
              AHNN was founded to make African public life more visible, more accountable, and more intelligible.
            </p>
          </div>

          <div className="lg:ml-[280px] border-t border-[#3A3630]">
            {founders.map((founder) => (
              <article key={founder.name} className="grid md:grid-cols-[96px_minmax(0,1fr)] gap-7 md:gap-10 py-10 md:py-14 border-b border-[#3A3630]">
                <div className="w-14 h-14 rounded-full border border-[#B85725] text-[#B85725] flex items-center justify-center text-2xl" style={{ fontFamily: '"DM Serif Display", Georgia, serif' }}>
                  {founder.initial}
                </div>
                <div className="max-w-3xl">
                  <p className="text-[#B85725] text-xs tracking-[0.16em] uppercase mb-3 font-sans">{founder.role}</p>
                  <h2 className="text-3xl md:text-4xl leading-tight mb-6" style={{ fontFamily: '"DM Serif Display", Georgia, serif' }}>{founder.name}</h2>
                  <div className="space-y-5 text-[#C8C0B4] text-base md:text-lg leading-[1.75] font-sans">
                    {founder.bio.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
