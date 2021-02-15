import type { IApi } from 'umi';

/**
 * 将 umi 的配置修改成可以用于生成插件文件的状态
 * @param api
 */
export default (api: IApi) => {
  api.modifyConfig((config) => {
    // 需要将页面按照 mpa 进行打包输出
    config.mpa = {};

    // 导出的 HTML 路由需要带 html 后缀
    config.exportStatic = {
      htmlSuffix: true,
    };

    // const { figma } = config;

    config.devServer = {
      ...config.devServer,
      // 将插件所需的文件全部写入到 dist 目录
      writeToDisk: (filePath) => {
        const isUmiFile = filePath.match(/umi\./);
        const isHotUpdateFile = filePath.match(/hot-update\.js.*/);
        return !(isUmiFile || isHotUpdateFile);
      },
    };

    return config;
  });

  api.chainWebpack((config) => {
    // 删除 hmr 插件
    // 保证figma 本地可正常执行
    config.plugins.delete('hmr');

    return config;
  });
};
