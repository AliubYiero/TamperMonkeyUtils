import {
	BranchEntryItemInterface,
} from '../../../src/utils/BranchEntry/interfaces/BranchEntryItemInterface';
import {
	RequiredElementWaiterOptionInterface,
} from '../../../src/modules/reloadParam/interfaces/requiredElementWaiterOptionInterface';

export const reloadBranchEntryMapper: BranchEntryItemInterface<RequiredElementWaiterOptionInterface>[] = [
	// 重载1
	[
		( value ) =>
			value.openPromise === true
			|| value.openEventListener === false,
		() => 'branch1',
	],
	// 重载2
	[
		( value ) =>
			value.openEventListener === true
			&& value.alwaysListen === false,
		() => 'branch2',
	],
	// 重载3
	[
		( value ) =>
			Boolean( value.openEventListener === true
				&& value.alwaysListen === true
				&& !value.secondJumpSelector ),
		() => 'branch3',
	],
	// 重载4
	[
		( value ) =>
			Boolean( value.openEventListener === true
				&& value.alwaysListen === true
				&& value.secondJumpSelector
				&& value.defaultMutationObserverOptions ),
		() => 'branch4',
	],
];