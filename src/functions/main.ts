import { join } from 'path';
import fse from 'fs-extra';
import type { IApi } from 'umi';

/**
 *  将 background 添加到打包对象中
 *  并在输出结果中添加 background 脚本
 * @param api
 */
export default (api: IApi) => {
  const { paths } = api.service;

  api.chainWebpack((config) => {
    const { main } = <Manifest>api.config.figma;

    // 将 main 作为一个入口插入打包对象中

    config.entry('main').add(main);
    return config;
  });

  const replaceOutputBackgroundPath = () => {
    const filepath = join(paths.absOutputPath!, 'manifest.json');

    const manifest: Manifest = fse.readJSONSync(filepath);

    if (manifest.main) {
      manifest.main = 'main.js';
    }

    fse.writeJSONSync(filepath, manifest);
  };
  api.onDevCompileDone(replaceOutputBackgroundPath);
  api.onBuildComplete(replaceOutputBackgroundPath);
};
