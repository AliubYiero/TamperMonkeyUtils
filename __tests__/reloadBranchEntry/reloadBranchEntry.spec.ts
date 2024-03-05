import {
	BranchEntryItemInterface,
} from '../../src/utils/BranchEntry/interfaces/BranchEntryItemInterface';
import {
	RequiredElementWaiterOptionInterface,
} from '../../src/modules/reloadParam/interfaces/requiredElementWaiterOptionInterface';
import { describe, expect, it } from 'vitest';
import { BranchEntry } from '../../src/utils/BranchEntry/BranchEntry';
import { reloadBranchEntryMapper } from './configs/reloadBranchEntryMapper';

describe( 'Reload Branch Entry', () => {
	it( 'branch1-1', () => {
		const options: Partial<RequiredElementWaiterOptionInterface> = {
			aimSelector: '.selector',
			// @ts-ignore 忽略警告缺失 document 环境
			fatherDom: document.body,
			openPromise: true,
			timeoutPerSecond: 20,
			delayPerSecond: 0.3,
			mutationObserverOptions: { subtree: true, childList: true },
		};
		const result = new BranchEntry( reloadBranchEntryMapper, options ).run() as BranchEntryItemInterface[1];
		expect( result() ).toBe( 'branch1' );
	} );
	
	it( 'branch1-2', () => {
		const options: Partial<RequiredElementWaiterOptionInterface> = {
			aimSelector: '.selector',
			// @ts-ignore 忽略警告缺失 document 环境
			fatherDom: document.body,
			openEventListener: false,
			eventListenerName: 'elementUpdate',
			alwaysListen: false,
			delayPerSecond: 0.3,
			mutationObserverOptions: { subtree: true, childList: true },
		};
		const result = new BranchEntry( reloadBranchEntryMapper, options ).run() as BranchEntryItemInterface[1];
		expect( result() ).toBe( 'branch1' );
	} );
	
	it( 'branch2', () => {
		const options: Partial<RequiredElementWaiterOptionInterface> = {
			aimSelector: '.selector',
			// @ts-ignore 忽略警告缺失 document 环境
			fatherDom: document.body,
			openEventListener: true,
			eventListenerName: 'elementUpdate',
			alwaysListen: false,
			delayPerSecond: 0.3,
			mutationObserverOptions: { subtree: true, childList: true },
		};
		const result = new BranchEntry( reloadBranchEntryMapper, options ).run() as BranchEntryItemInterface[1];
		expect( result() ).toBe( 'branch2' );
	} );
	
	it( 'branch3', () => {
		const options: Partial<RequiredElementWaiterOptionInterface> = {
			aimSelector: '.selector',
			// @ts-ignore 忽略警告缺失 document 环境
			fatherDom: document.body,
			openEventListener: true,
			eventListenerName: 'elementUpdate',
			alwaysListen: true,
			delayPerSecond: 0.3,
			mutationObserverOptions: { subtree: true, childList: true },
		};
		const result = new BranchEntry( reloadBranchEntryMapper, options ).run() as BranchEntryItemInterface[1];
		expect( result() ).toBe( 'branch3' );
	} );
	
	it( 'branch4', () => {
		const options: Partial<RequiredElementWaiterOptionInterface> = {
			aimSelector: '.selector',
			// @ts-ignore 忽略警告缺失 document 环境
			fatherDom: document.body,
			secondJumpSelector: '.second-selector',
			openEventListener: true,
			eventListenerName: 'elementUpdate',
			alwaysListen: true,
			delayPerSecond: 0.3,
			mutationObserverOptions: { subtree: true, childList: true },
			defaultMutationObserverOptions: { subtree: true, childList: true },
		};
		const result = new BranchEntry( reloadBranchEntryMapper, options ).run() as BranchEntryItemInterface[1];
		expect( result() ).toBe( 'branch4' );
	} );
} );