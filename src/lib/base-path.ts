export const appBasePath = "/exstad";

export function withBasePath(path: string) {
  if (!path.startsWith("/") || path.startsWith(`${appBasePath}/`)) {
    return path;
  }

  return `${appBasePath}${path}`;
}
