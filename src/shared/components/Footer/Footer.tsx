import GitHubIcon from '@/shared/assets/logo/logo-github.svg?react';
import NotionIcon from '@/shared/assets/logo/logo-notion.svg?react';
import TravlocksLogo from '@/shared/assets/logo/logo-gray.svg?react';

export const Footer = () => {
  return (
    <footer className="relative w-full bg-base-color-6">
      <div className="mx-auto max-w-[1920px] pl-[391px] pr-[323px] py-[48px]">
        <div className="flex items-start justify-between">
          {/* 왼쪽: 로고, 저작권 */}
          <div className="flex w-[292px] shrink-0 flex-col gap-[25px]">
            <div className="h-10 w-[181px]">
              <TravlocksLogo />
            </div>

            {/* 저작권 정보 */}
            <div className="flex flex-col gap-1 pl-[32px]">
              <p className="b6 font-light text-base-color-3 whitespace-nowrap">9th UMC PROJECT.</p>
              <p className="b6 font-light text-base-color-3 whitespace-nowrap">©2026 TRAVLOCKS. All rights reserved.</p>
            </div>
          </div>

          {/* 오른쪽: CONTACT, MANAGEMENT, DEVELOPERS, 소셜 아이콘 */}
          <div className="flex flex-1 flex-col gap-[25px] items-end">
            {/* 첫 번째 줄: CONTACT, FRONT-END */}
            <div className="flex gap-[54px] mr-[108px]">
              {/* CONTACT */}
              <div className="flex w-[197px] shrink-0 flex-col gap-2">
                <h3 className="b5 font-medium text-base-color-3">CONTACT</h3>
                <p className="b6 text-base-color-1">travlocksserver@gmail.com</p>
              </div>

              {/* FRONT-END DEVELOPER */}
              <div className="flex min-w-0 flex-1 flex-col gap-2">
                <h3 className="b5 font-medium text-base-color-3">FRONT-END DEVELOPER</h3>
                <div className="flex flex-wrap gap-3">
                  <span className="b6 font-light text-base-color-1">김진효(Lead)</span>
                  <span className="b6 font-light text-base-color-1">정윤철</span>
                  <span className="b6 font-light text-base-color-1">조성민</span>
                  <span className="b6 font-light text-base-color-1">황무원</span>
                </div>
              </div>
            </div>

            {/* 두 번째 줄: MANAGEMENT, BACK-END */}
            <div className="flex gap-[54px] pb-[23px]">
              {/* MANAGEMENT */}
              <div className="flex w-[197px] shrink-0 flex-col gap-2">
                <h3 className="b5 font-medium text-base-color-3">MANAGEMENT</h3>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <span className="b6 text-base-color-1">PM</span>
                    <span className="b6 font-light text-base-color-1">윤다인</span>
                  </div>
                  <div className="h-[15px] w-px bg-base-color" />
                  <div className="flex items-center gap-1">
                    <span className="b6 text-base-color-1">PD</span>
                    <span className="b6 font-light text-base-color-1">권예림</span>
                  </div>
                </div>
              </div>

              {/* BACK-END DEVELOPER */}
              <div className="flex min-w-0 flex-1 flex-col gap-2">
                <h3 className="b5 font-medium text-base-color-3">BACK-END DEVELOPER</h3>
                <div className="flex flex-wrap gap-3">
                  <span className="b6 font-light text-base-color-1">권형미(Lead)</span>
                  <span className="b6 font-light text-base-color-1">권도희</span>
                  <span className="b6 font-light text-base-color-1">김도현</span>
                  <span className="b6 font-light text-base-color-1">김예린</span>
                  <span className="b6 font-light text-base-color-1">장수현</span>
                  <span className="b6 font-light text-base-color-1">전다인</span>
                </div>
              </div>
            </div>

            {/* 소셜 아이콘 */}
            <div className="flex items-center justify-end gap-[15px]">
              <a
                href="https://lake-fighter-3f3.notion.site/2fd9d6b4e3be80798d06d8a144b34bc2"
                target="_blank"
                rel="noopener noreferrer"
                className="text-base-color-6 transition-opacity hover:opacity-80">
                <NotionIcon className="h-[31px] w-[30px]" />
              </a>
              <a
                href="https://github.com/Travlocks"
                target="_blank"
                rel="noopener noreferrer"
                className="text-base-color-6 transition-opacity hover:opacity-80">
                <GitHubIcon className="h-[30px] w-[30px]" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
