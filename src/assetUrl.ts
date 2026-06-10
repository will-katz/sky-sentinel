/** Public-folder asset path that respects Vite `base` (e.g. `/sky-sentinel/` on GitHub Pages). */
export function assetUrl(path: string): string {
  const file = path.replace(/^\//, '');
  return `${import.meta.env.BASE_URL}${file}`;
}
