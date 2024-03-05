/**
 * 发送一个事件
 */
export function dispatchEvent( eventName: string, value: HTMLElement | Element ) {
	/*
	* 注册事件
	* */
	const event = new CustomEvent( eventName, {
		detail: {
			element: value,
		},
	} );
	window.dispatchEvent( event );
}