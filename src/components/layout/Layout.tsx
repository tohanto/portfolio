import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import ClickSpark from '@/components/ui/ClickSpark';

export function Layout() {
  return (
    <ClickSpark sparkColor="#CC6600" sparkSize={8} sparkRadius={20} sparkCount={6} duration={500}>
      <div className="flex flex-col min-h-screen bg-canvas-white">
        <Header />
        <main className="flex-1 pt-header">
          <Outlet />
        </main>
        <Footer />
      </div>
    </ClickSpark>
  );
}
