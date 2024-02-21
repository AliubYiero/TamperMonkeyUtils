# GM Menu Controller

> [[English](https://github.com/AliubYiero/TamperMonkeyUtils/tree/GMMenuController#gm-menu-controller)] | [[中文](https://github.com/AliubYiero/TamperMonkeyUtils/tree/GMMenuController#gm-menu-controller---%E6%B2%B9%E7%8C%B4%E8%8F%9C%E5%8D%95%E6%8E%A7%E5%88%B6%E5%99%A8)]

> **My English is not well. For that, I ask for your understanding.**

## Install
```plain
npm i -S @yiero/gm-menu-controller
```

## Use

> **import class instance**

```js
import {GMMenuController} from '@yiero/gm-menu-controller';

// get instance only using GMMenuController.getInstance() method.
const menuController = GMMenuController.getInstance();
```

> **change GM Menu Controller options** (see [details](https://github.com/AliubYiero/TamperMonkeyUtils/tree/GMMenuController#gm-menu-controller-options))

```js
// default options without changing
menuController.changeOption({
	showIndex: false,
	containHideIndex: true,
});
```

> **get `menuList` which you will control.**

```js
// Command use `const` to receive `menuList`,
// to prevent Proxy in `menuList`.
const menuList = menuController.getProxy();
```

---

> when you receive `menuList`, you can use `menuList` like an array. 
>
> every array item is a object contain `title`, `onClick`, `isShow*`, `accessKey*` properties (* means optional prama), (see [details](https://github.com/AliubYiero/TamperMonkeyUtils/tree/GMMenuController#gm-menu-menu-list-item-property))
>
> Every time the data in `menuList` is changed, the display is updated in real time. 

> **add a menu button**

```js
menuList.push({
	title: 'test',
	onClick: () => {
		console.log('click callback');
	},
})
```

> **add multi menu buttons**

```js
menuList.push(
	{
		title: 'test1',
		onClick: () => {
			console.log( 'test1 click callback' );
		},
		isShow: true,
		accessKey: 'A',
	},
	{
		title: 'test2',
		onClick: () => {
			console.log( 'test2 click callback' );
		},
		isShow: false,
	},
);
```

> **change a menu button visibility**

```js
// hide menu button which index 0
menuList[0].isShow = false;
```



## Property

### GM Menu Controller options

| options             | type      | description                                                  | default value |
| ------------------- | --------- | ------------------------------------------------------------ | ------------- |
| `showIndex*`        | `boolean` | show `menuList` index before menu title.                     | `false`       |
| `containHideIndex*` | `boolean` | when opening `containHideIndex` option, it will show index using `menuList` length. <br />when closing, it will show index using visible items in browser.<br />**This option will come into effect when `showIndex` option open.** | `true`        |



### GM Menu Menu List Item Property

| property     | type                                            | description                                             | default value |
| ------------ | ----------------------------------------------- | ------------------------------------------------------- | ------------- |
| `title`      | `string`                                        | menu button title.                                      | *Required*    |
| `onClick`    | `(event: (MouseEvent | KeyboardEvent)) => void` | callback function when user click menu button.          | *Required*    |
| `isShow*`    | `boolean`                                       | control visibility user can see menu button in browser. | `true`        |
| `accessKey*` | `string`                                        | hot key to control menu button.                         | `''`          |

---

# GM Menu Controller - 油猴菜单控制器

> [[English](https://github.com/AliubYiero/TamperMonkeyUtils/tree/GMMenuController#gm-menu-controller)] | [[中文](https://github.com/AliubYiero/TamperMonkeyUtils/tree/GMMenuController#gm-menu-controller---%E6%B2%B9%E7%8C%B4%E8%8F%9C%E5%8D%95%E6%8E%A7%E5%88%B6%E5%99%A8)]

## 安装
```plain
npm i -S @yiero/gm-menu-controller
```

## 使用

> **引入唯一实例**
>
> *\*唯一实例*: 无论引入多少次, 都是同一个类实例, 配置和数据都不会改变. 

```js
import {GMMenuController} from '@yiero/gm-menu-controller';

// 只能通过 GMMenuController.getInstance() 方法获取唯一类实例 (无法通过 new 获取)
const menuController = GMMenuController.getInstance();
```

> **改变 GM Menu Controller 配置** (查看 [配置详情](https://github.com/AliubYiero/TamperMonkeyUtils/tree/GMMenuController?tab=readme-ov-file#gm-menu-controller-%E9%85%8D%E7%BD%AE))

```js
// 默认配置
menuController.changeOption({
	showIndex: false,
	containHideIndex: true,
});
```

> **获取用于控制菜单按钮的 `menuList` 数组**

```js
// 推荐使用 `const` 接收获取到的数组, 防止意外覆盖掉数组导致代理失效
const menuList = menuController.getProxy();
```

---

> 您可以向一个正常数组 (Array) 一样使用接收到的 `menuList` 数组, 
>
> 每一个 `menuList` 项都是一个包含 `title`, `onClick`, `isShow*`, `accessKey*` 属性的对象 (*表示可选参数), (查看 [配置详情](https://github.com/AliubYiero/TamperMonkeyUtils/tree/GMMenuController?tab=readme-ov-file#gm-menu-menu-list-%E6%95%B0%E7%BB%84%E9%A1%B9%E5%AF%B9%E8%B1%A1%E5%B1%9E%E6%80%A7))
>
> 每一次更改 `menuList` 中的数据, 都会实时更新显示. 

> **添加一个菜单按钮**

```js
menuList.push({
	title: 'test',
	onClick: () => {
		console.log('click callback');
	},
})
```

> **添加多个菜单按钮**

```js
menuList.push(
	{
		title: 'test1',
		onClick: () => {
			console.log( 'test1 click callback' );
		},
		isShow: true,
		accessKey: 'A',
	},
	{
		title: 'test2',
		onClick: () => {
			console.log( 'test2 click callback' );
		},
		isShow: false,
	},
);
```

> **改变菜单按钮的显示**

```js
// 隐藏索引为`0`的菜单按钮
menuList[0].isShow = false;
```



## 属性

### GM Menu Controller 配置

| options             | type      | description                                                  | default value |
| ------------------- | --------- | ------------------------------------------------------------ | ------------- |
| `showIndex*`        | `boolean` | 显示菜单按钮编号在菜单按钮标题前.                            | `false`       |
| `containHideIndex*` | `boolean` | 当开启 `containHideIndex` 配置时, 将按照 `menuList` 的长度显示编号 (忽略按钮是否可见). <br />当关闭 `containHideIndex` 配置时, 将按照实际显示在用户面前的菜单按钮显示编号.<br />**需开启 `showIndex` 配置后才可以看见效果.** | `true`        |



### GM Menu Menu List 数组项对象属性

| property     | type                                            | description           | default value |
| ------------ | ----------------------------------------------- | --------------------- | ------------- |
| `title`      | `string`                                        | 菜单按钮标题.         | *必填参数*    |
| `onClick`    | `(event: (MouseEvent | KeyboardEvent)) => void` | 用户点击时的回调函数. | *必填参数*    |
| `isShow*`    | `boolean`                                       | 控制当前按钮是否可见. | `true`        |
| `accessKey*` | `string`                                        | 按钮快捷键设置.       | `''`          |
