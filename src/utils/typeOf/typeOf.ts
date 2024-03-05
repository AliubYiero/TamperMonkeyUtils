/**
 * 类型检测
 */
export const typeOf = ( value: any ) => Object.prototype.toString.apply( value ).slice( 8, -1 );
