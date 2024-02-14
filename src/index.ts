/**
 * 油猴菜单按钮配置接口
 *
 * @interface GMMenuConfigInterface
 *
 * @return {GMMenuConfigInterface}
 * @return title 按钮显示名称
 * @return onClick 按钮点击后的回调函数
 * @return [isShow = true] 是否显示当前按钮
 * @return [accessKey] 按钮快捷键
 */
interface GMMenuConfigInterface {
	/**
	 * 配置项名称
	 */
	title: string;
	
	/**
	 * 配置项点击后的回调函数
	 */
	onClick: ( event: ( MouseEvent | KeyboardEvent ) ) => void;
	
	/**
	 * 是否展示当前的配置项
	 * @default true
	 */
	isShow?: boolean;
	
	/**
	 * 快捷键
	 * @default ''
	 */
	accessKey?: string;
}

/**
 * 油猴菜单总配置项接口
 */
interface GMMenuControllerOptionInterface {
	/**
	 * 是否展示编号
	 * @default false
	 */
	showIndex?: boolean;
	
	/**
	 * 展示的编号是否包括隐藏项 (需先开启 showIndex )
	 * @default true
	 */
	containHideIndex?: boolean;
}


/**
 * 检验当前脚本中是否存在 GM菜单 函数
 * @class
 */
class GMMenuChecker {
	private menuId: number = 0;
	
	constructor() {
		/* 检验是否存在 GM_registerMenuCommand() 函数 */
		this.existGMRegisterMenuCommand();
		/* 检验是否存在 GM_unRegisterMenuCommand() 函数 */
		this.existGMUnRegisterMenuCommand();
	}
	
	/**
	 * 检验是否存在 GM_registerMenuCommand() 函数
	 */
	private existGMRegisterMenuCommand() {
		try {
			this.menuId = GM_registerMenuCommand( 'test', () => {
			} );
		} catch ( e ) {
			throw new ReferenceError(
				'GM_registerMenuCommand() function does not grant in Script...\n'
				+ 'Uncaught ReferenceError: GM_registerMenuCommand() 函数未在脚本中声明...',
			);
		}
	}
	
	/**
	 * 检验是否存在 GM_unRegisterMenuCommand() 函数
	 */
	private existGMUnRegisterMenuCommand() {
		try {
			GM_unregisterMenuCommand( this.menuId );
		} catch ( e ) {
			throw new ReferenceError(
				'GM_unregisterMenuCommand() function does not grant in Script...\n'
				+ 'Uncaught ReferenceError: GM_unregisterMenuCommand() 函数未在脚本中声明...',
			);
		}
	}
}

/**
 * 油猴菜单控制器
 * @class
 */
class GMMenuController extends GMMenuChecker {
	/**
	 * 唯一实例
	 * @instance
	 */
	private static instance: GMMenuController = new GMMenuController();
	
	/**
	 * 油猴菜单总配置项
	 */
	private options: GMMenuControllerOptionInterface = {
		showIndex: false,
		containHideIndex: true,
	};
	
