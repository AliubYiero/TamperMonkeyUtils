import {
	RequiredElementWaiterOptionInterface,
} from './requiredElementWaiterOptionInterface.ts';

export type ReloadMapperInterface = [
	( ( value: Partial<RequiredElementWaiterOptionInterface> ) => boolean ),
	( keyof RequiredElementWaiterOptionInterface )[]
];