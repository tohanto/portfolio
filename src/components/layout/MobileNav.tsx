import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { NAV_ITEMS } from '@/constants/navigation';
import { useNavigationContext } from '@/context/NavigationContext';
import { cn } from '@/utils/cn';

export function MobileNav() {
  const { mobileMenuOpen, setMobileMenuOpen } = useNavigationContext();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname, setMobileMenuOpen]);

  if (!mobileMenuOpen) return null;

  function isActive(to: string): boolean {
    if (to === '/') return location.pathname === '/';
    return location.pathname.startsWith(to);
  }

  function handleNavClick(to: string) {
    setMobileMenuOpen(false);
    navigate(to);
  }

  return (
    <div className="fixed inset-0 z-overlay md:hidden">
      <div
        className="absolute inset-0 bg-ink/20 backdrop-blur-sm"
        onClick={() => setMobileMenuOpen(false)}
      />
      <div className="absolute top-0 right-0 w-[280px] h-full bg-canvas-white shadow-2xl animate-slide-in">
        <div className="flex items-center justify-between px-5 h-header border-b border-rule">
          <span className="text-base font-bold text-ink" style={{ letterSpacing: '3px' }}>PORTFOLIO</span>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 text-ink-secondary hover:text-ink transition-colors"
            aria-label="关闭导航菜单"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <nav className="flex flex-col py-3 px-3">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.to);
            return (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.to)}
                className={cn(
                  'px-4 py-3 text-left text-[15px] font-medium rounded transition-colors',
                  active
                    ? 'text-signal bg-signal-soft'
                    : 'text-ink-secondary hover:text-ink hover:bg-surface'
                )}
              >
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
