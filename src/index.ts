import {
	ElementWaiterOptionInterface,
} from './interfaces/ElementWaiterOptionInterface.ts';
import { paramsNormalization, reloadParam, typeCheck } from './modules';
import {
	RequiredElementWaiterOptionInterface,
} from './modules/reloadParam/interfaces/requiredElementWaiterOptionInterface.ts';
import { reloadMapper } from './modules/reloadParam/configs/reloadMapper.ts';
import { defaultValueMapper } from './modules/reloadParam/configs/defaultValueMapper.ts';
import { EventListenerHandler } from './interfaces/eventListenerHandler.ts';
import { typeMapper } from './modules/typeCheck/configs/typeMapper.ts';
import { BranchEntry } from './utils';
import { reloadBranchEntryMapper } from './modules/reloadBranchEntry';

/**
 * 重载1-1 Promise单次元素兑现
 */
function elementWaiter(
	aimSelector: ElementWaiterOptionInterface['aimSelector'],
	options?: Pick<
		ElementWaiterOptionInterface,
		'fatherDom' |
		'openPromise' |
		'timeoutPerSecond' | 'delayPerSecond' |
		'mutationObserverOptions'
	>,
): Promise<HTMLElement>;

/**
 * 重载1-2 Promise单次元素兑现
 */
function elementWaiter(
	options: Pick<
		ElementWaiterOptionInterface,
		'aimSelector' | 'fatherDom' |
		'openPromise' |
		'timeoutPerSecond' | 'delayPerSecond' |
		'mutationObserverOptions'
	>,
): Promise<HTMLElement>;

/**
 * 重载2-1 事件监听 单次监听回调返回元素
 */
function elementWaiter(
	aimSelector: ElementWaiterOptionInterface['aimSelector'],
	options?: Pick<
		ElementWaiterOptionInterface,
		'fatherDom' |
		'openEventListener' | 'eventListenerName'
		| 'alwaysListen' |
		'delayPerSecond' |
		'mutationObserverOptions'
	>,
): EventListenerHandler;


/**
 * 重载2-2 事件监听 单次监听回调返回元素
 */
function elementWaiter(
	options: Pick<
		ElementWaiterOptionInterface,
		'aimSelector' | 'fatherDom' |
		'openEventListener' | 'eventListenerName'
		| 'alwaysListen' |
		'delayPerSecond' |
		'mutationObserverOptions'
	>,
): EventListenerHandler;

/**
 * 重载3-1 事件监听 持续性监听回调返回元素
 */
function elementWaiter(
	options: Pick<
		ElementWaiterOptionInterface,
		'aimSelector' | 'fatherDom' |
		'openEventListener' | 'eventListenerName' |
		'alwaysListen' |
		'delayPerSecond' |
		'mutationObserverOptions'
	>,
): EventListenerHandler;

/**
 * 重载3-2 事件监听 持续性监听回调返回元素
 */
function elementWaiter(
	aimSelector: ElementWaiterOptionInterface['aimSelector'],
	options?: Pick<
		ElementWaiterOptionInterface,
		'fatherDom' |
		'openEventListener' | 'eventListenerName' |
		'alwaysListen' |
		'delayPerSecond' |
		'mutationObserverOptions'
	>,
): EventListenerHandler;

/**
 * 重载4-1 事件监听 二次跳转持续性监听回调返回元素
 */
function elementWaiter(
	options: Pick<
		ElementWaiterOptionInterface,
		'aimSelector' | 'fatherDom' | 'secondJumpSelector' |
		'openEventListener' | 'eventListenerName' |
		'alwaysListen' |
		'delayPerSecond' |
		'mutationObserverOptions'
	>,
): EventListenerHandler;
/**
 * 重载4-2 事件监听 二次跳转持续性监听回调返回元素
 */
function elementWaiter(
	aimSelector: ElementWaiterOptionInterface['aimSelector'],
	options?: Pick<
		ElementWaiterOptionInterface,
		'fatherDom' | 'secondJumpSelector' |
		'openEventListener' | 'eventListenerName' |
		'alwaysListen' |
		'delayPerSecond' |
		'mutationObserverOptions'
	>,
): EventListenerHandler;

/**
 * 元素等待器
 */
function elementWaiter( value1: any, value2?: any ) {
	/**
	 * 参数归一
	 */
	let options = paramsNormalization( value1, value2 ) as RequiredElementWaiterOptionInterface;
	
	/**
	 * 参数重载
	 */
	options = reloadParam( options, reloadMapper, defaultValueMapper );
	
	/**
	 * 类型检测
	 */
	typeCheck( options, typeMapper );
	
	/**
	 * 判断重载, 进行分支选择
	 */
	const reloadBranchEntry = new BranchEntry( reloadBranchEntryMapper, options );
	const reloadBranch = reloadBranchEntry.run();
	
	if ( !reloadBranch ) {
		throw new ReferenceError( 'branch not found' );
	}
	return reloadBranch( options );
}

export { elementWaiter };