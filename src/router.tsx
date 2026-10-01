import React, { createContext, useContext, useEffect, useState } from 'react';

interface RouterContextType {
  path: string;
  navigate: (to: string) => void;
}

const RouterContext = createContext<RouterContextType>({
  path: '/',
  navigate: () => {}
});

function getCleanPath(): string {
  // If hash routing is used (e.g. #/projetos)
  if (window.location.hash && window.location.hash.startsWith('#/')) {
    return window.location.hash.substring(1);
  }
  return window.location.pathname || '/';
}

export const RouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [path, setPath] = useState<string>(getCleanPath());

  useEffect(() => {
    const handlePopState = () => {
      setPath(getCleanPath());
      window.scrollTo(0, 0);
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  const navigate = (to: string) => {
    // Scroll to top on navigation
    window.scrollTo(0, 0);
    
    // Support standard history pushState
    try {
      window.history.pushState({}, '', to);
    } catch {
      // Fallback for sandboxed iframes that may restrict pushState
      window.location.hash = '#' + to;
    }
    setPath(to);
  };

  return (
    <RouterContext.Provider value={{ path, navigate }}>
      {children}
    </RouterContext.Provider>
  );
};

export const useRouter = () => useContext(RouterContext);

export const Link: React.FC<{
  to: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  title?: string;
}> = ({ to, className, children, onClick, title }) => {
  const { navigate } = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onClick) onClick();
    navigate(to);
  };

  return (
    <a href={to} onClick={handleClick} className={className} title={title}>
      {children}
    </a>
  );
};
