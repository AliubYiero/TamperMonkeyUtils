import {
	RequiredElementWaiterOptionInterface,
} from '../interfaces/requiredElementWaiterOptionInterface.ts';

/**
 * 默认值映射
 */
export const defaultValueMapper: RequiredElementWaiterOptionInterface = {
	/* 目标元素选择器 */
	aimSelector: '',
	/* 监听容器 */
	fatherDom: document.body,
	/* 持续性监听 */
	alwaysListen: false,
	/* 兑现延时 */
	delayPerSecond: 0.3,
	/* 中转元素选择器 */
	secondJumpSelector: '',
	/* 超时延时 */
	timeoutPerSecond: 20,
	/* 开启Promise模式 */
	openPromise: true,
	/* 监听事件开关 */
	openEventListener: false,
	/* 监听事件名称 */
	eventListenerName: 'elementUpdate',
	/* 用户 observe 配置 */
	mutationObserverOptions: {
		subtree: true,
		childList: true,
	},
	/* 默认 observe 配置 */
	defaultMutationObserverOptions: {
		subtree: true,
		childList: true,
	},
};