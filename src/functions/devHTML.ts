import type { IApi } from 'umi';
import got from 'got';
import { join } from 'path';
import fse from 'fs-extra';
import { baseDevURL, isDev } from '../utils';

/**
 * 开发阶段生成相应的开发用 HTML 文件
 * @param api
 */
export default (api: IApi) => {
  if (!isDev) return;

  const { paths } = api.service;

  const htmlPath = join(paths.absOutputPath!, 'index.html');
  const saveDevHtml = () => {
    got(baseDevURL).then((res) => {
      // 生成文件
      fse.writeFileSync(htmlPath, res.body, 'utf-8');
    });
  };

  api.onDevCompileDone(saveDevHtml);
};
