export function getUrl() {
  return typeof window !== "undefined" ? window.location.origin : "";
}
