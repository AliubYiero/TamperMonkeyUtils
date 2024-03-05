/**
 * 类型检查
 */
export const typeCheck = (
	awaitCheckObject: { [ prop: string ]: any },
	mapper: [ string, string | ( ( typeString: string ) => boolean ) ][],
) => {
	const typeOf = ( value: any ) => Object.prototype.toString.bind( value )().slice( 8, -1 );
	
	/*
	* 遍历映射表, 判断类型是否错误
	* */
	for ( let awaitCheckObjectKey in awaitCheckObject ) {
		const awaitCheckObjectValue = awaitCheckObject[ awaitCheckObjectKey ];
		
		// 找到当前的选择项
		const currentCheckItem = mapper.find( item => item[ 0 ] === awaitCheckObjectKey );
		
		// 如果没有, 则继续遍历
		if ( !currentCheckItem ) {
			continue;
		}
		
		// 如果存在, 则进行类型判断
		const typeOrTypeMapper = currentCheckItem[ 1 ];
		
		// 进行类型判断
		if ( typeOf( typeOrTypeMapper ) === 'String'
			&& typeOf( awaitCheckObjectValue ) !== typeOrTypeMapper
		) {
			throw new TypeError( `Property ${ awaitCheckObjectKey } must be ${ typeOrTypeMapper }...` );
		}
		if ( typeOf( typeOrTypeMapper ) === 'Function'
			&& !( ( <( ( typeString: string ) => boolean )> typeOrTypeMapper )( typeOf( awaitCheckObjectValue ) ) )
		) {
			throw new TypeError( `Property ${ awaitCheckObjectKey } got type error...` );
		}
	}
};