import {
	BranchEntryItemInterface,
} from '../../../utils/BranchEntry/interfaces/BranchEntryItemInterface.ts';
import {
	RequiredElementWaiterOptionInterface,
} from '../../reloadParam/interfaces/requiredElementWaiterOptionInterface.ts';
import {
	handleEventListenerAlways,
	handleEventListenerOnce,
	handleEventListenerTwiceForAlways,
	handlePromiseOnce,
} from '../modules';

// noinspection PointlessBooleanExpressionJS
export const reloadBranchEntryMapper: BranchEntryItemInterface<RequiredElementWaiterOptionInterface>[] = [
	// 重载1
	[
		( value ) =>
			value.openPromise === true
			|| value.openEventListener === false,
		handlePromiseOnce,
	],
	// 重载2
	[
		( value: RequiredElementWaiterOptionInterface ) =>
			value.openEventListener === true
			&& value.alwaysListen === false,
		handleEventListenerOnce,
	],
	// 重载3
	[
		( value: RequiredElementWaiterOptionInterface ) =>
			Boolean( value.openEventListener === true
				&& value.alwaysListen === true
				&& !value.secondJumpSelector ),
		handleEventListenerAlways,
	],
	// 重载4
	[
		( value: RequiredElementWaiterOptionInterface ) =>
			Boolean( value.openEventListener === true
				&& value.alwaysListen === true
				&& value.secondJumpSelector
				&& value.defaultMutationObserverOptions ),
		handleEventListenerTwiceForAlways,
	],
];