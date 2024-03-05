import { ElementType } from './interfaces/elementType.ts';

/**
 * 获取元素
 *
 * 先判断目标元素是否存在于父容器的节点中,
 * 再判断目标元素是否就是父容器
 */
export const getElement = ( container: HTMLElement, aimSelector: string ): HTMLElement | null => {
	/*
	* 先判断目标元素是否在容器的子节点中
	* */
	let element = container.querySelector( aimSelector ) as HTMLElement | null;
	// 如果获取到元素, 直接返回元素
	if ( element ) {
		return element;
	}
	
	// 未获取元素, 开始查找父容器是否就是目标元素
	
	// 将目标元素选择器切割成 (标签, 类, id, 属性) 的字符串数组
	const aimSelectorList = aimSelector
		.split( /(?=[.#:[])|(\b +\b)|((?<=]) +\b)/ )
		.filter( i =>
			i
			&& ( i.startsWith( '.' )
				|| i.startsWith( '#' )
				|| i.startsWith( '[' )
				|| i.match( /^[a-zA-Z]+$/ )
			) );
	// 将字符串数组规范成 {type: ElementType, content: string}[] 的数组
	const aimSelectorInfoList: {
		type: ElementType;
		content: string
	}[] = aimSelectorList.map( ( i ): {
		type: ElementType,
		content: string
	} => {
		// 类名
		if ( i.startsWith( '.' ) ) {
			return {
				type: ElementType.selector,
				content: i.slice( 1 ),
			};
		}
		
		// id名
		if ( i.startsWith( '#' ) ) {
			return {
				type: ElementType.id,
				content: i.slice( 1 ),
			};
		}
		
		// 标签名
		if ( i.match( /^[a-zA-Z]+$/ ) ) {
			return {
				type: ElementType.tagName,
				content: i.toUpperCase(),
			};
		}
		
		// 属性名
		if ( i.startsWith( '[' ) ) {
			return {
				type: ElementType.attribute,
				content: i
					.replace( /\b\s*=\s*(?=['"])/g, '=' )
					.slice( 1, -1 ),
			};
		}
		
		return {
			type: ElementType.undefined,
			content: '',
		};
	} );
	
	// 如果返回有值, 说明 selector 对应失败, aimSelector 不在父容器上
	const notFoundElement = aimSelectorInfoList.find( item => {
		let isFound: boolean = false;
		
		// id 选择器
		if ( item.type === ElementType.id ) {
			isFound = item.content === container.id;
		}
		// 类选择器
		if ( item.type === ElementType.selector ) {
			isFound = container.classList.contains( item.content );
		}
		// 标签选择器
		if ( item.type === ElementType.tagName ) {
			isFound = item.content === container.tagName;
		}
		// 属性选择器
		if ( item.type === ElementType.attribute ) {
			const [ key ] = item.content.split( '=' );
			isFound =
				// @ts-ignore 忽略attributes只能是数字的限制 (实际可以使用属性名作为key)
				item.content === `${ key }="${ container.attributes[ key ] }"`
				// @ts-ignore 忽略attributes只能是数字的限制 (实际可以使用属性名作为key)
				|| item.content === `${ key }='${ container.attributes[ key ] }'`;
		}
		
		return !isFound;
	} );
	
	// 没有找到元素, 返回null
	if ( notFoundElement ) {
		return null;
	}
	
	// 找到元素, 返回元素
	return container;
};