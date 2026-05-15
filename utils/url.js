export function getBasePath() {
  const basePath = process.env.NEXT_PUBLIC_SUB_PATH;
  if (!basePath || basePath === "/") return "";
  return basePath.startsWith("/") ? basePath : `/${basePath}`;
}

export function withBasePath(path = "") {
  const basePath = getBasePath();
  if (!path) return basePath || "/";
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  if (basePath && normalizedPath.startsWith(basePath)) {
    return normalizedPath;
  }
  return `${basePath}${normalizedPath}`;
}

export function getAppUrl(req, path = "") {
  // const origin = process.env.NEXT_PUBLIC_BASE_URL || req?.nextUrl?.origin || "";
  return new URL(withBasePath(path), origin);
}
