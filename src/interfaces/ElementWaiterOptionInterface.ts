export interface ElementWaiterOptionInterface {
	/**
	 * 目标元素选择器 (Selector)
	 */
	aimSelector: string;
	
	/**
	 * 用于监听的父元素节点
	 *
	 * @default document.body
	 */
	fatherDom?: HTMLElement | Element;
	
	/**
	 * 监听超时时间 (s)
	 *
	 * 与 `alwaysListen` 属性无法一起使用, `alwaysListen` 属性的优先级更高
	 *
	 * @default 20
	 */
	timeoutPerSecond?: number;
	
	/**
	 * 获取到元素后, 兑现的延时时间 (s)
	 *
	 * 用于防止某些网站加载到元素之后,
	 * 仍然会进行一次元素 DOM 更新,
	 * 导致的元素节点丢失
	 *
	 * @default 0.3
	 */
	delayPerSecond?: number;
	
	/**
	 * 持续性监听
	 *
	 * 开启后将持续性监听目标元素载入, 否则只会兑现一次后就关闭监听
	 *
	 * 与 `timeoutPerSecond` 属性无法一起使用, `alwaysListen` 属性的优先级更高
	 *
	 * @default false
	 */
	alwaysListen?: boolean;
	
	/**
	 * 二次监听中转选择器 (Selector)
	 *
	 * 通常和 `alwaysListen` 属性配合一起使用,
	 * 用于持续性监听某个容器中的元素更新/载入
	 *
	 * @default ''
	 */
	secondJumpSelector?: string;
	
	/**
	 * 监听事件,
	 * 开启后可以通过 `document.addEventListener('elementUpdate', (e) => {
	 *  const node = e.detail;
	 * })` 获取新载入的元素
	 *
	 * 可以通过 `eventListenerName` 属性改变监听事件名称
	 *
	 * @default false
	 */
	openEventListener?: boolean;
	
	/**
	 * 使用 Promise 停止进程,
	 * 直到 Promise 获取到元素兑现,
	 * 或者超时被拒绝.
	 *
	 * 默认开启,
	 * 只能用于等待单个元素,
	 * 若需要持续性获取某些元素的载入,
	 * 则需要开启 `openEventListener` 选项.
	 *
	 * @default true
	 */
	openPromise?: boolean;
	
	/**
	 * 事件监听器名称
	 *
	 * @default 'elementUpdate'
	 */
	eventListenerName?: string;
	
	/**
	 * 原生 MutationObserver 配置, 将覆盖原本的配置
	 *
	 * 如果使用了 `secondJumpSelector`,
	 * 那么将会被用于最后一次监听,
	 * 中转监听会仍然是默认配置
	 *
	 * @default {
	 * 	subtree: true,
	 * 	childList: true
	 * }
	 */
	mutationObserverOptions?: MutationObserverInit;
}