import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTopButton() {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 220);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsVisible(false);
  }, [location.pathname]);

  if (!isVisible) {
    return null;
  }

  return (
    <button
      type="button"
      aria-label="Back to top"
      className="fixed bottom-5 right-5 z-50 inline-flex h-11 w-11 items-center justify-center rounded-full bg-moss text-lg font-bold text-white shadow-[0_14px_30px_rgba(49,88,39,0.28)] transition hover:-translate-y-0.5 hover:bg-bark sm:bottom-6 sm:right-6"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <span className="text-xl leading-none" aria-hidden="true">
        ↑
      </span>
    </button>
  );
}
