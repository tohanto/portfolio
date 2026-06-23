import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { NavigationProvider } from '@/context/NavigationContext';
import { Layout } from '@/components/layout/Layout';
import { ScrollToTop } from '@/components/ui/ScrollToTop';

// Lazy-loaded pages
const HomePage = lazy(() => import('@/pages/HomePage'));
const AboutPage = lazy(() => import('@/pages/AboutPage'));
const ArchitecturePage = lazy(() => import('@/pages/ArchitecturePage'));
const GamesPage = lazy(() => import('@/pages/GamesPage'));
const AIPage = lazy(() => import('@/pages/AIPage'));
const ArtPage = lazy(() => import('@/pages/ArtPage'));
const ProjectDetailPage = lazy(() => import('@/pages/ProjectDetailPage'));
const ContactPage = lazy(() => import('@/pages/ContactPage'));

function PageSkeleton() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-signal border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

const router = createBrowserRouter(
  [
  {
    path: '/',
    element: (
      <NavigationProvider>
        <ScrollToTop />
        <Layout />
      </NavigationProvider>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<PageSkeleton />}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: 'about',
        element: (
          <Suspense fallback={<PageSkeleton />}>
            <AboutPage />
          </Suspense>
        ),
      },
      {
        path: 'architecture',
        element: (
          <Suspense fallback={<PageSkeleton />}>
            <ArchitecturePage />
          </Suspense>
        ),
      },
      {
        path: 'games',
        element: (
          <Suspense fallback={<PageSkeleton />}>
            <GamesPage />
          </Suspense>
        ),
      },
      {
        path: 'ai',
        element: (
          <Suspense fallback={<PageSkeleton />}>
            <AIPage />
          </Suspense>
        ),
      },
      {
        path: 'art',
        element: (
          <Suspense fallback={<PageSkeleton />}>
            <ArtPage />
          </Suspense>
        ),
      },
      {
        path: 'contact',
        element: (
          <Suspense fallback={<PageSkeleton />}>
            <ContactPage />
          </Suspense>
        ),
      },
      {
        path: ':category/:id',
        element: (
          <Suspense fallback={<PageSkeleton />}>
            <ProjectDetailPage />
          </Suspense>
        ),
      },
      {
        path: '*',
        element: <Navigate to="/" replace />,
      },
    ],
  },
  ],
  { basename: import.meta.env.BASE_URL },
);

export function App() {
  return <RouterProvider router={router} />;
}
