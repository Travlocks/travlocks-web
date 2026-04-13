import path from 'node:path';

/** Vite / Storybook 공통 `resolve.alias` (프로젝트 루트 기준). */
export function getResolveAliases(projectRoot: string) {
  const src = path.join(projectRoot, 'src');
  return [
    { find: '@', replacement: src },
    { find: '@feature', replacement: path.join(src, 'feature') },
    { find: '@pages', replacement: path.join(src, 'pages') },
    { find: '@shared', replacement: path.join(src, 'shared') },
    { find: '@apis', replacement: path.join(src, 'shared/apis') },
    { find: '@assets', replacement: path.join(src, 'shared/assets') },
    { find: '@components', replacement: path.join(src, 'shared/components') },
    { find: '@constants', replacement: path.join(src, 'shared/constants') },
    { find: '@data', replacement: path.join(src, 'shared/data') },
    { find: '@hooks', replacement: path.join(src, 'shared/hooks') },
    { find: '@layouts', replacement: path.join(src, 'shared/layouts') },
    { find: '@routes', replacement: path.join(src, 'shared/routes') },
    { find: '@stores', replacement: path.join(src, 'shared/stores') },
    { find: '@types', replacement: path.join(src, 'shared/types') },
    { find: '@utils', replacement: path.join(src, 'shared/utils') },
  ] as const;
}
