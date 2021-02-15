import type { IApi } from 'umi';
import {
  DevHTML,
  ManifestGenerator,
  ConfigSchema,
  BaseConfig,
  MainScript,
} from './functions';

export default (api: IApi) => {
  // 将 umi 的基础配置修改成适配figma插件开发的模式
  BaseConfig(api);

  // 生成开发所需的 html 文件
  DevHTML(api);
  // main 脚本
  MainScript(api);

  // 配置 config 的 schema
  ConfigSchema(api);

  // 生成 manifest 配置文件
  ManifestGenerator(api);
};
