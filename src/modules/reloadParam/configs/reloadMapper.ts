/* 参数重载 */
import { ReloadMapperInterface } from '../interfaces/reloadMapperInterface.ts';

export const reloadMapper: ReloadMapperInterface[] = [
	// 分支1 - Promise
	[
		( value ) => {
			return Boolean(
				value.openPromise
				|| ( value.openPromise === undefined
					&& !value.openEventListener ),
			);
		},
		[
			'aimSelector', 'fatherDom',
			'openPromise',
			'timeoutPerSecond', 'delayPerSecond',
			'mutationObserverOptions',
		],
	],
	// 分支2 - 事件监听 - 单次监听
	[
		( value ) => {
			// noinspection PointlessBooleanExpressionJS
			return Boolean(
				( value.openPromise === false
					|| value.openEventListener )
				&& !value.alwaysListen,
			);
		},
		[
			'aimSelector', 'fatherDom',
			'openEventListener', 'eventListenerName'
			, 'alwaysListen',
			'delayPerSecond',
			'mutationObserverOptions',
		],
	],
	// 分支3 - 事件监听 - 持续监听
	[
		( value ) => {
			// noinspection PointlessBooleanExpressionJS
			return Boolean(
				( value.openPromise === false
					|| value.openEventListener )
				&& value.alwaysListen
				&& !value.secondJumpSelector,
			);
		},
		[
			'aimSelector', 'fatherDom',
			'openEventListener', 'eventListenerName',
			'alwaysListen',
			'delayPerSecond',
			'mutationObserverOptions',
		],
	],
	// 分支4 - 事件监听 - 二次跳转持续监听
	[
		( value ) => {
			// noinspection PointlessBooleanExpressionJS
			return Boolean(
				( value.openPromise === false
					|| value.openEventListener )
				&& value.alwaysListen
				&& value.secondJumpSelector,
			);
		},
		[
			'aimSelector', 'fatherDom', 'secondJumpSelector',
			'openEventListener', 'eventListenerName',
			'alwaysListen',
			'delayPerSecond',
			'mutationObserverOptions', 'defaultMutationObserverOptions',
		],
	],

];