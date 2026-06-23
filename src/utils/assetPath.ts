/**
 * Resolves a public asset path with the correct BASE_URL prefix.
 * In dev, BASE_URL is `/` so paths are unchanged.
 * On GitHub Pages, BASE_URL is `/portfolio/` so paths get the prefix.
 * External URLs (http/https) are returned as-is.
 */
export function assetPath(relativePath: string): string {
  if (relativePath.startsWith('http')) return relativePath;
  const base = import.meta.env.BASE_URL.replace(/\/$/, ''); // '/' or '/portfolio'
  if (base === '') return relativePath.startsWith('/') ? relativePath : `/${relativePath}`;
  // Avoid double-prefixing
  if (relativePath.startsWith(base + '/') || relativePath === base) return relativePath;
  return base + (relativePath.startsWith('/') ? relativePath : `/${relativePath}`);
}
