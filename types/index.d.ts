/**
 * 每个插件必须定义一个描述插件的 `manifest.json` 文件。
 * 如果使用“创建新插件”对话框，Figma将自动为您创建一个简单的清单。
 * 您可以扩展此生成的清单，以利用其他功能，例如，为插件声明一个子菜单。
 * @see https://www.figma.com/plugin-docs/manifest/
 */
declare interface Manifest {
  /**
   * 插件名称
   */
  name: string;
  /**
   * 将要发布的插件ID
   * 这个ID将由 Figma 分配给你，通常是通过“创建新插件”功能得到的(该功能会生成一个带有新 ID 的 `manifest.json`)
   * 你也可以在发布插件时获得一个新的插件ID。
   */
  id?: string;
  /**
   * 主文件
   */
  main: string;
  /**
   * API 版本
   * 插件使用的Figma API的版本。**建议您尽可能更新到最新版本，以获得最新功能，错误修复和文档。**
   * 但是，Figma 不会自动升级插件的 api 版本，这样开发者可以针对新版本的 API 测试插件。
   */
  api: string;
  /**
   *
   * 如果选择使用HTML显示 UI 的话, 该参数指定一个 HTML 文件, 通过 `figma.showUI` 方法在 iframe 模式下显示。
   *
   *  如果指定了单个字符串，则这是HTML文件的相对文件路径，其内容将通过变量 `__html__` 在Javascript代码中以字符串形式提供。
   *
   *  如果指定了一个 map 映射，则该映射的每个条目都将在__uiFiles__上可用
   *
   */
  ui?: string | Record<string, string>;
  /**
   * 这允许为插件指定一个子菜单，使插件能够包含多个命令。使用 `figma.command` 属性来确定用户选择了哪个命令。
   * menu属性包含要显示的菜单项、菜单分隔符和子菜单的嵌套列表。举个例子：
   * ```json
   * "menu": [
   *   {"name": "Create Text", "command": "text"},
   *   {"name": "Create Frame", "command": "frame"},
   *   {"separator": true},
   *   {
   *     "name": "Create Shape",
   *     "menu": [
   *       {"name": "Create Circle", "command": "circle"},
   *       {"separator": true},
   *       {"name": "Create Rectangle", "command": "rectangle"}
   *     ]
   *   }
   * ]
   *  ```
   *  详细可以查看 {@link ManifestMenuItem}
   *
   */
  menu?: ManifestMenuItem[];

  /**
   * 配置通过 `setRelaunchData` API 调用设置的重新启动按钮。
   *
   * 案例:
   * ```json
   * "relaunchButtons": [
   *    {"command": "edit", "name": "Edit shape"},
   *    {"command": "open", "name": "Open Shaper", "multipleSelection": true}
   * ]
   * ```
   * > 请注意，如果清单中的命令名称更改或删除，则带有该命令的所有按钮都将消失。
   * > 当插件不再支持特定操作时，可以使用此行为来删除按钮。
   *
   * 如果给定节点或选择的节点显示多个重新启动按钮，按钮的顺序由清单的relaunchButtons数组中的元素顺序决定。
   */
  relaunchButtons?: ManifestRelaunchButton[];

  /**
   * 此标志仅用于开发，在已发布的插件中不起作用
   * @see [Proposed API](https://www.figma.com/plugin-docs/proposed-api/).
   */
  enableProposedApi?: boolean;

  /**
   * This enables API that's specific to private plugins.
   * Setting this will also enable local plugins to work with these APIs during development.
   */
  enablePrivatePluginApi?: boolean;

  /**
   * 在加载 `main` 和 `ui` 中指定的文件之前要运行的shell命令。
   * 可以用来调用构建命令，比如用 Typescript 编译，运行 Webpack 等等。
   * 该命令在清单的目录下运行。
   *
   * @实验
   */
  build?: string;
}

/**
 * `umi-plugin-figma` 在 umi 中的 Config 配置参数.
 * 继承于 Manifest
 */
declare interface Config extends Manifest {}
/**
 * 菜单项目
 *  菜单属性中的每个项必须是以下三项之一：
 *  - 名称和命令属性。这将创建一个用户可单击的子菜单项。名称属性在菜单中显示给用户。 command属性从不公开给用户，而是通过figma.command javascript属性公开给您的插件。您可以选择任何字符串值作为命令。
 *  - 值为true的分隔符属性。这将在菜单中创建分隔符。用户不能选择分隔符。
 *  - 名称和菜单属性。这将创建一个嵌套子菜单。 name属性显示为子菜单的名称。 menu属性包含一个菜单项数组，这些菜单项遵循最顶层菜单清单属性的相同格式。用户不能选择子菜单本身，但是可以选择子菜单中的项目。子菜单可以任意深度嵌套。
 */
type ManifestMenuItem =
  /**
   *  Clickable menu item.
   */
  | { name: string; command: string }
  // Separator
  | { separator: true }
  // Submenu
  | { name: string; menu: ManifestMenuItem[] };

/**
 * 重新启动按钮数组中的每个重新启动按钮都是具有以下属性的对象：

 */
interface ManifestRelaunchButton {
  /**
   * 命令属性
   * 指定在按下按钮后运行插件时将提供的 `figma.command`。
   *
   * 此命令必须与 `setRelaunchData` API 调用中提供的命令匹配，按钮才能显示。
   *
   */
  command: string;
  /**
   * 显示为按钮文本的名称属性
   */
  name: string;
  /**
   * 一个的multipleSelection属性（），当选择多个节点时，该属性使“重新启动”按钮和描述能够出现。
   * 如果未将 `multipleSelection` 设置为 `true`，则仅当选择单个节点时才会出现重新启动按钮。
   * 即使当 multipleSelection` 为 `true` 时，仅当所有选定的节点都使用相同的命令附加了重新启动数据时，才会显示重新启动按钮。
   * @default false
   */
  multipleSelection?: boolean;
}
