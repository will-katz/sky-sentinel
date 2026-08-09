import { useEffect, useState } from 'react';

export type AppPath = '/' | '/team';

function normalizePath(pathname: string): AppPath {
  const cleaned = pathname.replace(/\/+$/, '') || '/';
  if (cleaned === '/team' || cleaned.startsWith('/team/')) return '/team';
  return '/';
}

export function scrollToHash(hash: string, behavior: ScrollBehavior = 'smooth') {
  const id = hash.replace(/^#/, '');
  if (!id) {
    window.scrollTo({ top: 0, behavior });
    return;
  }

  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior });
  }
}

export function useAppPath(): AppPath {
  const [path, setPath] = useState<AppPath>(() =>
    normalizePath(window.location.pathname),
  );

  useEffect(() => {
    const onPopState = () => setPath(normalizePath(window.location.pathname));
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  return path;
}

export function navigate(to: string) {
  const url = new URL(to, window.location.origin);
  const nextPath = normalizePath(url.pathname);
  const nextHash = url.hash;
  const pathForUrl = nextPath === '/' ? '/' : nextPath;
  const target = `${pathForUrl}${nextHash}`;
  const current = `${window.location.pathname}${window.location.hash}`;
  const pathChanged = normalizePath(window.location.pathname) !== nextPath;

  if (current !== target) {
    window.history.pushState({}, '', target);
  }

  if (pathChanged) {
    window.dispatchEvent(new PopStateEvent('popstate'));
    return;
  }

  if (nextPath === '/') {
    if (nextHash) {
      scrollToHash(nextHash);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}

export function homeSectionHref(hash: string, currentPath: AppPath): string {
  return currentPath === '/' ? hash : `/${hash}`;
}
