import { describe, expect, it } from 'vitest';
import { BranchEntry } from '../../src/utils/BranchEntry/BranchEntry';

describe( 'Branch Entry', () => {
	it( '实例化一个空白 BranchEntry 类', () => {
		expect( new BranchEntry().size ).toBe( 0 );
		expect( new BranchEntry( [] ).size ).toBe( 0 );
	} );
	
	it( '实例化一个正确的包含 BranchEntryItem 的类', () => {
		expect( () => {
			const branchEntry = new BranchEntry( [
				[ true, () => {
					console.log( 'branch 1' );
				} ],
			] );
			
			return branchEntry.size;
		} ).not.toThrowError();
	} );
	
	it( '实例化一个错误的不包含 BranchEntryItem 的类', () => {
		expect( () => {
			const branchEntry = new BranchEntry( [
				// @ts-ignore 忽略错误输入
				[ 1 ],
			] );
			
			return branchEntry.size;
		} ).toThrowError( /^.*/ );
	} );
	
	it( '运行一次分支选择器', () => {
		const obj = {
			a: 1,
			b: 2,
		};
		const branchEntry = new BranchEntry();
		const result = branchEntry
			.setCompareValue( obj )
			.add( [
				( value ) => {
					return value.a === 2;
				},
				() => 1,
			] )
			.add( [
				( value ) => {
					return value.b === 2;
				},
				() => 2,
			] )
			.run() as () => {};
		expect( result() ).toBe( 2 );
	} );
} );