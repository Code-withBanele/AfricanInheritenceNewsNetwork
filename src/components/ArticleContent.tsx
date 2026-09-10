import type { ContentBlock } from "@/types/article";

export default function ArticleContent({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="flex flex-col gap-6">
      {blocks.map((block, i) => {
        if (typeof block === "string") {
          return (
            <p key={i} className="text-[#1C1915] text-lg leading-[1.85] font-sans">
              {block}
            </p>
          );
        }

        if (block.type === "heading2") {
          return (
            <h2
              key={i}
              className="text-2xl md:text-3xl leading-snug mt-6 mb-2"
              style={{ fontFamily: '"DM Serif Display", Georgia, serif' }}
            >
              {block.value}
            </h2>
          );
        }

        if (block.type === "heading") {
          const Tag = `h${block.level}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
          return (
            <Tag
              key={i}
              className="text-2xl md:text-3xl leading-snug mt-6 mb-2"
              style={{ fontFamily: '"DM Serif Display", Georgia, serif' }}
            >
              {block.content}
            </Tag>
          );
        }

        if (block.type === "paragraph") {
          return (
            <p key={i} className="text-[#1C1915] text-lg leading-[1.85] font-sans">
              {block.content}
            </p>
          );
        }

        if (block.type === "image" && block.value) {
          return (
            <figure key={i} className="my-4">
              <div className="overflow-hidden bg-[#DDD8CE]">
                <img
                  src={block.value}
                  alt={block.alt || ""}
                  loading="lazy"
                  className="w-full object-cover"
                />
              </div>
              {block.caption && (
                <figcaption className="text-[#9C9589] text-xs mt-2 font-sans leading-relaxed">
                  {block.caption}
                </figcaption>
              )}
            </figure>
          );
        }

        if (block.type === "blockquote") {
          return (
            <blockquote
              key={i}
              className="text-2xl md:text-3xl leading-snug text-[#1C1915] border-t border-b border-[#DDD8CE] py-8 my-4"
              style={{ fontFamily: '"DM Serif Display", Georgia, serif', fontStyle: "italic" }}
            >
              &ldquo;{block.value}&rdquo;
            </blockquote>
          );
        }

        return null;
      })}
    </div>
  );
}
