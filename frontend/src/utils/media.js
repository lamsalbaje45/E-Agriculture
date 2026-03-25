export function resolveMediaUrl(src) {
  if (!src) {
    return "";
  }

  if (src.startsWith("http://") || src.startsWith("https://")) {
    return src;
  }

  const apiBase = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
  const origin = apiBase.replace(/\/api$/, "");
  return `${origin}${src}`;
}
