import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle, RotateCcw } from 'lucide-react';
import db from '../../db/db';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
    
    // 오프라인 에러 관리 (IndexedDB 로깅)
    db.logs.add({
      timestamp: new Date().toISOString(),
      level: 'error',
      message: error.message,
      stackTrace: error.stack,
      context: errorInfo.componentStack || undefined
    }).catch(err => console.error('Failed to write log to DB', err));
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="h-screen w-screen bg-danger-bg flex flex-col items-center justify-center p-10 text-center">
          <AlertCircle className="w-24 h-24 text-danger mb-6" />
          <h1 className="text-h1 text-foreground mb-4">예기치 않은 오류가 발생했습니다</h1>
          <p className="text-body text-gray-700 max-w-2xl mb-8">
            프로그램 실행 중 문제가 발생하여 로그가 기록되었습니다.<br />
            아래 버튼을 눌러 초기 화면으로 돌아가거나 관리자에게 문의하세요.
          </p>
          <div className="bg-white p-6 rounded-md shadow-sm border border-gray-300 w-full max-w-3xl overflow-auto text-left mb-8 max-h-[300px]">
             <code className="text-caption text-gray-800 break-all">
                {this.state.error?.toString()}
             </code>
          </div>
          <button 
            onClick={this.handleReset}
            className="flex items-center gap-2 h-[56px] px-8 rounded-md bg-danger text-white text-body font-semibold hover:brightness-110 active:scale-[0.98] transition-all touch-ripple"
          >
            <RotateCcw className="w-5 h-5" />
            키오스크 재시작
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
