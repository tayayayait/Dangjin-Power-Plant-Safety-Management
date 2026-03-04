import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { ArrowDownAZ, ArrowUpZA, Loader2 } from 'lucide-react';

export interface Column<T> {
  key: string;
  header: string;
  accessor: (row: T) => React.ReactNode;
  sortable?: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';
}

export interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  isLoading?: boolean;
  isError?: boolean;
  emptyMessage?: string;
  onEmptyAction?: () => void;
  emptyActionLabel?: string;
}

export function Table<T>({ 
  columns, 
  data, 
  isLoading = false, 
  isError = false, 
  emptyMessage = "등록된 데이터가 없습니다",
  onEmptyAction,
  emptyActionLabel = "등록하기"
}: TableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDesc, setSortDesc] = useState(false);
  const [page, setPage] = useState(1);
  const MAX_ROWS = 10;

  const handleSort = (key: string, sortable?: boolean) => {
    if (!sortable) return;
    if (sortKey === key) {
      setSortDesc(!sortDesc);
    } else {
      setSortKey(key);
      setSortDesc(false);
    }
  };

  // Sort and paginate data
  // Note: Actual sorting logic is omitted for simplicity, you would apply generic sort based on sortKey here.
  const paginatedData = data.slice((page - 1) * MAX_ROWS, page * MAX_ROWS);
  const totalPages = Math.ceil(data.length / MAX_ROWS);

  return (
    <div className="w-full bg-card rounded-md border border-gray-300 shadow-sm overflow-hidden flex flex-col">
      {/* Header */}
      <div className="flex bg-gray-100 border-b border-gray-300 h-[52px]">
        {columns.map((col, i) => (
          <div 
            key={col.key}
            className={cn(
              "flex items-center px-5 text-body-sm text-gray-700 font-semibold",
              col.sortable && "cursor-pointer hover:bg-gray-200 select-none",
              col.align === 'center' ? 'justify-center text-center' : col.align === 'right' ? 'justify-end text-right' : 'justify-start text-left'
            )}
            style={{ width: col.width || `${100 / columns.length}%` }}
            onClick={() => handleSort(col.key, col.sortable)}
          >
            {col.header}
            {col.sortable && sortKey === col.key && (
              sortDesc ? <ArrowDownAZ className="w-4 h-4 ml-1" /> : <ArrowUpZA className="w-4 h-4 ml-1" />
            )}
          </div>
        ))}
      </div>

      {/* Body */}
      <div className="flex-1 divide-y divide-gray-300">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
          </div>
        ) : isError ? (
          <div className="flex flex-col items-center justify-center py-20 text-danger bg-danger-bg">
            <span className="text-body font-semibold">데이터를 불러오는 중 오류가 발생했습니다.</span>
          </div>
        ) : paginatedData.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <p className="text-body text-gray-500 mb-4">{emptyMessage}</p>
            {onEmptyAction && (
              <button 
                onClick={onEmptyAction}
                className="h-[44px] px-6 bg-primary text-primary-foreground text-body-sm font-semibold rounded-md hover:brightness-110 active:scale-95 transition-all"
              >
                {emptyActionLabel}
              </button>
            )}
          </div>
        ) : (
          paginatedData.map((row, rowIndex) => (
            <div 
              key={rowIndex}
              className={cn(
                "flex h-[60px] hover:bg-primary-light transition-colors duration-200 group focus-within:outline focus-within:outline-2 focus-within:outline-primary",
                rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"
              )}
            >
              {columns.map((col) => (
                <div 
                  key={col.key}
                  className={cn(
                    "flex items-center px-5",
                    col.align === 'center' ? 'justify-center text-center' : col.align === 'right' ? 'justify-end text-right' : 'justify-start text-left'
                  )}
                  style={{ width: col.width || `${100 / columns.length}%` }}
                >
                  {col.accessor(row)}
                </div>
              ))}
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="h-[52px] bg-white border-t border-gray-300 flex items-center justify-center gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={cn(
                "w-8 h-8 rounded-md text-body-sm font-semibold transition-all",
                page === i + 1 ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100 hover:text-primary"
              )}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
