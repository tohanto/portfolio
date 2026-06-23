import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

interface NavigationContextType {
  pendingScrollTo: string | null;
  setPendingScrollTo: (sectionId: string | null) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [pendingScrollTo, setPendingScrollTo] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSetPendingScrollTo = useCallback((sectionId: string | null) => {
    setPendingScrollTo(sectionId);
    setMobileMenuOpen(false);
  }, []);

  return (
    <NavigationContext.Provider
      value={{
        pendingScrollTo,
        setPendingScrollTo: handleSetPendingScrollTo,
        mobileMenuOpen,
        setMobileMenuOpen,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigationContext() {
  const ctx = useContext(NavigationContext);
  if (!ctx) {
    throw new Error('useNavigationContext must be used within NavigationProvider');
  }
  return ctx;
}
