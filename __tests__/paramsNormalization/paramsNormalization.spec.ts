import { describe, expect, it } from 'vitest';
import {
	paramsNormalization,
} from '../../src/modules/paramsNormalization/paramsNormalization';

describe( 'paramsNormalization', () => {
	it( 'should normalize the parameters (reload 3 & reload 4)', () => {
		const obj = paramsNormalization( 'selector', { timeoutPerSecond: 1 } );
		expect( obj ).toEqual( { aimSelector: 'selector', timeoutPerSecond: 1 } );
	} );
	
	it( 'should normalize the parameters (reload 1 & reload 2)', () => {
		const obj = paramsNormalization( { aimSelector: 'selector' } );
		expect( obj ).toEqual( { aimSelector: 'selector' } );
	} );
	
	it( '错误参数输入, 报错', () => {
		expect( () => paramsNormalization( { aimSelector: 'selector' }, { timeoutPerSecond: 1 } ) ).toThrowError( 'Params Error.' );
	} );
	
	it( 'aimSelector 无输入情况, 报错', () => {
		// @ts-ignore 忽略 paramsNormalization() 函数无参数输入报错
		expect( () => paramsNormalization() ).toThrowError( 'Params Error.' );
	} );
} );