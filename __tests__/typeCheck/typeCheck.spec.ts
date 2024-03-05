import { describe, expect, it } from 'vitest';
import {
	RequiredElementWaiterOptionInterface,
} from '../../src/modules/reloadParam/interfaces/requiredElementWaiterOptionInterface';
import { typeCheck } from '../../src/modules/typeCheck/typeCheck';
import { typeMapper } from '../../src/modules/typeCheck/configs/typeMapper';

describe( 'Type Check', () => {
	it( 'success', () => {
		const defaultValueMapper: RequiredElementWaiterOptionInterface = {
			/* 目标元素选择器 */
			aimSelector: '',
			/* 监听容器 */
			// @ts-ignore
			fatherDom: document.body,
			/* 持续性监听 */
			alwaysListen: true,
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
		
		expect( () => typeCheck( defaultValueMapper, typeMapper ) ).not.toThrowError( /^.*/ );
	} );
	
	it( 'fail (Type Error)', () => {
		const defaultValueMapper: RequiredElementWaiterOptionInterface = {
			/* 目标元素选择器 */
			aimSelector: '',
			/* 监听容器 */
			// @ts-ignore 忽略document环境缺少警告
			fatherDom: document.body,
			/* 持续性监听 */
			// @ts-ignore 忽略类型错误
			alwaysListen: 12,
			/* 兑现延时 */
			// @ts-ignore 忽略类型错误
			delayPerSecond: '0.3',
			/* 中转元素选择器 */
			secondJumpSelector: '',
			/* 超时延时 */
			timeoutPerSecond: 20,
			/* 开启Promise模式 */
			// @ts-ignore 忽略类型错误
			openPromise: 12,
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
		
		expect( () => typeCheck( defaultValueMapper, typeMapper ) ).toThrowError( /^.*/ );
	} );
} );