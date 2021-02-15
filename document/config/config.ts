import { defineConfig } from 'umi';

export default defineConfig({
  title: 'umi-plugin-figma',
  mode: 'site',
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: 'css',
      },
    ],
  ],
  navs: [
    null,
    {
      title: 'GitHub',
      path: 'https://github.com/arvinxx/umi-plugin-figma',
    },
  ],
  dynamicImport: {
    loading: '@ant-design/pro-skeleton',
  },
  history: {
    type: 'hash',
  },
  hash: true,
});
