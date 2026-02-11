import { useState, useEffect, useRef, useCallback } from 'react';
import { animate } from 'motion';
import { FormItem } from './common/FormItem';
import { Dropdown } from './common/Dropdown';
import PinIcon from '@/shared/assets/icon-pin.svg?react';
import XIcon from '@/shared/assets/icon-x-2.svg?react';
import type { KakaoPlace, KakaoStatus, KakaoPagination } from '../types/kakao.types';

export interface PlaceResult {
  place_name: string;
  road_address_name: string;
  address_name: string;
  x: string;
  y: string;
}

export interface PlaceSearchProps {
  label?: string;
  value: string;
  placeholder?: string;
  onChange?: (val: string) => void;
  onSelect?: (place: PlaceResult) => void;
  required?: boolean;
}

const KAKAO_API_KEY =
  import.meta.env.VITE_KAKAO_MAP_KEYWORD_SEARCH_API_KEY ||
  import.meta.env.VITE_KAKAO_MAP_API_KEY ||
  '873ba25a24bb1ef6448afacecb16e016';

// 의존성 문제를 피하기 위해 컴포넌트 외부로 이동시킨 헬퍼 함수
const findScrollableParent = (element: HTMLElement | null): HTMLElement | null => {
  if (!element) return null;
  if (
    element.scrollHeight > element.clientHeight &&
    (window.getComputedStyle(element).overflowY === 'auto' || window.getComputedStyle(element).overflowY === 'scroll')
  ) {
    return element;
  }
  return findScrollableParent(element.parentElement);
};

