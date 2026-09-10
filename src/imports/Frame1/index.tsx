import img21 from "./f9eb0c431aeee7540324fcfe5f4dba822951b059.png";

export default function Frame() {
  return (
    <div className="bg-[rgba(0,0,0,0)] relative shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] size-full">
      <div className="absolute left-[56px] size-[100px] top-[20px]" data-name="2 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img21} />
      </div>
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[0] left-[1089px] not-italic text-[0px] text-black top-[70px] whitespace-nowrap">
        <span className="leading-[normal] text-[24px]">Home</span>
        <span className="leading-[normal] text-[12px]">{` `}</span>
      </p>
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[1215px] not-italic text-[24px] text-black top-[70px] whitespace-nowrap">{`Articles `}</p>
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[1341px] not-italic text-[24px] text-black top-[70px] whitespace-nowrap">Categories</p>
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[1505px] not-italic text-[24px] text-black top-[70px] whitespace-nowrap">About</p>
    </div>
  );
}