	/**
	 * 配置项数组
	 *
	 * @param {GMMenuConfigInterface[]}
	 * @param GMMenuConfigInterface 油猴菜单按钮配置
	 * @param GMMenuConfigInterface.title 按钮显示名称
	 * @param GMMenuConfigInterface.onClick 按钮点击后的回调函数
	 * @param [GMMenuConfigInterface.isShow = true] 是否显示当前按钮
	 * @param [GMMenuConfigInterface.accessKey] 按钮快捷键
	 */
	private menuList: GMMenuConfigInterface[] = new Proxy( [], {
		set: ( target: GMMenuConfigInterface[], p: string | symbol, newValue: GMMenuConfigInterface ): boolean => {
			/**
			 * 忽略数组更新数组长度
			 * 更新 .length 属性
			 */
			if ( p === 'length' ) {
				Reflect.set( target, p, newValue );
				return true;
			}
			
			/**
			 * 类型检查: 参数必须是 GMMenuConfigInterface 类型
			 */
			if ( !(
				( typeof newValue === 'object' )
				&& ( 'title' in newValue )
				&& ( 'onClick' in newValue ) )
			) {
				throw new TypeError( 'property title and onClick must exist.' );
			}
			
			/**
			 * 参数归一
			 */
			/* isShow 属性默认为 true, 使用与运算符 ( || ) 会一定是 true */
			if ( !( 'isShow' in newValue ) ) {
				newValue.isShow = true;
			}
			
			/* accessKey 属性默认为 '' */
			newValue.accessKey ||= '';
			
			/**
			 * 更新数组
			 */
			Reflect.set( target, p, new Proxy( newValue, {
				set: ( target: GMMenuConfigInterface,
					   p: keyof GMMenuConfigInterface,
					   newValue: NonNullable<GMMenuConfigInterface[keyof GMMenuConfigInterface]> ): boolean => {
					
					/**
					 * 类型检查
					 * */
					function typeCheck() {
						/*
						* 属性键值对应数组
						* */
						const typeList: [ string, string ][] = [
							[ 'isShow', 'boolean' ],
							[ 'title', 'string' ],
							[ 'onClick', 'function' ],
							[ 'accessKey', 'string' ],
						];
						
						/* 检查属性, 判断值是否为对应类型 */
						typeList.forEach( item => {
							const [ key, value ] = item;
							if ( p === key && typeof newValue !== value ) {
								throw new TypeError( `property ${ key } must be a ${ value }.` );
							}
						} );
						
						/* 检查属性key是否为允许的key */
						const typeKeyList = typeList.map( item => item[ 0 ] );
						if ( !typeKeyList.includes( p ) ) {
							throw new TypeError( `property must be a string contain '${ typeKeyList.join( '\', \'' ) }'.` );
						}
					}
					
					/* 类型检查 */
					typeCheck();
					
					/**
					 * 更新配置项
					 */
					Reflect.set( target, p, newValue );
					
					/**
					 * 刷新油猴菜单
					 */
					this.fresh();
					
					return true;
				},
			} ) );
			
			
			/**
			 * 刷新油猴菜单
			 */
			this.fresh();
			return true;
		},
	} );
	/**
	 * 已经载入的油猴菜单按钮 id 列表
	 */
	private loadedMenuIdList: number[] = [];
	
	/**
	 * 私有构造器
	 */
	private constructor() {
		/** 检查当前脚本是否授权 GM 函数 */
		super();
	}
	
	/**
	 * 获取唯一实例
	 */
	static getInstance() {
		return this.instance;
	}
	
	/**
	 * 改变菜单配置
	 *
	 * @param options 菜单配置
	 * @param {boolean} [options.showIndex = false] 是否在 title 前显示菜单配置项索引 (索引编号从 1 开始计数)
	 * @param {boolean} [options.containHideIndex = true] 是否将隐藏的配置项计入计数 (需开启 options.showIndex)
	 *
	 * @example changeOption({showIndex: true}) 开启菜单索引编号
	 * @example changeOption({showIndex: true, containHideIndex: false}) 开启菜单索引编号, 并关闭隐藏项统计
	 */
	changeOption( options: GMMenuControllerOptionInterface ) {
		// 遍历新配置项, 改变配置
		for ( let optionsKey in options ) {
			const key = optionsKey as keyof GMMenuControllerOptionInterface;
			this.options[ key ] = options[ key ];
		}
		
		// 刷新配置项
		this.fresh();
	}
	
	/**
	 * 获取代理数组
	 *
	 * 您应该使用 const 接收 getProxy() 方法返回的数组, 防止意外的修改导致代理失效
	 *
	 * @example const menuList = GMMenuController.getInstance().getProxy();
	 */
	getProxy() {
		return this.menuList;
	}
	
	/**
	 * 载入 / 刷新油猴配置菜单
	 */
	private fresh() {
		/**
		 * 清除已经载入的油猴菜单
		 */
		this.loadedMenuIdList.forEach( ( menuId ) => {
			GM_unregisterMenuCommand( menuId );
		} );
		this.loadedMenuIdList = [];
		
		/**
		 * 载入新的油猴菜单
		 */
		this.menuList.forEach( ( item, index ) => {
			/*
			* 参数解构 (防止参数重新赋值时无限的Proxy代理)
			* */
			let { title, onClick, isShow, accessKey } = item;
			
			// 配置按钮隐藏, 不注册按钮
			if ( !isShow ) {
				return;
			}
			
			/*
			* 载入配置
			* */
			// showIndex 配置, 显示菜单索引 (索引包括隐藏项)
			if ( this.options.showIndex && this.options.containHideIndex ) {
				title = `[${ index + 1 }] ${ title }`;
			}
			
			// showIndex 配置, 显示菜单索引 (索引不包括隐藏项)
			if ( this.options.showIndex && !this.options.containHideIndex ) {
				title = `[${ this.loadedMenuIdList.length + 1 }] ${ title }`;
			}
			
			/*
			* 注册按钮
			* */
			const menuId = GM_registerMenuCommand( title, onClick, accessKey );
			// 添加菜单id到已载入数据中
			this.loadedMenuIdList.push( menuId );
		} );
		
	}
}

export { GMMenuController };