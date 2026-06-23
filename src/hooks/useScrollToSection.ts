import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useNavigationContext } from '@/context/NavigationContext';
import { HEADER_HEIGHT } from '@/constants/navigation';

/**
 * Hook for scroll-type nav items (个人简介).
 * If on homepage: scroll directly. If on other page: navigate to / then scroll.
 */
export function useScrollToSection() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setPendingScrollTo } = useNavigationContext();

  const scrollToSection = useCallback(
    (sectionId: string) => {
      if (location.pathname === '/') {
        const el = document.getElementById(sectionId);
        if (el) {
          const y = el.getBoundingClientRect().top + window.scrollY - HEADER_HEIGHT;
          window.scrollTo({ top: y, behavior: 'smooth' });
        } else {
          setTimeout(() => {
            const el2 = document.getElementById(sectionId);
            if (el2) {
              const y = el2.getBoundingClientRect().top + window.scrollY - HEADER_HEIGHT;
              window.scrollTo({ top: y, behavior: 'smooth' });
            }
          }, 100);
        }
      } else {
        setPendingScrollTo(sectionId);
        navigate('/');
      }
    },
    [location.pathname, navigate, setPendingScrollTo]
  );

  return scrollToSection;
}
