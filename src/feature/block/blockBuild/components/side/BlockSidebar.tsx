import { useState } from 'react';
import BlockCreateButton from '../button/BlockCreateButton';
import BlockTabs, { type TabType } from './BlockTabs';
import BlockItem from './BlockItem';
import type { SidebarBlock } from '../../types/block';
interface BlockSidebarProps {
  items: SidebarBlock[];
}

const BlockSidebar = ({ items }: BlockSidebarProps) => {
  const [activeTab, setActiveTab] = useState<TabType>('인기');

  const content = () => {
    switch (activeTab) {
      case '인기':
        return (
          <div className="flex flex-col gap-3">
            {items.map((item) => (
              <BlockItem key={item.id} item={item} />
            ))}
          </div>
        );
      case '카테고리':
        return <div>카테고리</div>;
      case '생성':
        return (
          <div className="flex flex-col gap-3">
            <BlockCreateButton />
          </div>
        );
    }
  };
  return (
    <div className="flex flex-col h-full bg-base-color-6 border-r border-gray-200">
      {/* 헤더 타이틀 */}
      <div className="px-6 pt-8 pb-4">
        <h2 className="text-xl font-semibold text-black">Vlock 라이브러리</h2>
      </div>

      {/* 탭 영역 (별도 컴포넌트) */}
      <BlockTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* 탭별 컨텐츠 */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden min-w-0 px-6 pb-6">{content()}</div>
    </div>
  );
};

export default BlockSidebar;
