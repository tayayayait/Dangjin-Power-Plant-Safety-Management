import Dexie, { type EntityTable } from 'dexie';
import { ContentItem } from '@/data/categories';

export interface LocalContent extends Omit<ContentItem, 'id' | 'fileUrl'> {
  id?: string; // Dexie auto-increments if number, but we string-UUID map it. Actually, lets make Dexie handle local IDs.
  _localId?: number; 
  fileBlob?: Blob;      // 오프라인 저장을 위한 실제 파일 바이너리
  fileUrl?: string;     // URL.createObjectURL을 통해 런타임에 생성되는 임시 URL
}

export interface AppSetting {
  id: string; // 'global'
  screensaverTimeout: number;
  viewerTimeout: number;
  adminSessionTimeout: number;
  adminPin: string;
}

export interface AppLog {
  id?: number;
  timestamp: string;
  level: 'info' | 'error' | 'warn';
  message: string;
  stackTrace?: string;
  context?: string;
}

const db = new Dexie('DangjinKioskDB') as Dexie & {
  contents: EntityTable<LocalContent, 'id'>;
  settings: EntityTable<AppSetting, 'id'>;
  logs: EntityTable<AppLog, 'id'>;
};

// Schema declaration
db.version(1).stores({
  contents: 'id, categoryId, type, createdAt, title', // 인덱싱할 필드들 지정 (fileBlob 등은 인덱스 제외)
  settings: 'id',
  logs: '++id, timestamp, level' // ++id는 Auto-increment PK
});

export default db;
