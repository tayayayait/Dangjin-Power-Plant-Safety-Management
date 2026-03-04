import React, { useState } from 'react';
import { File, Eye } from 'lucide-react';
import { Input } from '../kiosk/Input';
import { Button } from '../kiosk/Button';
import { categories } from '@/data/categories';
import { LocalContent } from '@/db/db';

interface ContentEditorProps {
  initialData?: Partial<LocalContent>;
  file?: File | null;
  onSave: (data: Partial<LocalContent>) => void;
  onCancel: () => void;
  onPreview: (data: Partial<LocalContent>) => void;
}

export function ContentEditor({ initialData, file, onSave, onCancel, onPreview }: ContentEditorProps) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [categoryId, setCategoryId] = useState(initialData?.categoryId || categories[0].id);
  const [blobUrl, setBlobUrl] = useState<string | null>(null);

  // Blob이 넘어왔을 경우 임시 URL 생성 (미리보기 용)
  React.useEffect(() => {
    let url: string | null = null;
    if (initialData?.fileBlob) {
        url = URL.createObjectURL(initialData.fileBlob);
        setBlobUrl(url);
    }
    return () => {
        if (url) URL.revokeObjectURL(url);
    };
  }, [initialData?.fileBlob]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !categoryId) return;
    
    // Create new or update
    const type = file ? (file.type.includes('pdf') ? 'pdf' : file.type.includes('video') ? 'video' : 'image') : (initialData?.type || 'image');
    
    onSave({
      ...initialData,
      title,
      categoryId,
      type,
      // blobUrl은 사용하지 않고 오직 blob 객체만 부모로 전달 (AdminDashboard에서 핸들링)
    });
  };

  const handlePreview = () => {
    const type = file ? (file.type.includes('pdf') ? 'pdf' : file.type.includes('video') ? 'video' : 'image') : (initialData?.type || 'image');
    onPreview({
      title: title || '제목 없음',
      type,
      fileUrl: file ? URL.createObjectURL(file) : blobUrl || initialData?.fileUrl,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <h2 className="text-h2 font-semibold text-foreground border-b border-gray-300 pb-4">
        {initialData?.id ? '콘텐츠 수정' : '콘텐츠 등록'}
      </h2>

      {file && (
        <div className="p-4 bg-primary-light border border-primary/20 rounded-md flex items-center gap-4">
          <File className="w-8 h-8 text-primary shrink-0" />
          <div className="overflow-hidden">
            <p className="text-body font-semibold text-foreground truncate">{file.name}</p>
            <p className="text-caption text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB 새 파일 첨부됨</p>
          </div>
        </div>
      )}

      {!file && (initialData?.fileUrl || blobUrl) && (
        <div className="p-4 bg-gray-50 border border-gray-300 rounded-md flex items-center gap-4">
          <File className="w-8 h-8 text-gray-400 shrink-0" />
          <div className="overflow-hidden">
            <p className="text-body font-semibold text-foreground truncate">기존 파일 유지됨</p>
            <p className="text-caption text-gray-500">{initialData?.fileUrl || '로컬 데이터베이스 바이너리 에셋'}</p>
          </div>
        </div>
      )}

      <Input
        label="콘텐츠 제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="화면에 표시될 제목을 입력하세요"
        required
      />

      <div className="flex flex-col gap-2">
        <label className="text-body-sm font-semibold text-gray-700">카테고리 분류</label>
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="w-full h-[56px] px-4 text-body rounded-md border-2 border-gray-300 bg-white transition-all duration-200 outline-none hover:border-gray-500 focus:border-primary focus:shadow-inner cursor-pointer"
        >
          {categories.slice(1).map(cat => ( // skip index 0
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
      </div>

      <div className="flex items-center justify-between pt-6 border-t border-gray-300 mt-2">
        <Button
          type="button"
          variant="secondary"
          size="md"
          icon={<Eye className="w-5 h-5" />}
          onClick={handlePreview}
          disabled={!title || (!file && !initialData?.fileUrl)}
        >
          미리보기
        </Button>
        <div className="flex items-center gap-3">
          <Button type="button" variant="ghost" size="md" onClick={onCancel}>취소</Button>
          <Button type="submit" variant="primary" size="md" disabled={!title || (!file && !initialData?.fileUrl)}>
            {initialData?.id ? '수정 완료' : '등록 확정'}
          </Button>
        </div>
      </div>
    </form>
  );
}
