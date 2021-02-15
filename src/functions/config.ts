import type { IApi } from 'umi';
import { join } from 'path';
import fse from 'fs-extra';
// import { baseDevURL, isDev } from '../utils';

declare module 'umi' {
  interface BaseIConfig {
    figma: Manifest;
  }
}

/**
 * 定义插件结构
 * @param api
 */
export default (api: IApi) => {
  const pkg = fse.readJSONSync(
    join(api.paths.absSrcPath!, '..', 'package.json'),
  );

  //  figma 插件结构
  api.describe({
    key: 'figma',
    config: {
      default: {
        name: pkg.name || 'umi extension figma',
        api: '1.0.0',
        main: '@/figma/main',
        id: 'umi-plugin-develop-figma',
      },
      /**
       * 校验器
       * @param joi
       */
      schema(joi) {
        const separator = joi.object({
          separator: joi.boolean().truthy(),
        });
        const basicMenuItem = joi.object({
          name: joi.string().required(),
          command: joi.string().required(),
        });
        const SubMenu = joi.object({
          name: joi.string().required(),
          menu: joi.object().required(),
        });

        const menuItem = joi.alternatives(basicMenuItem, separator, SubMenu);

        const relaunchButton = joi.object({
          command: joi.string().required(),
          name: joi.string().required(),
          multipleSelection: joi.boolean(),
        });

        return joi.object({
          name: joi.string().required(),
          id: joi.string().required(),
          api: joi.string().required(),
          main: joi.string().required(),
          ui: joi.alternatives(joi.string(), joi.object()),
          menu: joi.array().items(menuItem),
          relaunchButtons: joi.array().items(relaunchButton),
          enableProposedApi: joi.boolean(),
          enablePrivatePluginApi: joi.boolean(),
          build: joi.string(),
        });
      },
    },
  });
};
