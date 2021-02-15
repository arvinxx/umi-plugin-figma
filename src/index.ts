import type { IApi } from 'umi';
import { DevHTML } from './functions';

export default (api: IApi) => {
  // 生成开发所需的 html 文件
  DevHTML(api);
};
