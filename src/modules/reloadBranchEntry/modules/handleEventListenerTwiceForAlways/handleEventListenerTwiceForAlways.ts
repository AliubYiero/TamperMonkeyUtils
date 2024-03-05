import {
	RequiredElementWaiterOptionInterface,
} from '../../../reloadParam/interfaces/requiredElementWaiterOptionInterface.ts';
import {
	handleEventListenerOnce,
} from '../handleEventListenerOnce/handleEventListenerOnce.ts';
import {
	handleEventListenerAlways,
} from '../handleEventListenerAlways/handleEventListenerAlways.ts';

/**
 * 监听时间, 二次跳转持续性监听元素
 */
export const handleEventListenerTwiceForAlways = ( options: RequiredElementWaiterOptionInterface ): void => {
	const firstJumpOptions: RequiredElementWaiterOptionInterface = {
		...options,
		aimSelector: options.secondJumpSelector,
		eventListenerName: 'firstJumpElementUpdate',
		mutationObserverOptions: options.defaultMutationObserverOptions,
	};
	handleEventListenerOnce( firstJumpOptions );
	
	window.addEventListener( 'firstJumpElementUpdate', ( e ) => {
		// @ts-ignore 忽略 Event 类无法重定向到 CustomEvent类
		const result = e.detail.element;
		
		if ( !result ) {
			return;
		}
		
		/*
		* 监听元素载入
		* */
		handleEventListenerAlways( {
			...options,
			fatherDom: result,
		} );
	} );
	
};