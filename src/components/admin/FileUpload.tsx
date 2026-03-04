import React, { useState, useCallback } from 'react';
import { UploadCloud, File, X, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '../kiosk/Button';

interface FileUploadProps {
  onUploadComplete: (file: File) => void;
  onCancel: () => void;
}

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'application/pdf', 'video/mp4'];
const MAX_FILE_SIZE = 500 * 1024 * 1024; // 500MB

export function FileUpload({ onUploadComplete, onCancel }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true);
    } else if (e.type === 'dragleave') {
      setIsDragging(false);
    }
  }, []);

  const validateFile = (file: File) => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      setError('지원하지 않는 파일 형식입니다 (JPG, PNG, PDF, MP4만 가능)');
      return false;
    }
    if (file.size > MAX_FILE_SIZE) {
      setError('파일 용량이 너무 큽니다 (최대 500MB)');
      return false;
    }
    return true;
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    setError(null);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && validateFile(droppedFile)) {
      setFile(droppedFile);
      simulateUpload(droppedFile);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const selectedFile = e.target.files?.[0];
    if (selectedFile && validateFile(selectedFile)) {
      setFile(selectedFile);
      simulateUpload(selectedFile);
    }
  };

  const simulateUpload = (file: File) => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => onUploadComplete(file), 500); // 100% 후 약간 대기 후 호출
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-h2 font-semibold text-foreground">새 콘텐츠 업로드</h2>
        <Button variant="ghost" size="sm" icon={<X className="w-6 h-6" />} onClick={onCancel} aria-label="취소" />
      </div>

      {!file ? (
        <label
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={cn(
            "flex flex-col items-center justify-center h-64 border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-200",
            isDragging ? "border-primary bg-primary-light" : "border-gray-300 bg-gray-50 hover:bg-gray-100"
          )}
        >
          <UploadCloud className={cn("w-12 h-12 mb-4 transition-colors", isDragging ? "text-primary" : "text-gray-400")} />
          <p className="text-body font-semibold text-gray-700 mb-2">클릭하거나 파일을 여기로 드래그 하세요</p>
          <p className="text-caption text-gray-500">JPG, PNG, PDF, MP4 (최대 500MB)</p>
          <input type="file" className="hidden" accept={ALLOWED_TYPES.join(',')} onChange={handleFileSelect} />
        </label>
      ) : (
        <div className="p-6 border border-gray-300 rounded-lg bg-gray-50 flex items-center justify-between gap-6">
          <div className="flex items-center gap-4 flex-1">
            <div className="w-12 h-12 rounded-md bg-primary-light flex items-center justify-center flex-shrink-0">
               <File className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
               <p className="text-body font-semibold text-foreground truncate mb-1">{file.name}</p>
               <div className="flex items-center gap-4 text-caption text-gray-500">
                  <span>{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                     <div 
                        className="h-full bg-primary transition-all duration-200" 
                        style={{ width: `${progress}%` }} 
                     />
                  </div>
                  <span className="w-8 tabular-nums">{progress}%</span>
               </div>
            </div>
          </div>
          {progress === 100 && (
             <CheckCircle2 className="w-8 h-8 text-green-500 flex-shrink-0 animate-scale-in" />
          )}
        </div>
      )}

      {error && (
        <p className="text-body-sm text-danger font-semibold bg-danger-bg p-4 rounded-md animate-fade-in">{error}</p>
      )}
    </div>
  );
}
