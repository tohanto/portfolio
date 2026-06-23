export function Footer() {
  return (
    <footer className="bg-footer border-t border-footer-border">
      <div className="mx-auto max-w-container h-[64px] px-[60px] flex items-center justify-between max-md:px-6">
        <p className="text-xs text-ink-secondary font-normal" style={{ fontSize: '12px' }}>
          &copy; {new Date().getFullYear()} Portfolio. All rights reserved.
        </p>
        <p className="text-xs text-ink-secondary" style={{ fontSize: '12px' }}>
          设计 &middot; 建筑 &middot; 游戏 &middot; AI &middot; 艺术
        </p>
      </div>
    </footer>
  );
}
