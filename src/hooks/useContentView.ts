import { useState, useCallback, useEffect } from 'react';
import { useKiosk } from '@/context/KioskContext';
import { categories } from '@/data/categories';
import db from '@/db/db';
import { useLiveQuery } from 'dexie-react-hooks';
import { useInactivityTimer } from '@/hooks/useInactivityTimer';

export function useContentView() {
  const { selectedCategoryId, selectedContentId, goHome, goBack } = useKiosk();
  const [showInactivity, setShowInactivity] = useState(false);

  const handleInactivityTimeout = useCallback(() => {
    setShowInactivity(true);
  }, []);

  useInactivityTimer(60, handleInactivityTimeout);

  const category = categories.find(c => c.id === selectedCategoryId);

  const content = useLiveQuery(
    () => db.contents.get(selectedContentId || ''),
    [selectedContentId]
  );

  const [blobUrl, setBlobUrl] = useState<string | null>(null);

  useEffect(() => {
    let url: string | null = null;
    if (content?.fileBlob) {
      url = URL.createObjectURL(content.fileBlob);
      setBlobUrl(url);
    }
    return () => {
      if (url) URL.revokeObjectURL(url);
    };
  }, [content?.fileBlob]);

  const dismissInactivity = useCallback(() => {
    setShowInactivity(false);
  }, []);

  const handleInactivityExpired = useCallback(() => {
    setShowInactivity(false);
    goHome();
  }, [goHome]);

  const viewerUrl = blobUrl || content?.fileUrl || '/content/screensaver/slide-01.png';

  return {
    category,
    content,
    viewerUrl,
    showInactivity,
    goHome,
    goBack,
    dismissInactivity,
    handleInactivityExpired,
  };
}
