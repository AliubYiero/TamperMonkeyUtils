import { ElementWaiterOptionInterface } from '../../../interfaces/ElementWaiterOptionInterface.ts';

export type RequiredElementWaiterOptionInterface = Required<ElementWaiterOptionInterface> & {
	defaultMutationObserverOptions: {
		subtree: true,
		childList: true,
	}
};