/**
 * 日志输出
 */
export const print = {
	warn( message?: any, ...optionalParams: any[] ): void {
		console.warn( `[Element Waiter] ${ message }`, optionalParams );
	},
	log( message?: any, ...optionalParams: any[] ): void {
		console.log( `[Element Waiter] ${ message }`, optionalParams );
	},
	error( message?: any, ...optionalParams: any[] ): void {
		console.error( `[Element Waiter] ${ message }`, optionalParams );
	},
};