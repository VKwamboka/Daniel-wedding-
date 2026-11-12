/**
 * State for the gallery page: paginated loading, live updates and errors.
 * UI components stay dumb; all fetching logic lives here.
 */
import { useCallback, useEffect, useRef, useState } from 'react';
import { galleryService, type Photo } from '@/services/galleryService';

const PAGE_SIZE = 24;

export function useGallery() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const offset = useRef(0);

  const loadMore = useCallback(async (reset = false) => {
    setLoading(true);
    setError(null);
    try {
      if (reset) offset.current = 0;
      const page = await galleryService.list(offset.current, PAGE_SIZE);
      offset.current += page.length;
      setHasMore(page.length === PAGE_SIZE);
      setPhotos((prev) => (reset ? page : [...prev, ...page]));
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadMore(true);
    // New uploads from other guests slide in at the top.
    return galleryService.subscribe((photo) => {
      offset.current += 1;
      setPhotos((prev) => (prev.some((p) => p.id === photo.id) ? prev : [photo, ...prev]));
    });
  }, [loadMore]);

  return { photos, loading, hasMore, error, loadMore: () => loadMore(false), refresh: () => loadMore(true) };
}
