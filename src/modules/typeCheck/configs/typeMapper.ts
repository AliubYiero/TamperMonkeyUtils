import { ElementWaiterTypeMapper } from '../interfaces/elementWaiterTypeMapper.ts';

/**
 * 类型检测映射
 */
export const typeMapper: ElementWaiterTypeMapper = [
	[ 'aimSelector', 'String' ],
	[ 'alwaysListen', 'Boolean' ],
	[ 'openEventListener', 'Boolean' ],
	[ 'openPromise', 'Boolean' ],
	[ 'eventListenerName', 'String' ],
	[ 'fatherDom', ( typeString: string ) => typeString.startsWith( 'HTML' ) && typeString.endsWith( 'Element' ) ],
	[ 'delayPerSecond', 'Number' ],
	[ 'secondJumpSelector', 'String' ],
	[ 'timeoutPerSecond', 'Number' ],
	[ 'mutationObserverOptions', 'Object' ],
];