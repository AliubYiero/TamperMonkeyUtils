/**
 * 事件监听回调句柄
 *
 * 可以关闭事件监听
 */
export interface EventListenerHandler {
	close: () => boolean;
}