/**
 * 定时器控制类
 */
export class TimeoutController {
	private timer: number | undefined;
	private readonly callback: () => void;
	private readonly ms: number = 0;
	
	constructor( callback: () => void, ms?: number ) {
		this.callback = callback;
		
		if ( ms ) {
			this.ms = ms;
		}
	}
	
	/**
	 * 开始计时器
	 */
	begin() {
		this.timer = window.setTimeout( this.callback, this.ms );
	}
	
	/**
	 * 停止计时器
	 */
	stop() {
		clearTimeout( this.timer );
	}
}