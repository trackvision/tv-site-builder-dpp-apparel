import { useRef, useState, useEffect } from "react";
import { useDppItemTraceContext } from "@/hooks/useDppItemTraceContext";

const CAROUSEL_IMAGES = [
  { src: "/images/carousel/discover.svg", label: "Discover More" },
  { src: "/images/carousel/heritage.svg", label: "Heritage & Craft" },
  { src: "/images/carousel/sustainability.svg", label: "Sustainability" },
  { src: "/images/carousel/collections.svg", label: "Collections" },
];

export default function ImageCarousel() {
  const { brand } = useDppItemTraceContext();
  const brandName = brand?.brand_name || "Our Brand";
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const itemWidth = container.offsetWidth;
      const index = Math.round(scrollLeft / itemWidth);
      setCurrentIndex(index);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="py-4">
      <div className="flex items-center justify-between px-6 mb-3">
        <h2 className="text-xs font-semibold uppercase tracking-[0.1em] text-primary">
          The World of {brandName}
        </h2>
        <span className="text-xs text-gray-500">
          {currentIndex + 1} / {CAROUSEL_IMAGES.length}
        </span>
      </div>
      <div
        ref={scrollRef}
        className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {CAROUSEL_IMAGES.map((image, index) => (
          <div
            key={index}
            className="snap-start flex-shrink-0 w-full relative"
          >
            <img
              src={image.src}
              alt={image.label}
              className="w-full h-64 object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
              <span className="text-white text-sm font-semibold uppercase tracking-[0.08em]">
                {image.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
