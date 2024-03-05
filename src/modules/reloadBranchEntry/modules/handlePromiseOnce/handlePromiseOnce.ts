import {
	RequiredElementWaiterOptionInterface,
} from '../../../reloadParam/interfaces/requiredElementWaiterOptionInterface.ts';
import { print, TimeoutController } from '../../../../utils';
import { ElementMutationObserver } from '../../utils';


/**
 * 使用 Promise 兑现一次元素
 */
export const handlePromiseOnce = ( options: RequiredElementWaiterOptionInterface ): Promise<HTMLElement> => {
	return new Promise( ( resolve, reject ) => {
		/*
		* 查看是否已经载入元素
		* */
		const isLoadElement = options.fatherDom.querySelector( options.aimSelector ) as HTMLElement | null;
		// 如果已经载入元素, 则直接兑现元素
		if ( isLoadElement ) {
			resolve( isLoadElement as HTMLElement );
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
				reject( 'time out' );
			},
			options.timeoutPerSecond * 1000,
		);
		options.timeoutPerSecond && timeoutController.begin();
		
		const elementMutationObserver = new ElementMutationObserver( options, ( e ) => {
			// 找到元素, 兑现元素
			resolve( e as unknown as HTMLElement );
			// 停止监听
			elementMutationObserver.close();
			// 停止超时计时
			timeoutController.stop();
		} );
	} );
};