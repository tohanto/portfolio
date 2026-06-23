import { useLocation, useNavigate } from 'react-router-dom';
import { NAV_ITEMS } from '@/constants/navigation';
import { cn } from '@/utils/cn';

export function DesktopNav() {
  const location = useLocation();
  const navigate = useNavigate();

  function isActive(to: string): boolean {
    if (to === '/') return location.pathname === '/';
    return location.pathname.startsWith(to);
  }

  return (
    <nav className="hidden md:flex items-center gap-0">
      {NAV_ITEMS.map((item, index) => {
        const active = isActive(item.to);

        return (
          <button
            key={item.label}
            onClick={() => navigate(item.to)}
            className={cn(
              'px-0 py-2 text-[13px] transition-colors',
              index > 0 && 'ml-10',
              active
                ? 'text-ink font-semibold [text-shadow:0_4px_4px_rgba(0,0,0,0.25)]'
                : 'text-ink-secondary font-normal hover:text-ink'
            )}
            style={{ letterSpacing: '1px' }}
          >
            {item.label}
          </button>
        );
      })}
    </nav>
  );
}
