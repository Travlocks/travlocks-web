import clsx from 'clsx';
import BlockTooltip from '../ui/BlockTooltip';

export type TabType = '인기' | '카테고리' | '생성';

type Props = {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
};

const TABS: TabType[] = ['인기', '카테고리', '생성'];

const BlockTabs = ({ activeTab, onTabChange }: Props) => {
  return (
    <div className="px-6 pb-4">
      <div className="flex gap-1 p-1 bg-gray-100 rounded-[5px]">
        {TABS.map((tab) => (
          <div key={tab} className="flex-1 relative group">
            <button
              onClick={() => onTabChange(tab)}
              className={clsx(
                'w-full py-[6px] px-[11px] rounded-[5px] text-base font-medium transition-all',
                activeTab === tab
                  ? 'bg-base-color-6 text-primary-color font-medium'
                  : 'text-base-color-2 hover:text-base-color-1',
              )}>
              {tab}
            </button>

            {/* 일단 "생성" 탭에만 툴팁 표시 (Hover) */}
            {tab === '생성' && <BlockTooltip textKey="생성" className="group-hover:opacity-100 opacity-0" />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlockTabs;
