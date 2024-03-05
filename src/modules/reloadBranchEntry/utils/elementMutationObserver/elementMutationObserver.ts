import {
	RequiredElementWaiterOptionInterface,
} from '../../../reloadParam/interfaces/requiredElementWaiterOptionInterface.ts';
import { getElement } from '../getElement/getElement.ts';

/**
 * @class
 * 监听元素载入类
 */
export class ElementMutationObserver {
	private mutationObserver: MutationObserver;
	private options: Pick<RequiredElementWaiterOptionInterface, 'aimSelector' | 'mutationObserverOptions' | 'fatherDom'>;
	
	constructor(
		options: Pick<
			RequiredElementWaiterOptionInterface,
			'aimSelector'
			| 'mutationObserverOptions'
			| 'fatherDom'
		>,
		callback: ( element: HTMLElement ) => void,
	) {
		this.options = options;
		
		/*
		* 监听元素载入
		* */
		this.mutationObserver = new MutationObserver( ( recordList ) => {
			for ( const record of recordList ) {
				for ( let addedNode of record.addedNodes ) {
					// 如果新增的节点不是元素节点, 则重新遍历
					if ( addedNode.nodeType !== Node.ELEMENT_NODE ) {
						continue;
					}
					
					// 新增元素
					const addedElement = addedNode as unknown as HTMLElement;
					
					/*
					* 获取元素
					* */
					const isGetElement = getElement( addedElement, options.aimSelector );
					
					// 没有找到元素, 继续遍历
					if ( !isGetElement ) {
						continue;
					}
					
					callback( getElement( addedElement as HTMLElement, options.aimSelector ) as unknown as HTMLElement );
					
					// 停止遍历
					return;
				}
			}
		} );
		
	}
	
	/**
	 * 开启监听
	 */
	open() {
		this.mutationObserver.observe(
			this.options.fatherDom as HTMLElement,
			this.options.mutationObserverOptions,
		);
	}
	
	/**
	 * 关闭监听
	 */
	close() {
		this.mutationObserver.disconnect();
	}
	
}