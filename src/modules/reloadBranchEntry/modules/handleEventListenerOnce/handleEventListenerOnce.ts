import {
	RequiredElementWaiterOptionInterface,
} from '../../../reloadParam/interfaces/requiredElementWaiterOptionInterface.ts';
import { dispatchEvent, ElementMutationObserver } from '../../utils';
import { print, TimeoutController } from '../../../../utils';

/**
 * 事件事件监听兑现一次元素
 */
export const handleEventListenerOnce = ( options: RequiredElementWaiterOptionInterface ): void => {
	
	/*
	* 查看是否已经载入元素
	* */
	const isLoadElement = options.fatherDom.querySelector( options.aimSelector ) as HTMLElement | null;
	// 如果已经载入元素, 则直接兑现元素
	if ( isLoadElement ) {
		dispatchEvent( options.eventListenerName, isLoadElement as HTMLElement );
		return;
	}
	
	/*
	* 设置超时计时器
	* */
	const timeoutController = new TimeoutController( () => {
			// 超时关闭监听
			elementMutationObserver.close();
			// 提示超时
			print.warn( 'time out.' );
			// 兑现失败
			throw new Error( 'time out' );
		},
		options.timeoutPerSecond * 1000,
	);
	options.timeoutPerSecond && timeoutController.begin();
	
	const elementMutationObserver = new ElementMutationObserver( options, ( e ) => {
		// 找到元素, 兑现元素
		dispatchEvent( options.eventListenerName, e as unknown as HTMLElement );
		// 停止监听
		elementMutationObserver.close();
		// 停止超时计时
		timeoutController.stop();
	} );
};