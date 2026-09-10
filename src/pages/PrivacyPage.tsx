export default function PrivacyPage() {
  return (
    <div className="bg-[#F7F4EE]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 pt-14 md:pt-20 pb-20">
        <div className="max-w-2xl">
          <p className="text-[#B85725] text-xs tracking-[0.2em] uppercase mb-4 font-sans">Legal</p>
          <h1
            className="text-5xl leading-tight mb-4"
            style={{ fontFamily: '"DM Serif Display", Georgia, serif' }}
          >
            Privacy Policy
          </h1>
          <p className="text-[#9C9589] text-sm mb-14 font-sans">Last updated: September 2025</p>

          <div className="flex flex-col gap-10 font-sans">
            {[
              {
                title: "Information We Collect",
                body: "We collect only the information necessary to provide our service. This includes technical data automatically generated when you access our website (such as IP address, browser type, pages visited, and time of access) and, where you choose to provide it, contact information submitted through our feedback form.",
              },
              {
                title: "How We Use Information",
                body: "Technical data is used to maintain and improve the performance and security of the website. Contact information submitted through feedback forms is used solely to respond to your communication. We do not sell, rent, or share your personal information with third parties for marketing purposes.",
              },
              {
                title: "Cookies",
                body: "This website uses minimal cookies necessary for basic functionality. We do not use advertising cookies or tracking cookies from third parties. You may disable cookies in your browser settings, though this may affect some functionality.",
              },
              {
                title: "Data Retention",
                body: "Technical log data is retained for a maximum of 90 days. Contact information submitted through feedback forms is retained only for as long as necessary to respond to your communication, and is then deleted.",
              },
              {
                title: "Third-Party Services",
                body: "This website may use third-party services for content delivery and performance (such as image hosting). These services have their own privacy policies. We do not embed advertising networks, social media tracking pixels, or analytics services that share your data with third parties.",
              },
              {
                title: "Your Rights",
                body: "You have the right to request access to the personal information we hold about you, to request its correction or deletion, and to object to its processing. To exercise these rights, please contact us through the feedback form.",
              },
              {
                title: "Changes to This Policy",
                body: "We may update this policy from time to time. Material changes will be reflected in the 'Last updated' date above. Continued use of the website following any changes constitutes acceptance of the updated policy.",
              },
              {
                title: "Contact",
                body: "Questions about this policy may be submitted through our feedback form.",
              },
            ].map(({ title, body }) => (
              <div key={title}>
                <h2
                  className="text-2xl mb-3"
                  style={{ fontFamily: '"DM Serif Display", Georgia, serif' }}
                >
                  {title}
                </h2>
                <p className="text-[#4A4540] text-base leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
