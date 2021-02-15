import { defineConfig } from 'umi';
import { resolve } from 'path';

const isProdSite =
  // 不是预览模式 同时是生产环境
  process.env.NODE_ENV === 'production';

export default defineConfig({
  title: 'umi-plugin-develop-module',
  mode: 'site',
  // 部署在非根目录时, base 和 publicPath 都需要配置
  base: '/',
  publicPath: isProdSite ? '/umi-plugin-develop-module/' : '/',
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
      path: 'https://github.com/arvinxx/umi-plugin-develop-template',
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
