import { Map, ShieldCheck, HeartPulse, AlertTriangle, Siren, Phone, FileText, Settings } from 'lucide-react';

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: typeof Map;
  sortOrder: number;
}

export interface ContentItem {
  id: string;
  categoryId: string;
  title: string;
  type: 'pdf' | 'image' | 'video' | 'map';
  fileUrl: string;
  thumbnailUrl?: string;
  createdAt: string;
}

export const categories: Category[] = [
  { id: 'cat-1', name: '본부 지도', description: '사업장 배치도 및 대피경로', icon: Map, sortOrder: 1 },
  { id: 'cat-2', name: '안전관리 수칙', description: '작업 안전 수칙 및 가이드', icon: ShieldCheck, sortOrder: 2 },
  { id: 'cat-3', name: '보건관리 정보', description: '건강관리 및 보건 안내', icon: HeartPulse, sortOrder: 3 },
  { id: 'cat-4', name: '사고 사례 전파', description: '사고 사례 및 예방 조치', icon: AlertTriangle, sortOrder: 4 },
  { id: 'cat-5', name: '비상시 대응 조치', description: '비상 상황 행동 요령', icon: Siren, sortOrder: 5 },
  { id: 'cat-6', name: '긴급 위험 신고', description: '위험 신고 절차 안내', icon: Phone, sortOrder: 6 },
  { id: 'cat-7', name: '교육 자료', description: '안전 교육 영상 및 문서', icon: FileText, sortOrder: 7 },
  { id: 'cat-8', name: '공지사항', description: '발전본부 주요 공지', icon: Settings, sortOrder: 8 },
];

export const mockContents: ContentItem[] = [
  { id: 'cnt-1', categoryId: 'cat-1', title: '당진발전본부 전체 배치도', type: 'image', fileUrl: '/placeholder.svg', createdAt: '2026-03-01' },
  { id: 'cnt-2', categoryId: 'cat-1', title: '비상 대피 경로도', type: 'pdf', fileUrl: '/placeholder.svg', createdAt: '2026-03-01' },
  { id: 'cnt-3', categoryId: 'cat-2', title: '일반 안전수칙 가이드', type: 'pdf', fileUrl: '/placeholder.svg', createdAt: '2026-02-15' },
  { id: 'cnt-4', categoryId: 'cat-2', title: '고소작업 안전수칙', type: 'pdf', fileUrl: '/placeholder.svg', createdAt: '2026-02-10' },
  { id: 'cnt-5', categoryId: 'cat-3', title: '근골격계 질환 예방', type: 'image', fileUrl: '/placeholder.svg', createdAt: '2026-01-20' },
  { id: 'cnt-6', categoryId: 'cat-4', title: '2025년 주요 사고 사례', type: 'video', fileUrl: '/placeholder.svg', createdAt: '2026-01-15' },
  { id: 'cnt-7', categoryId: 'cat-5', title: '화재 발생 시 행동요령', type: 'pdf', fileUrl: '/placeholder.svg', createdAt: '2026-01-10' },
  { id: 'cnt-8', categoryId: 'cat-5', title: '지진 발생 시 행동요령', type: 'video', fileUrl: '/placeholder.svg', createdAt: '2026-01-05' },
  { id: 'cnt-9', categoryId: 'cat-6', title: '위험 신고 절차 안내문', type: 'pdf', fileUrl: '/placeholder.svg', createdAt: '2025-12-20' },
  { id: 'cnt-10', categoryId: 'cat-7', title: '신규 입사자 안전교육', type: 'video', fileUrl: '/placeholder.svg', createdAt: '2025-12-15' },
  { id: 'cnt-11', categoryId: 'cat-8', title: '2026년 3월 안전점검 일정', type: 'pdf', fileUrl: '/placeholder.svg', createdAt: '2026-03-01' },
];
