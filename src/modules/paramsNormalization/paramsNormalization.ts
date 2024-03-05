/**
 * 参数归一
 *
 * 统一组合成一个对象
 */
export const paramsNormalization = ( value1: any, value2?: any ): {
	[ p: string ]: any
} => {
	let options;
	/*
	* 重载3 & 重载4 - value1是字符串的情况
	* value1是字符串, value2是配置对象的情况
	* */
	if (
		( value2 && typeof value1 === 'string' )
		|| ( !value2 && typeof value1 === 'string' )
	) {
		value2 ||= {};
		options = {
			...value2,
			aimSelector: value1,
		};
	}
	
	/*
	* 重载1 & 重载2 - value1是配置对象的情况
	* */
	if ( !value2 && typeof value1 === 'object' ) {
		options = value1;
	}
	
	/*
	* 错误输入情况, 报错
	* */
	if ( !options ) {
		throw new ReferenceError( 'Params Error.' );
	}
	
	return options;
};