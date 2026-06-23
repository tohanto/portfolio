/**
 * Resolves a public asset path.
 * For paths under public/, Vite serves them at root.
 * For external URLs (http/https), returns as-is.
 */
export function assetPath(relativePath: string): string {
  if (relativePath.startsWith('http')) return relativePath;
  return relativePath.startsWith('/') ? relativePath : `/${relativePath}`;
}
