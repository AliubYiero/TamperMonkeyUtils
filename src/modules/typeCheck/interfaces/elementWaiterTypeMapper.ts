import {
	RequiredElementWaiterOptionInterface,
} from '../../reloadParam/interfaces/requiredElementWaiterOptionInterface.ts';

export type ElementWaiterTypeMapper = [ keyof RequiredElementWaiterOptionInterface, string | ( ( typeString: string ) => boolean ) ][];