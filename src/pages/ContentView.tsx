import { useContentView } from '@/hooks/useContentView';
import { AppHeader } from '@/components/layout/AppHeader';
import { AppBottomBar } from '@/components/layout/AppBottomBar';
import { InactivityModal } from '@/components/kiosk/InactivityModal';
import { ChevronRight, ArrowLeft } from 'lucide-react';

import { PdfViewer } from '@/components/viewers/PdfViewer';
import { ImageViewer } from '@/components/viewers/ImageViewer';
import { VideoPlayer } from '@/components/viewers/VideoPlayer';
import { MapViewer } from '@/components/viewers/MapViewer';

export default function ContentView() {
  const {
    category,
    content,
    viewerUrl,
    showInactivity,
    goHome,
    goBack,
    dismissInactivity,
    handleInactivityExpired,
  } = useContentView();

  if (!category || content === undefined) return null;

  const renderViewer = () => {
    switch (content.type) {
      case 'pdf':
        return <PdfViewer url={viewerUrl} title={content.title} />;
      case 'image':
        return <ImageViewer url={viewerUrl} title={content.title} />;
      case 'video':
        return <VideoPlayer url={viewerUrl} title={content.title} />;
      case 'map':
        return <MapViewer url={viewerUrl} title={content.title} />;
      default:
        return <div className="flex items-center justify-center h-full text-gray-500 text-h3">지원되지 않는 형식입니다.</div>;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AppHeader />

      <main className="flex-1 pt-[80px] pb-[96px] overflow-hidden flex flex-col">
        <div className="flex-1 w-full max-w-[1760px] mx-auto px-12 py-8 flex flex-col">

          {/* Top Bar: Back button + Breadcrumb */}
          <div className="flex items-center gap-5 mb-6 shrink-0">
            <button
              onClick={goBack}
              className="w-14 h-14 rounded-2xl bg-card shadow-md border border-gray-100 flex items-center justify-center
                hover:bg-gray-50 hover:shadow-lg hover:border-primary/20
                active:scale-95 transition-all duration-200 text-gray-700"
              aria-label="뒤로 가기"
            >
              <ArrowLeft className="w-7 h-7" />
            </button>
            <div className="flex items-center gap-2 text-body-sm text-gray-500 bg-card px-6 py-3.5 rounded-2xl shadow-sm border border-gray-100">
              <span className="cursor-pointer hover:text-primary font-semibold transition-colors" onClick={goHome}>홈</span>
              <ChevronRight className="w-4 h-4 text-gray-300" />
              <span className="cursor-pointer hover:text-primary font-semibold transition-colors" onClick={goBack}>{category.name}</span>
              <ChevronRight className="w-4 h-4 text-gray-300" />
              <span className="text-foreground font-bold">{content.title}</span>
            </div>
          </div>

          {/* Viewer area */}
          <div className="flex-1 bg-card rounded-2xl shadow-lg border border-gray-100 overflow-hidden relative">
            {renderViewer()}
          </div>

        </div>
      </main>

      <AppBottomBar />

      <InactivityModal
        open={showInactivity}
        onContinue={dismissInactivity}
        onTimeout={handleInactivityExpired}
        countdownSeconds={10}
      />
    </div>
  );
}
