import { useContentList } from '@/hooks/useContentList';
import { AppHeader } from '@/components/layout/AppHeader';
import { AppBottomBar } from '@/components/layout/AppBottomBar';
import { InactivityModal } from '@/components/kiosk/InactivityModal';
import { Skeleton } from '@/components/kiosk/Skeleton';
import { FileText, Image, Video, ChevronRight } from 'lucide-react';

const typeIcons = {
  pdf: FileText,
  image: Image,
  video: Video,
};

const typeLabels = {
  pdf: 'PDF 문서',
  image: '이미지',
  video: '동영상',
};

export default function ContentList() {
  const {
    category,
    contents,
    isLoading,
    showInactivity,
    selectContent,
    goHome,
    dismissInactivity,
    handleInactivityExpired,
  } = useContentList();

  if (!category) return null;

  const CategoryIcon = category.icon;

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />

      <main className="pt-[80px] pb-[72px] min-h-screen">
        <div className="w-full max-w-[1760px] mx-auto px-12 py-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-body-sm text-gray-500 mb-8">
            <span
              className="cursor-pointer hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg px-2 py-1 transition-colors"
              tabIndex={0}
              onClick={goHome}
            >
              홈
            </span>
            <ChevronRight className="w-4 h-4 text-gray-300" />
            <span className="text-foreground font-semibold px-2 py-1 bg-primary/5 rounded-lg">
              {category.name}
            </span>
          </div>

          {/* Category header */}
          <div className="flex items-center gap-5 mb-10">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
              <CategoryIcon className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h2 className="text-h1 text-foreground font-bold">{category.name}</h2>
              <p className="text-body-sm text-gray-500 mt-1">{category.description}</p>
            </div>
          </div>

          {/* Content list */}
          {isLoading ? (
            <div className="grid grid-cols-1 gap-4">
              {[1, 2, 3, 4].map(idx => (
                <div key={idx} className="flex items-center gap-6 p-6 bg-card rounded-2xl border border-gray-100 shadow-sm">
                  <Skeleton variant="circular" className="w-14 h-14 rounded-2xl" />
                  <div className="flex-1 space-y-3">
                    <Skeleton variant="text" className="w-1/3" />
                    <Skeleton variant="text" className="w-1/4 h-3" />
                  </div>
                </div>
              ))}
            </div>
          ) : contents.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 bg-card rounded-2xl border border-gray-100 shadow-sm">
              <div className="w-20 h-20 rounded-2xl bg-gray-100 flex items-center justify-center mb-5">
                <FileText className="w-10 h-10 text-gray-300" />
              </div>
              <p className="text-h3 text-gray-700 font-semibold mb-2">등록된 콘텐츠가 없습니다</p>
              <p className="text-body-sm text-gray-500">관리자 모드에서 콘텐츠를 추가해주세요</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {contents.map(content => {
                const TypeIcon = typeIcons[content.type as keyof typeof typeIcons] || FileText;
                return (
                  <button
                    key={content.id}
                    onClick={() => selectContent(content.id)}
                    className="flex items-center gap-6 p-6 bg-card rounded-2xl border border-gray-100 shadow-sm
                      focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30 focus-visible:ring-offset-2
                      hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 hover:-translate-y-0.5
                      active:scale-[0.99] active:shadow-sm
                      transition-all duration-300 text-left touch-ripple group"
                    aria-label={`${content.title} 보기`}
                  >
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center flex-shrink-0
                      group-hover:from-primary group-hover:to-primary-dark group-hover:shadow-md group-hover:shadow-primary/20 transition-all duration-300">
                      <TypeIcon className="w-7 h-7 text-primary group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-h3 text-foreground font-semibold truncate group-hover:text-primary transition-colors duration-300">
                        {content.title}
                      </h3>
                      <p className="text-caption text-gray-500 mt-1.5 flex items-center gap-2">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-gray-100 text-gray-600 text-caption font-medium">
                          {typeLabels[content.type as keyof typeof typeLabels]}
                        </span>
                        <span>·</span>
                        <span>{content.createdAt}</span>
                      </p>
                    </div>
                    <ChevronRight className="w-6 h-6 text-gray-300 flex-shrink-0 group-hover:translate-x-1 group-hover:text-primary transition-all duration-300" />
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </main>

      <AppBottomBar />

      <InactivityModal
        open={showInactivity}
        onContinue={dismissInactivity}
        onTimeout={handleInactivityExpired}
      />
    </div>
  );
}
