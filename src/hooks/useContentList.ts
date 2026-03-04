import { useState, useCallback, useEffect } from 'react';
import { useKiosk } from '@/context/KioskContext';
import { categories } from '@/data/categories';
import db from '@/db/db';
import { useLiveQuery } from 'dexie-react-hooks';
import { useInactivityTimer } from '@/hooks/useInactivityTimer';

export function useContentList() {
  const { selectedCategoryId, selectContent, goHome } = useKiosk();
  const [showInactivity, setShowInactivity] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const contents = useLiveQuery(
    () => db.contents.where('categoryId').equals(selectedCategoryId || '').toArray(),
    [selectedCategoryId]
  ) || [];

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [selectedCategoryId]);

  const handleInactivityTimeout = useCallback(() => {
    setShowInactivity(true);
  }, []);

  useInactivityTimer(60, handleInactivityTimeout);

  const category = categories.find(c => c.id === selectedCategoryId);

  const dismissInactivity = useCallback(() => {
    setShowInactivity(false);
  }, []);

  const handleInactivityExpired = useCallback(() => {
    setShowInactivity(false);
    goHome();
  }, [goHome]);

  return {
    category,
    contents,
    isLoading,
    showInactivity,
    selectContent,
    goHome,
    dismissInactivity,
    handleInactivityExpired,
  };
}
