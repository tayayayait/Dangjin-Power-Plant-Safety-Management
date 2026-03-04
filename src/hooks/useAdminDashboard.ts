import { useState, useCallback } from 'react';
import { useKiosk } from '@/context/KioskContext';
import { categories } from '@/data/categories';
import db, { LocalContent } from '@/db/db';
import { useLiveQuery } from 'dexie-react-hooks';
import { useInactivityTimer } from '@/hooks/useInactivityTimer';
import { useCurrentTime, formatTime } from '@/hooks/useCurrentTime';
import { useToast } from '@/hooks/useToast';

type AdminViewMode = 'list' | 'upload' | 'usb' | 'edit';

export function useAdminDashboard() {
  const { exitAdminMode } = useKiosk();
  const { toast } = useToast();

  const [selectedCatId, setSelectedCatId] = useState(categories[0].id);
  const [activeTab, setActiveTab] = useState<'content' | 'settings'>('content');
  const [viewMode, setViewMode] = useState<AdminViewMode>('list');

  const localContents = useLiveQuery(() => db.contents.toArray()) || [];

  const [editingItem, setEditingItem] = useState<Partial<LocalContent> | null>(null);
  const [stagedFile, setStagedFile] = useState<File | null>(null);
  const [previewContent, setPreviewContent] = useState<Partial<LocalContent> | null>(null);

  const time = useCurrentTime();
  const formattedTime = formatTime(time);

  const handleAutoLogout = useCallback(() => {
    exitAdminMode();
    toast({ type: 'info', message: '오랜 시간 조작이 없어 로그아웃 되었습니다.' });
  }, [exitAdminMode, toast]);

  useInactivityTimer(300, handleAutoLogout);

  const displayedContents = localContents.filter(c => c.categoryId === selectedCatId);
  const selectedCategory = categories.find(c => c.id === selectedCatId);

  const handleUploadComplete = useCallback((file: File) => {
    setStagedFile(file);
    setEditingItem({ categoryId: selectedCatId, title: file.name.split('.')[0] });
    setViewMode('edit');
  }, [selectedCatId]);

  const handleUsbFileSelect = useCallback((file: File) => {
    setStagedFile(file);
    setEditingItem({ categoryId: selectedCatId, title: file.name.split('.')[0] });
    setViewMode('edit');
  }, [selectedCatId]);

  const handleSaveContent = useCallback(async (data: Partial<LocalContent>) => {
    try {
      let fileBlob: Blob | undefined = data.fileBlob;

      if (stagedFile) {
        const buffer = await stagedFile.arrayBuffer();
        fileBlob = new Blob([buffer], { type: stagedFile.type });
      }

      const payload: Partial<LocalContent> = {
        ...data,
        fileBlob,
      };

      if (payload.id) {
        await db.contents.update(payload.id, payload);
        toast({ type: 'success', message: '콘텐츠가 수정되었습니다.' });
      } else {
        const newItem: LocalContent = {
          ...payload,
          id: `content_${Date.now()}`,
          categoryId: payload.categoryId || selectedCatId,
          createdAt: new Date().toISOString().split('T')[0],
        } as LocalContent;
        await db.contents.add(newItem);
        toast({ type: 'success', message: '새 콘텐츠가 등록되었습니다.' });
      }
      setViewMode('list');
      setEditingItem(null);
      setStagedFile(null);
    } catch (e) {
      console.error(e);
      toast({ type: 'error', message: '저장에 실패했습니다.' });
    }
  }, [stagedFile, selectedCatId, toast]);

  const handleDelete = useCallback(async (id: string, title: string) => {
    if (window.confirm(`'${title}' 콘텐츠를 삭제하시겠습니까?`)) {
      try {
        await db.contents.delete(id);
        toast({ type: 'success', message: '삭제되었습니다.' });
      } catch (e) {
        console.error(e);
        toast({ type: 'error', message: '삭제에 실패했습니다.' });
      }
    }
  }, [toast]);

  const handleSidebarClick = useCallback((catId: string) => {
    if (viewMode !== 'list') {
      if (!window.confirm('작성 중인 내용이 사라집니다. 이동하시겠습니까?')) return;
    }
    setSelectedCatId(catId);
    setActiveTab('content');
    setViewMode('list');
  }, [viewMode]);

  const handleSettingsClick = useCallback(() => {
    if (viewMode !== 'list' && !window.confirm('작성 중인 내용이 사라집니다. 이동하시겠습니까?')) return;
    setActiveTab('settings');
    setViewMode('list');
  }, [viewMode]);

  const startEdit = useCallback((item: Partial<LocalContent>) => {
    setEditingItem(item);
    setStagedFile(null);
    setViewMode('edit');
  }, []);

  const cancelEdit = useCallback(() => {
    setViewMode('list');
    setEditingItem(null);
    setStagedFile(null);
  }, []);

  const handleExportLogs = useCallback(async () => {
    try {
      const logs = await db.logs.toArray();
      if (logs.length === 0) {
        toast({ type: 'info', message: '저장된 로그가 없습니다.' });
        return;
      }
      const blob = new Blob([JSON.stringify(logs, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `kiosk_error_logs_${new Date().toISOString().replace(/[:.]/g, '-')}.json`;
      a.click();
      URL.revokeObjectURL(url);
      toast({ type: 'success', message: '로그 다운로드가 완료되었습니다.' });
    } catch (e) {
      console.error(e);
      toast({ type: 'error', message: '로그 내보내기에 실패했습니다.' });
    }
  }, [toast]);

  return {
    // State
    selectedCatId,
    activeTab,
    viewMode,
    editingItem,
    stagedFile,
    previewContent,
    displayedContents,
    selectedCategory,
    formattedTime,
    categories,
    // Actions
    exitAdminMode,
    setViewMode,
    setPreviewContent,
    handleUploadComplete,
    handleUsbFileSelect,
    handleSaveContent,
    handleDelete,
    handleSidebarClick,
    handleSettingsClick,
    startEdit,
    cancelEdit,
    handleExportLogs,
  };
}
