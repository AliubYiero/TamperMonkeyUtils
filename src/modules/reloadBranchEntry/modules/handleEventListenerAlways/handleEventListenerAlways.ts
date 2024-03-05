import {
	RequiredElementWaiterOptionInterface,
} from '../../../reloadParam/interfaces/requiredElementWaiterOptionInterface.ts';
import { dispatchEvent, ElementMutationObserver } from '../../utils';

/**
 * 监听事件, 持续性兑现元素
 */
export const handleEventListenerAlways = ( options: RequiredElementWaiterOptionInterface ): void => {
	
	/*
	* 查看是否已经载入元素
	* */
	const loadElementNodeList = options.fatherDom.querySelectorAll( options.aimSelector );
	// 如果已经载入元素, 则先兑现元素
	if ( loadElementNodeList.length ) {
		loadElementNodeList.forEach( e => {
			dispatchEvent( options.eventListenerName, e as HTMLElement );
		} );
	}
	
	/*
	* 持续兑现元素
	* */
	new ElementMutationObserver( options, ( e ) => {
		// 找到元素, 兑现元素
		dispatchEvent( options.eventListenerName, e as unknown as HTMLElement );
	} );
};