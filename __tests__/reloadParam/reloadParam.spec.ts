import { describe, expect, it } from 'vitest';
import {
	defaultValueMapper,
} from '../../src/modules/reloadParam/configs/defaultValueMapper';
import { reloadMapper } from '../../src/modules/reloadParam/configs/reloadMapper';
import { reloadParam } from '../../src/modules/reloadParam/reloadParam';
import {
	ElementWaiterOptionInterface,
} from '../../src/interfaces/ElementWaiterOptionInterface';

describe( 'reloadParam', () => {
	
	it( 'reload1, 检验重载参数1是否符合条件', () => {
		const inputObj: ElementWaiterOptionInterface = {
			aimSelector: 'selector',
		};
		const resultObj = reloadParam( inputObj, reloadMapper, defaultValueMapper );
		// console.log( resultObj );
		const firstReload = reloadMapper[ 0 ][ 1 ];
		firstReload.forEach( item => {
			expect( resultObj ).toHaveProperty( item );
		} );
	} );
	
	it( 'reload2-1, 检验重载参数2是否符合条件', () => {
		const inputObj: ElementWaiterOptionInterface = {
			aimSelector: 'selector',
			openPromise: false,
		};
		const resultObj = reloadParam( inputObj, reloadMapper, defaultValueMapper );
		// console.log( resultObj );
		const firstReload = reloadMapper[ 1 ][ 1 ];
		firstReload.forEach( item => {
			expect( resultObj ).toHaveProperty( item );
		} );
	} );
	
	it( 'reload2-2, 检验重载参数2是否符合条件', () => {
		const inputObj: ElementWaiterOptionInterface = {
			aimSelector: 'selector',
			openEventListener: true,
		};
		// console.log( reloadParam( inputObj, reloadMapper, defaultValueMapper ) );
		const resultObj = reloadParam( inputObj, reloadMapper, defaultValueMapper );
		
		
		const firstReload = reloadMapper[ 1 ][ 1 ];
		firstReload.forEach( item => {
			expect( resultObj ).toHaveProperty( item );
		} );
	} );
	
	it( 'reload3, 检验重载参数3是否符合条件', () => {
		const inputObj: ElementWaiterOptionInterface = {
			aimSelector: 'selector',
			openEventListener: true,
			alwaysListen: true,
		};
		const resultObj = reloadParam( inputObj, reloadMapper, defaultValueMapper );
		// console.log( resultObj );
		const firstReload = reloadMapper[ 2 ][ 1 ];
		firstReload.forEach( item => {
			expect( resultObj ).toHaveProperty( item );
		} );
	} );
	
	it( 'reload4, 检验重载参数4是否符合条件', () => {
		const inputObj: ElementWaiterOptionInterface = {
			aimSelector: '.selector',
			openEventListener: true,
			alwaysListen: true,
			secondJumpSelector: '.second-selector',
		};
		const resultObj = reloadParam( inputObj, reloadMapper, defaultValueMapper );
		// console.log( resultObj );
		const firstReload = reloadMapper[ 3 ][ 1 ];
		firstReload.forEach( item => {
			expect( resultObj ).toHaveProperty( item );
		} );
	} );
} );