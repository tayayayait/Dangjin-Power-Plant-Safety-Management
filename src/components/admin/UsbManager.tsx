import { useState, useEffect } from 'react';
import { Usb, RefreshCcw, FileText, Image as ImageIcon, FileVideo, HardDrive, Check, Loader2 } from 'lucide-react';
import { Button } from '../kiosk/Button';

interface UsbFile {
  name: string;
  size: number;
  type: 'pdf' | 'image' | 'video';
}

interface UsbManagerProps {
  onFileSelect: (file: File) => void;
  onCancel: () => void;
}

export function UsbManager({ onFileSelect, onCancel }: UsbManagerProps) {
  const [isScanning, setIsScanning] = useState(true);
  const [deviceFound, setDeviceFound] = useState(false);
  const [files, setFiles] = useState<UsbFile[]>([]);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [isCopying, setIsCopying] = useState(false);

  // 시뮬레이터: 1.5초 후 가상 USB 기기 및 파일 탐색 완료
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    if (isScanning) {
      timeout = setTimeout(() => {
        setIsScanning(false);
        setDeviceFound(true);
        setFiles([
          { name: '안전수칙_개정안.pdf', size: 1024 * 1024 * 2.5, type: 'pdf' },
          { name: '현장_사진01.jpg', size: 1024 * 1024 * 5.2, type: 'image' },
          { name: '안전교육_동영상.mp4', size: 1024 * 1024 * 125, type: 'video' },
        ]);
      }, 1500);
    }
    return () => clearTimeout(timeout);
  }, [isScanning]);

  const handleScanRetry = () => {
    setDeviceFound(false);
    setFiles([]);
    setIsScanning(true);
  };

  const handleCopy = () => {
    if (!selectedFileName) return;
    setIsCopying(true);
    
    // 시뮬레이션: 1초 후 복사 완료 및 가짜 File 객체 생성하여 전달
    setTimeout(() => {
        setIsCopying(false);
        const selectedOriginal = files.find(f => f.name === selectedFileName);
        if (selectedOriginal) {
            // 브라우저 환경 제약상 실제 디스크 파일을 읽을 수 없으므로 가짜 File 객체 넘김
            const mime = selectedOriginal.type === 'pdf' ? 'application/pdf' : selectedOriginal.type === 'image' ? 'image/jpeg' : 'video/mp4';
            const fakeFile = new File([''], selectedOriginal.name, { type: mime });
            onFileSelect(fakeFile);
        }
    }, 1000);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'pdf': return <FileText className="w-8 h-8 text-danger" />;
      case 'image': return <ImageIcon className="w-8 h-8 text-blue-500" />;
      case 'video': return <FileVideo className="w-8 h-8 text-purple-500" />;
      default: return <FileText className="w-8 h-8 text-gray-500" />;
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="flex items-center justify-between border-b border-gray-300 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center">
            <Usb className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-h2 font-semibold text-foreground">USB 메모리 탐색</h2>
        </div>
        {!isScanning && (
          <Button variant="ghost" size="sm" icon={<RefreshCcw className="w-5 h-5" />} onClick={handleScanRetry}>
            다시 탐색
          </Button>
        )}
      </div>

      <div className="flex-1 flex flex-col min-h-0">
        {isScanning ? (
          <div className="flex-1 flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
            <p className="text-body font-semibold text-foreground">USB 드라이브를 찾는 중...</p>
            <p className="text-caption text-gray-500 mt-2">USB 장치를 포트에 꽂아주세요.</p>
          </div>
        ) : !deviceFound ? (
          <div className="flex-1 flex flex-col items-center justify-center py-20 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <HardDrive className="w-16 h-16 text-gray-400 mb-4" />
            <p className="text-body font-semibold text-gray-700">인식된 USB 장치가 없습니다.</p>
            <p className="text-caption text-gray-500 mt-2">장치가 올바르게 연결되었는지 확인하세요.</p>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto">
            <p className="text-body-sm font-semibold text-gray-700 mb-4">/kiosk-content/ 탐색 결과 ({files.length}개 파일)</p>
            <div className="grid grid-cols-2 gap-4">
              {files.map(f => (
                <div 
                  key={f.name}
                  onClick={() => setSelectedFileName(f.name)}
                  className={`flex flex-col p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                    selectedFileName === f.name 
                      ? 'border-primary bg-primary-light/30 shadow-sm' 
                      : 'border-gray-200 bg-white hover:border-gray-400 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    {getIcon(f.type)}
                    {selectedFileName === f.name && (
                      <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                  <p className="text-body-sm font-semibold text-foreground truncate" title={f.name}>{f.name}</p>
                  <p className="text-caption text-gray-500 mt-1">{(f.size / 1024 / 1024).toFixed(1)} MB</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-end gap-3 pt-6 mt-6 border-t border-gray-300">
        <Button variant="ghost" size="md" onClick={onCancel} disabled={isCopying}>취소</Button>
        <Button 
          variant="primary" 
          size="md" 
          disabled={!selectedFileName || isCopying} 
          onClick={handleCopy}
          isLoading={isCopying}
        >
          로컬 복사 후 등록
        </Button>
      </div>
    </div>
  );
}
