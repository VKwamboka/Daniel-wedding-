/**
 * Routing. Hash routes (/#/gallery) work on every static host with no server
 * config, which keeps QR codes reliable wherever the site is deployed.
 */
import { lazy, Suspense, useEffect } from 'react';
import { HashRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import { routes } from '@/utils/links';
import InvitationPage from '@/pages/InvitationPage';

// Gallery pages are split into their own chunk — the invitation loads faster.
const GalleryPage = lazy(() => import('@/pages/GalleryPage'));
const UploadPage = lazy(() => import('@/pages/UploadPage'));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

const Loading = () => (
  <div className="flex min-h-screen items-center justify-center bg-lavender-50">
    <span className="script text-4xl text-lilac-deep">Loading…</span>
  </div>
);

export default function App() {
  return (
    // reducedMotion="user" → Framer Motion honours the OS "reduce motion" setting site-wide
    <MotionConfig reducedMotion="user">
      <HashRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <ScrollToTop />
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path={routes.home} element={<InvitationPage />} />
            <Route path={routes.gallery} element={<GalleryPage />} />
            <Route path={routes.upload} element={<UploadPage />} />
            <Route path="*" element={<Navigate to={routes.home} replace />} />
          </Routes>
        </Suspense>
      </HashRouter>
    </MotionConfig>
  );
}
