import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";

export default function ImageSlider({
  images = [],
  interval = 3000,
  className = "",
  fit = "cover",
  links = [],
  linkTarget = "_self",
  linkRel,
  alts = [],
}) {
  const safeImages = useMemo(() => images.filter(Boolean), [images]);
  const [index, setIndex] = useState(0);
  const timerRef = useRef(null);
  const fitClass = fit === "contain" ? "object-contain" : "object-cover";
  const normalizedLinks = useMemo(() => {
    if (!Array.isArray(links)) return [];
    return links.map((href) => {
      if (typeof href !== "string" || !href) return href;
      const hasScheme = /^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(href);
      const isProtocolRelative = href.startsWith("//");
      const isInternalPath = href.startsWith("/");
      if (hasScheme || isProtocolRelative || isInternalPath) return href;
      // Looks like a bare domain (e.g., edufinger.com): assume https
      return `https://${href}`;
    });
  }, [links]);
  const currentHref = normalizedLinks && normalizedLinks[index];
  const isInternal = typeof currentHref === "string" && currentHref.startsWith("/") && linkTarget !== "_blank";

  useEffect(() => {
    if (safeImages.length <= 1) return undefined;

    timerRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % safeImages.length);
    }, Math.max(1500, interval));

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [safeImages.length, interval]);

  if (!safeImages.length) {
    return (
      <div className={`${className} flex items-center justify-center bg-black/20`}>
        <div className="text-white/70 text-sm">No images</div>
      </div>
    );
  }

  return (
    <div className={`${className} relative overflow-hidden`}
         role="group"
         aria-roledescription="carousel"
         aria-label="Hero image slider">
      {safeImages.map((src, i) => (
        <img
          key={src}
          src={src}
          alt={alts[i] ?? ""}
          aria-hidden={i !== index}
          className={`absolute inset-0 h-full w-full ${fitClass} transition-opacity duration-700 ease-in-out ${i === index ? "opacity-100" : "opacity-0"}`}
          loading={i === 0 ? "eager" : "lazy"}
          decoding="async"
        />
      ))}

      {currentHref ? (
        isInternal ? (
          <Link
            to={currentHref}
            className="absolute inset-0 z-10 block cursor-pointer"
            aria-label={alts[index] ?? "Open slide"}
          />
        ) : (
          <a
            href={currentHref}
            target={linkTarget}
            rel={linkRel ?? (linkTarget === "_blank" ? "noopener noreferrer" : undefined)}
            className="absolute inset-0 z-10 block cursor-pointer"
            aria-label={alts[index] ?? "Open slide"}
          />
        )
      ) : null}

      {/* Simple progress dots */}
      {safeImages.length > 1 && (
        <div className="pointer-events-none absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
          {safeImages.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 w-3 rounded-full transition-all ${i === index ? "bg-white/90 w-6" : "bg-white/40"}`}
            />)
          )}
        </div>
      )}
    </div>
  );
}
