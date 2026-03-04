import db, { LocalContent } from './db';
import { mockContents } from '@/data/categories';

/**
 * 초기 부팅 시 DB 스토어가 비어있을 경우에만 mockContents를 Seed 데이터로 붓는 함수
 */
export async function seedDatabase() {
  try {
    const count = await db.contents.count();
    if (count === 0) {
      console.log('IndexedDB is empty. Seeding data...');
      
      const contentsToSeed: LocalContent[] = mockContents.map(item => ({
        ...item,
        // 오프라인 Mock 데이터임을 명시, Blob은 초기에는 null로 설정
        fileBlob: undefined, 
      }));

      await db.contents.bulkAdd(contentsToSeed);
      console.log('Seeding completed.');
    } else {
      console.log('IndexedDB already has data. Skipping seed.');
    }

    const settingsCount = await db.settings.count();
    if (settingsCount === 0) {
        await db.settings.add({
            id: 'global',
            screensaverTimeout: 120,
            viewerTimeout: 60,
            adminSessionTimeout: 300,
            adminPin: '000000'
        });
    }
  } catch (error) {
    console.error('Failed to seed database:', error);
  }
}
