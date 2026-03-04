import { useState, useEffect } from 'react';

export interface KioskSettings {
  screensaverTimeout: number;
  viewerTimeout: number;
  viewerCountdown: number;
  adminSessionTimeout: number;
  adminPin: string;
  adminLockDuration: number;
  adminMaxAttempts: number;
  screensaverSlideInterval: number;
  categories: Array<{
    id: string;
    name: string;
    description: string;
    enabled: boolean;
  }>;
}

const DEFAULT_SETTINGS: KioskSettings = {
  screensaverTimeout: 120,
  viewerTimeout: 60,
  viewerCountdown: 10,
  adminSessionTimeout: 300,
  adminPin: '000000',
  adminLockDuration: 300,
  adminMaxAttempts: 5,
  screensaverSlideInterval: 5,
  categories: [],
};

/**
 * 키오스크 시스템 설정을 로드하는 커스텀 훅
 * public/config/settings.json에서 설정을 읽어옵니다.
 */
export function useSettings() {
  const [settings, setSettings] = useState<KioskSettings>(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/config/settings.json')
      .then(res => {
        if (!res.ok) throw new Error('설정 파일을 로드할 수 없습니다');
        return res.json();
      })
      .then((data: KioskSettings) => {
        setSettings({ ...DEFAULT_SETTINGS, ...data });
        setLoading(false);
      })
      .catch(err => {
        console.warn('[useSettings] 설정 로드 실패, 기본값 사용:', err.message);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return { settings, loading, error };
}
