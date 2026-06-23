import PillNav from '@/components/ui/PillNav';
import { NAV_ITEMS } from '@/constants/navigation';

export function Header() {
  const items = NAV_ITEMS.map((item) => ({
    label: item.label,
    href: item.to,
  }));

  return (
    <PillNav
      logoText="PORTFOLIO"
      items={items}
      baseColor="#FFFFFF"
      pillColor="#FFFFFF"
      pillTextColor="#111111"
      hoveredPillTextColor="#FFFFFF"
      ease="power3.easeOut"
      initialLoadAnimation
    />
  );
}
