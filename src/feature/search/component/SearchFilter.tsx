import { useState } from 'react';
import { SearchFilterStyle } from '../style/SearchFilter.style';
import CheckIcon from '@/shared/assets/icon-check-password.svg?react';
import RightIcon from '@/shared/assets/icon-arrow-right.svg?react';
import clsx from 'clsx';

interface SearchFilterProps {
  onChange?: (value: string) => void;
}

const destination = ['서울', '경기', '인천', '강원', '충청', '전라', '경상', '제주'];
const duration = ['당일치기', '1박 2일', '2박 3일', '3박 4일', '4일 이상'];
const theme = ['자연', '문화', '맛집', '힐링', '액티비티', '로컬'];
const transport = ['도보', '대중교통', '차량'];

const SearchFilter = ({ onChange }: SearchFilterProps) => {
  const [openSections, setOpenSections] = useState({
    destination: false,
    duration: false,
    theme: false,
    transport: false,
  });

  const handleSectionToggle = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className={SearchFilterStyle.container}>
      <div className={SearchFilterStyle.filterHeader}>
        <div className={SearchFilterStyle.filterHeaderTitle}>검색 필터</div>
        <div className={SearchFilterStyle.filterHeaderReset}>초기화</div>
      </div>

      <div className={SearchFilterStyle.line} />

      <div className={SearchFilterStyle.wrapper}>
        <div className={SearchFilterStyle.section}>
          <div className={SearchFilterStyle.sectionHeader}>
            <div className={SearchFilterStyle.sectionTitle}>여행지</div>
            <RightIcon
              className={clsx(
                SearchFilterStyle.sectionArrow,
                openSections.destination ? SearchFilterStyle.sectionArrowOpen : SearchFilterStyle.sectionArrowClosed,
              )}
              onClick={() => handleSectionToggle('destination')}
            />
          </div>
          <div
            className={clsx(
              SearchFilterStyle.checkboxGroup(true),
              openSections.destination ? SearchFilterStyle.checkboxGroupVisible : SearchFilterStyle.checkboxGroupHidden,
            )}>
            {destination.map((item) => (
              <label className={SearchFilterStyle.checkboxItem}>
                <div className={SearchFilterStyle.checkboxWrapper}>
                  <input
                    className={SearchFilterStyle.checkbox}
                    type="checkbox"
                    onChange={(e) => onChange?.(e.target.value)}
                  />
                  <CheckIcon className={SearchFilterStyle.checkIcon} />
                </div>
                <span className={SearchFilterStyle.checkboxLabel}>{item}</span>
              </label>
            ))}
          </div>
        </div>

        {/* 항상 렌더링하되 클래스로 표시/숨김 제어 */}
        <div
          className={clsx(
            SearchFilterStyle.line,
            openSections.destination ? SearchFilterStyle.lineVisible : SearchFilterStyle.lineHidden,
          )}
        />

        <div className={SearchFilterStyle.section}>
          <div className={SearchFilterStyle.sectionHeader}>
            <div className={SearchFilterStyle.sectionTitle}>여행기간</div>
            <RightIcon
              className={clsx(
                SearchFilterStyle.sectionArrow,
                openSections.duration ? SearchFilterStyle.sectionArrowOpen : SearchFilterStyle.sectionArrowClosed,
              )}
              onClick={() => handleSectionToggle('duration')}
            />
          </div>
          <div
            className={clsx(
              SearchFilterStyle.checkboxGroup(false),
              openSections.duration ? SearchFilterStyle.checkboxGroupVisible : SearchFilterStyle.checkboxGroupHidden,
            )}>
            {duration.map((item) => (
              <label className={SearchFilterStyle.checkboxItem}>
                <div className={SearchFilterStyle.checkboxWrapper}>
                  <input
                    className={SearchFilterStyle.checkbox}
                    type="checkbox"
                    onChange={(e) => onChange?.(e.target.value)}
                  />
                  <CheckIcon className={SearchFilterStyle.checkIcon} />
                </div>
                <span className={SearchFilterStyle.checkboxLabel}>{item}</span>
              </label>
            ))}
          </div>
        </div>

        <div
          className={clsx(
            SearchFilterStyle.line,
            openSections.duration ? SearchFilterStyle.lineVisible : SearchFilterStyle.lineHidden,
          )}
        />

        <div className={SearchFilterStyle.section}>
          <div className={SearchFilterStyle.sectionHeader}>
            <div className={SearchFilterStyle.sectionTitle}>여행테마</div>
            <RightIcon
              className={clsx(
                SearchFilterStyle.sectionArrow,
                openSections.theme ? SearchFilterStyle.sectionArrowOpen : SearchFilterStyle.sectionArrowClosed,
              )}
              onClick={() => handleSectionToggle('theme')}
            />
          </div>
          <div
            className={clsx(
              SearchFilterStyle.checkboxGroup(false),
              openSections.theme ? SearchFilterStyle.checkboxGroupVisible : SearchFilterStyle.checkboxGroupHidden,
            )}>
            {theme.map((item) => (
              <label className={SearchFilterStyle.checkboxItem}>
                <div className={SearchFilterStyle.checkboxWrapper}>
                  <input
                    className={SearchFilterStyle.checkbox}
                    type="checkbox"
                    onChange={(e) => onChange?.(e.target.value)}
                  />
                  <CheckIcon className={SearchFilterStyle.checkIcon} />
                </div>
                <span className={SearchFilterStyle.checkboxLabel}>{item}</span>
              </label>
            ))}
          </div>
        </div>

        <div
          className={clsx(
            SearchFilterStyle.line,
            openSections.theme ? SearchFilterStyle.lineVisible : SearchFilterStyle.lineHidden,
          )}
        />

        <div className={SearchFilterStyle.section}>
          <div className={SearchFilterStyle.sectionHeader}>
            <div className={SearchFilterStyle.sectionTitle}>이동성향</div>
            <RightIcon
              className={clsx(
                SearchFilterStyle.sectionArrow,
                openSections.transport ? SearchFilterStyle.sectionArrowOpen : SearchFilterStyle.sectionArrowClosed,
              )}
              onClick={() => handleSectionToggle('transport')}
            />
          </div>
          <div
            className={clsx(
              SearchFilterStyle.checkboxGroup(false),
              openSections.transport ? SearchFilterStyle.checkboxGroupVisible : SearchFilterStyle.checkboxGroupHidden,
            )}>
            {transport.map((item) => (
              <label className={SearchFilterStyle.checkboxItem}>
                <div className={SearchFilterStyle.checkboxWrapper}>
                  <input
                    className={SearchFilterStyle.checkbox}
                    type="checkbox"
                    onChange={(e) => onChange?.(e.target.value)}
                  />
                  <CheckIcon className={SearchFilterStyle.checkIcon} />
                </div>
                <span className={SearchFilterStyle.checkboxLabel}>{item}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
