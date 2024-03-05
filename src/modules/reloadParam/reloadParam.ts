import {
	RequiredElementWaiterOptionInterface,
} from './interfaces/requiredElementWaiterOptionInterface.ts';
import { ReloadMapperInterface } from './interfaces/reloadMapperInterface.ts';

function getParamKeys( branch: ReloadMapperInterface ) {
	return branch[ 1 ];
}

/**
 * 参数重载
 */
export const reloadParam = (
	inputObject: Partial<RequiredElementWaiterOptionInterface>,
	reloadMapper: ReloadMapperInterface[],
	defaultValueMapper: RequiredElementWaiterOptionInterface,
) => {
	let options: { [ p: string ]: any } = {};
	
	// 获取映射分支
	let branch = reloadMapper.find(
		( [ mapper ] ) => mapper( inputObject ),
	);
	
	// 默认映射 (第一个分支)
	branch ||= reloadMapper[ 0 ];
	
	/*
	* 获取到的分支, 进行默认值赋予
	* */
	let paramKeys = getParamKeys( branch );
	
	Object.assign( options, ...paramKeys.map( key => ( {
		[ key ]: inputObject[ key ] || defaultValueMapper[ key ],
	} ) ) );
	
	return options as RequiredElementWaiterOptionInterface;
};