import { useAdminDashboard } from '@/hooks/useAdminDashboard';
import {
  ShieldCheck, LogOut, Upload, Trash2, Eye,
  FileText, Image, Video, Settings, FolderOpen, Usb, Plus
} from 'lucide-react';

import { Button } from '@/components/kiosk/Button';
import { Modal } from '@/components/kiosk/Modal';
import { FileUpload } from '@/components/admin/FileUpload';
import { ContentEditor } from '@/components/admin/ContentEditor';
import { UsbManager } from '@/components/admin/UsbManager';

const typeIcons = { pdf: FileText, image: Image, video: Video, map: Image };
const typeLabels = { pdf: 'PDF', image: '이미지', video: '동영상', map: '지도' };

export default function AdminDashboard() {
  const {
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
  } = useAdminDashboard();

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar — 260px */}
      <aside className="w-[260px] bg-card border-r border-gray-100 flex flex-col h-screen fixed left-0 top-0 shadow-sm" style={{ zIndex: 'var(--z-drawer)' }}>
        <div className="h-[80px] flex items-center gap-3 px-6 border-b border-gray-100">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center shadow-md shadow-primary/20">
            <ShieldCheck className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <p className="text-body-sm font-bold text-foreground">관리자 모드</p>
            <p className="text-caption text-gray-500">{formattedTime}</p>
          </div>
        </div>

        <nav className="flex-1 py-4 overflow-y-auto">
          <p className="text-caption text-gray-400 font-semibold px-6 mb-3 uppercase tracking-wider">카테고리</p>
          {categories.map(cat => {
            const Icon = cat.icon;
            const isActive = selectedCatId === cat.id && activeTab === 'content';
            return (
              <button
                key={cat.id}
                onClick={() => handleSidebarClick(cat.id)}
                className={`w-full flex items-center gap-3 px-6 py-3.5 text-left transition-all duration-200
                  ${isActive
                    ? 'bg-primary/5 text-primary border-l-[3px] border-primary font-semibold'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-foreground border-l-[3px] border-transparent'
                  }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span className="text-body-sm truncate">{cat.name}</span>
              </button>
            );
          })}

          <div className="border-t border-gray-100 my-4 mx-6" />

          <button
            onClick={handleSettingsClick}
            className={`w-full flex items-center gap-3 px-6 py-3.5 text-left transition-all duration-200
              ${activeTab === 'settings'
                ? 'bg-primary/5 text-primary border-l-[3px] border-primary font-semibold'
                : 'text-gray-600 hover:bg-gray-50 hover:text-foreground border-l-[3px] border-transparent'
              }`}
          >
            <Settings className="w-5 h-5" />
            <span className="text-body-sm">시스템 설정</span>
          </button>
        </nav>

        <div className="p-5 border-t border-gray-100">
          <button
            onClick={exitAdminMode}
            className="w-full flex items-center justify-center gap-2 h-[48px] rounded-xl border-2 border-danger text-danger text-body-sm font-semibold
              hover:bg-danger/5 active:scale-[0.97] transition-all duration-200"
          >
            <LogOut className="w-5 h-5" />
            로그아웃
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="ml-[260px] flex-1 p-10 overflow-y-auto h-screen">
        <div className="max-w-[1200px] mx-auto">
          {activeTab === 'content' && selectedCategory && (
            <>
              {/* Content List View */}
              {viewMode === 'list' && (
                <div className="animate-fade-in">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h1 className="text-h1 text-foreground font-bold">{selectedCategory.name}</h1>
                      <p className="text-body-sm text-gray-500 mt-1">콘텐츠 관리 · {displayedContents.length}개 항목</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Button variant="secondary" icon={<Usb className="w-5 h-5" />} onClick={() => setViewMode('usb')}>
                        USB 로드
                      </Button>
                      <Button variant="primary" icon={<Upload className="w-5 h-5" />} onClick={() => setViewMode('upload')}>
                        파일 업로드
                      </Button>
                    </div>
                  </div>

                  <div className="bg-card rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="grid grid-cols-[1fr_120px_140px_100px] bg-gray-50 text-body-sm text-gray-500 font-semibold border-b border-gray-100">
                      <div className="px-6 py-4">제목</div>
                      <div className="px-6 py-4">유형</div>
                      <div className="px-6 py-4">등록일</div>
                      <div className="px-6 py-4 text-center">작업</div>
                    </div>

                    {displayedContents.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-24">
                        <div className="w-20 h-20 rounded-2xl bg-gray-100 flex items-center justify-center mb-5">
                          <FolderOpen className="w-10 h-10 text-gray-300" />
                        </div>
                        <p className="text-h3 font-semibold text-gray-700 mb-2">등록된 콘텐츠가 없습니다</p>
                        <p className="text-body-sm text-gray-500 mb-6">우측 상단의 버튼을 눌러 새 콘텐츠를 추가해보세요.</p>
                        <Button variant="primary" icon={<Plus className="w-5 h-5" />} onClick={() => setViewMode('upload')}>
                          콘텐츠 등록 시작하기
                        </Button>
                      </div>
                    ) : (
                      displayedContents.map((item, i) => {
                        const TypeIcon = typeIcons[item.type] || FileText;
                        return (
                          <div
                            key={item.id}
                            className={`grid grid-cols-[1fr_120px_140px_100px] items-center border-b border-gray-100 last:border-b-0 hover:bg-primary/[0.02] transition-colors duration-200 ${
                              i % 2 === 1 ? 'bg-gray-50/50' : 'bg-card'
                            }`}
                          >
                            <div className="flex items-center gap-3 px-6 py-4">
                              <TypeIcon className="w-5 h-5 text-gray-400 flex-shrink-0" />
                              <span
                                className="text-body font-medium text-foreground truncate cursor-pointer hover:text-primary transition-colors"
                                onClick={() => startEdit(item)}
                              >
                                {item.title}
                              </span>
                            </div>
                            <div className="px-6 py-4 text-body-sm text-gray-500">
                              <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-gray-100 text-gray-600 font-medium text-caption">
                                {typeLabels[item.type] || item.type.toUpperCase()}
                              </span>
                            </div>
                            <div className="px-6 py-4 text-body-sm text-gray-500">{item.createdAt}</div>
                            <div className="px-6 py-4 flex items-center justify-center gap-1">
                              <Button variant="ghost" size="sm" icon={<Eye className="w-4 h-4 text-gray-500" />} onClick={() => setPreviewContent(item)} aria-label="미리보기" />
                              <Button variant="ghost" size="sm" icon={<Trash2 className="w-4 h-4 text-danger" />} onClick={() => handleDelete(item.id, item.title)} aria-label="삭제" />
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              )}

              {/* Upload View */}
              {viewMode === 'upload' && (
                <div className="animate-fade-in max-w-2xl mx-auto bg-card rounded-2xl border border-gray-100 p-8 shadow-sm mt-8">
                  <FileUpload onUploadComplete={handleUploadComplete} onCancel={() => setViewMode('list')} />
                </div>
              )}

              {/* USB Manager View */}
              {viewMode === 'usb' && (
                <div className="animate-fade-in max-w-4xl mx-auto bg-card rounded-2xl border border-gray-100 shadow-sm mt-8 p-8 min-h-[500px] flex flex-col">
                  <UsbManager onFileSelect={handleUsbFileSelect} onCancel={() => setViewMode('list')} />
                </div>
              )}

              {/* Editor View */}
              {viewMode === 'edit' && editingItem && (
                <div className="animate-fade-in max-w-2xl mx-auto bg-card rounded-2xl border border-gray-100 p-8 shadow-sm mt-8">
                  <ContentEditor
                    initialData={editingItem}
                    file={stagedFile}
                    onSave={handleSaveContent}
                    onCancel={cancelEdit}
                    onPreview={(data) => setPreviewContent(data)}
                  />
                </div>
              )}
            </>
          )}

          {activeTab === 'settings' && (
            <div className="animate-fade-in max-w-3xl">
              <h1 className="text-h1 text-foreground font-bold mb-8">시스템/환경 설정</h1>
              <div className="bg-card rounded-2xl border border-gray-100 shadow-sm p-8 space-y-10">
                <div>
                  <h3 className="text-h3 font-semibold border-b border-gray-100 pb-3 mb-5">화면 및 절전</h3>
                  <div className="grid grid-cols-[200px_1fr] items-center gap-4 mb-5">
                    <span className="text-body font-medium text-gray-700">대기 화면 전환 시간</span>
                    <div className="flex items-center gap-3">
                      <select className="h-11 px-4 border border-gray-200 rounded-xl bg-white text-body min-w-[120px] focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all">
                        <option value="60">1분</option>
                        <option value="120">2분</option>
                        <option value="180">3분</option>
                        <option value="300">5분</option>
                      </select>
                      <span className="text-caption text-gray-500">미조작시 스크린세이버 재생</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-[200px_1fr] items-center gap-4">
                    <span className="text-body font-medium text-gray-700">관리자 세션 만료</span>
                    <div className="flex items-center gap-3">
                      <select className="h-11 px-4 border border-gray-200 rounded-xl bg-white text-body min-w-[120px] focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all">
                        <option value="180">3분</option>
                        <option value="300" selected>5분</option>
                        <option value="600">10분</option>
                      </select>
                      <span className="text-caption text-gray-500">자동 로그아웃 대기 시간</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-h3 font-semibold border-b border-gray-100 pb-3 mb-5">보안</h3>
                  <div className="grid grid-cols-[200px_1fr] items-center gap-4">
                    <span className="text-body font-medium text-gray-700">관리자 PIN 변경</span>
                    <div className="flex items-center gap-3">
                      <Button variant="secondary" size="sm">새 PIN 설정</Button>
                      <span className="text-caption text-gray-500">DB 연동 후 활성화</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-h3 font-semibold border-b border-gray-100 pb-3 mb-5">로그 관리</h3>
                  <div className="grid grid-cols-[200px_1fr] items-center gap-4">
                    <span className="text-body font-medium text-gray-700">오프라인 장애 로그</span>
                    <div className="flex items-center gap-3">
                      <Button variant="secondary" size="sm" onClick={handleExportLogs}>로그 내보내기 (JSON)</Button>
                      <span className="text-caption text-gray-500">장비 장애 분석용</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Preview Modal */}
      <Modal
        open={previewContent !== null}
        onClose={() => setPreviewContent(null)}
        title={`${previewContent?.title} (미리보기)`}
        maxWidth="max-w-[1000px]"
      >
        <div className="p-4 bg-gray-50 rounded-xl min-h-[500px] flex items-center justify-center border border-gray-100">
          {previewContent?.type === 'image' && previewContent.fileUrl && (
            <img src={previewContent.fileUrl} alt={previewContent.title} className="max-w-full max-h-[600px] object-contain rounded-xl shadow-sm" />
          )}
          {previewContent?.type === 'video' && previewContent.fileUrl && (
            <video src={previewContent.fileUrl} controls className="max-w-full max-h-[600px] rounded-xl shadow-sm" />
          )}
          {previewContent?.type === 'pdf' && (
            <div className="flex flex-col items-center justify-center p-12 bg-white rounded-xl shadow-sm w-full text-center">
              <FileText className="w-16 h-16 text-danger/60 mb-4" />
              <p className="text-h3 font-semibold mb-2">PDF 미리보기 지원</p>
              <p className="text-body text-gray-500">파일 경로: {previewContent.fileUrl}</p>
            </div>
          )}
          {!previewContent?.fileUrl && previewContent?.type !== 'pdf' && (
            <p className="text-body text-gray-500">미리보기 데이터를 불러올 수 없습니다.</p>
          )}
        </div>
      </Modal>
    </div>
  );
}
