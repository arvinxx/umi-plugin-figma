import type { IApi } from 'umi';
import GenerateJsonPlugin from 'generate-json-webpack-plugin';

/**
 *  生成 manifest.json 文件
 * @param api
 */
export default (api: IApi) => {
  api.chainWebpack((config) => {
    const manifest = <Manifest>api.config.figma;

    config
      .plugin('toJSON')
      .use(GenerateJsonPlugin, ['manifest.json', manifest]);

    return config;
  });
};