export const PlaceSearch: React.FC<PlaceSearchProps> = ({
  label,
  value,
  placeholder,
  onChange,
  onSelect,
  required,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState(value);
  const [results, setResults] = useState<PlaceResult[]>([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [, setIsEnd] = useState(false); // Unused state kept for logic consistency if needed later
  const [, setIsLoading] = useState(false);
  const [isSdkLoaded, setIsSdkLoaded] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // 카카오 SDK 초기화
  useEffect(() => {
    const scriptId = 'kakao-map-sdk';

    if (document.getElementById(scriptId)) {
      if (window.kakao && window.kakao.maps) {
        window.kakao.maps.load(() => {
          setIsSdkLoaded(true);
        });
      }
      return;
    }

    const script = document.createElement('script');
    script.id = scriptId;
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_API_KEY}&libraries=services&autoload=false`;
    script.async = true;

    script.onload = () => {
      if (window.kakao && window.kakao.maps) {
        window.kakao.maps.load(() => {
          setIsSdkLoaded(true);
        });
      }
    };

    document.head.appendChild(script);
  }, []);

  // value prop과 상태 동기화
  useEffect(() => {
    // 현재 선택된 상태가 아닐 때만 업데이트하여 원본 주소로 표시가 덮어씌워지는 것을 방지
    if (!isSelected) {
      setQuery(value);
    }
    // 'value'가 이 동기화의 유일한 의존성임
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const searchPlaces = useCallback(
    (searchQuery: string, currentPage: number) => {
      if (!isSdkLoaded || !searchQuery.trim() || !window.kakao?.maps?.services) {
        setResults([]);
        setIsOpen(false);
        return;
      }

      setIsLoading(true);
      const ps = new window.kakao.maps.services.Places();

      ps.keywordSearch(
        searchQuery,
        (data: KakaoPlace[], status: KakaoStatus, pagination: KakaoPagination) => {
          setIsLoading(false);

          if (status === window.kakao.maps.services.Status.OK) {
            const mappedResults: PlaceResult[] = data.map((place: KakaoPlace) => ({
              place_name: place.place_name,
              road_address_name: place.road_address_name,
              address_name: place.address_name,
              x: place.x,
              y: place.y,
            }));

            setResults(mappedResults);
            setIsEnd(!pagination.hasNextPage);
            setTotalCount(pagination.totalCount);
            setPage(currentPage);

            if (mappedResults.length > 0) setIsOpen(true);
            else setIsOpen(false);
          } else {
            setResults([]);
            setIsOpen(false);
          }
        },
        {
          page: currentPage,
          size: 5,
        },
      );
    },
    [isSdkLoaded],
  );

  // 통합된 검색 Effect (디바운스 + 페이지 변경)
  useEffect(() => {
    if (!isSdkLoaded || isSelected) return;

    // 빈 쿼리는 즉시 처리
    if (!query.trim()) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    // 검색 디바운스 적용
    const timer = window.setTimeout(() => {
      searchPlaces(query, page);
    }, 300);

    return () => {
      window.clearTimeout(timer);
    };
  }, [query, page, isSdkLoaded, isSelected, searchPlaces]);

  // 스크롤 애니메이션
  useEffect(() => {
    if (isOpen && results.length > 0 && containerRef.current) {
      const timer = window.setTimeout(() => {
        const scrollContainer = findScrollableParent(containerRef.current);
        if (scrollContainer) {
          const elementRect = containerRef.current!.getBoundingClientRect();
          const containerRect = scrollContainer.getBoundingClientRect();

          const targetScroll =
            scrollContainer.scrollTop +
            (elementRect.top - containerRect.top) -
            containerRect.height / 2 +
            elementRect.height / 2;

          animate(scrollContainer.scrollTop, targetScroll, {
            duration: 0.6,
            ease: [0.32, 0.72, 0, 1],
            onUpdate: (latest) => {
              scrollContainer.scrollTop = latest;
            },
          });
        }
      }, 100);
      return () => window.clearTimeout(timer);
    }
  }, [isOpen, results.length]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleSelect = (item: PlaceResult) => {
    setIsSelected(true);
    setQuery(item.place_name);

    const realAddress = item.road_address_name || item.address_name || item.place_name;
    onChange?.(realAddress);
    onSelect?.(item);
    setIsOpen(false);
  };

  const handleClear = () => {
    setIsSelected(false);
    setQuery('');
    setResults([]);
    setIsOpen(false);
    // 부모 컴포넌트에 알림
    onChange?.('');
  };

  const toogleDropdown = () => {
    if (query && results.length > 0) {
      setIsOpen(true);
    }
  };

  const trigger = (
    <div className="relative">
      <input
        type="text"
        value={query}
        onFocus={() => {
          setIsSelected(false);
          toogleDropdown();
        }}
        onClick={toogleDropdown}
        onChange={(e) => {
          const val = e.target.value;
          setIsSelected(false);
          setQuery(val);
          // 최적화를 위해 여기서도 빈 값일 때 결과를 즉시 지울 수 있음
          // 하지만 Effect에서도 안전하게 처리함
          if (!val.trim()) {
            setResults([]);
            setIsOpen(false);
          } else {
            // 새로운 검색 시 1페이지로 리셋
            setPage(1);
          }
          onChange?.(val);
        }}
        placeholder={placeholder}
        className="box-border w-full rounded-[5px] border border-base-color bg-base-color-6 p-[17px_18px] pr-[40px] outline-none transition-all hover:border-primary-color focus:border-primary-color focus:ring-1 focus:ring-inset focus:ring-primary-color"
      />
      {query && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-[18px] top-[20px] flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-base-color-3">
          <XIcon className="text-base-color-6" />
        </button>
      )}
    </div>
  );

  const renderPagination = () => {
    if (results.length === 0) return null;

    const maxPage = Math.ceil(totalCount / 5);
    if (maxPage <= 1) return null;

    const pageNumbers = [];
    for (let i = 1; i <= Math.min(maxPage, 5); i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="flex items-center justify-center gap-[8px] border-t border-base-color py-[10px]">
        {pageNumbers.map((pageNum) => (
          <button
            key={pageNum}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handlePageChange(pageNum);
            }}
            className={`b6 cursor-pointer rounded px-[8px] py-[4px] hover:text-primary-color ${
              page === pageNum ? 'font-semibold text-primary-color' : 'text-base-color-1'
            }`}>
            {pageNum}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div ref={containerRef} className="scroll-mt-10">
      <FormItem label={label || '장소'} required={required}>
        <Dropdown isOpen={isOpen && results.length > 0} onClose={() => setIsOpen(false)} trigger={trigger}>
          <div className="max-h-[450px] overflow-y-auto">
            {results.map((item, idx) => (
              <div
                key={`${item.x}-${item.y}-${idx}`}
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleSelect(item);
                }}
                className={`flex cursor-pointer items-start gap-[4px] p-[20px] transition-colors hover:bg-base-color-5 ${
                  idx !== results.length - 1 ? 'border-b border-base-color-4' : ''
                }`}>
                <div className="mt-0">
                  <PinIcon />
                </div>
                <div className="flex flex-col">
                  <span
                    className="b4 leading-tight text-base-color-3"
                    dangerouslySetInnerHTML={{
                      __html: item.place_name.replace(
                        new RegExp(`(${query})`, 'gi'),
                        '<span class="text-primary-color">$1</span>',
                      ),
                    }}></span>
                  <span className="b6 mt-1 text-base-color-3">
                    {item.road_address_name || item.address_name || '주소 정보 없음'}
                  </span>
                </div>
              </div>
            ))}
          </div>
          {renderPagination()}
        </Dropdown>
      </FormItem>
    </div>
  );
};

export default PlaceSearch;
