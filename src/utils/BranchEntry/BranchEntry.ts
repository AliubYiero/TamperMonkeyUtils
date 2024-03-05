import { BranchEntryItemInterface } from './interfaces/BranchEntryItemInterface.ts';
import { typeOf } from '../typeOf/typeOf.ts';

/**
 * ElementWaiter 重载分支选择
 * @todo 重写个通用工具类
 */
export class BranchEntry extends Set {
	/**
	 * 用于比较在比较器中的值 / 对象
	 *
	 * 如果定义了 compareValue 的值,
	 * 会在运行时传入 BranchEntryItemInterface 的第一个参数 (比较器) (类型为函数的时候)
	 */
	private compareValue: any;
	
	/**
	 * 默认分支选择器
	 */
	private defaultBranchEntryItem: null | BranchEntryItemInterface<any>[1] = null;
	
	/**
	 * 构造函数
	 *
	 * 重载只能实例化 BranchEntryItemArray 类型的值
	 *
	 * @override
	 * @constructor
	 */
	constructor( BranchEntryItemArray?: BranchEntryItemInterface<any>[], compareValue?: any ) {
		/*
		* 引用父类
		* */
		super( BranchEntryItemArray );
		
		/*
		* 类型检查
		* */
		BranchEntryItemArray?.forEach( branchEntryItem => {
			this.checkBranchEntryItemType( branchEntryItem );
		} );
		
		/*
		* 传入比较值
		* */
		if ( compareValue ) {
			this.compareValue = compareValue;
		}
	}
	
	/**
	 * 设置 比较值
	 */
	setCompareValue( value: any ): this {
		this.compareValue = value;
		return this;
	}
	
	/**
	 * 删除某个值
	 *
	 * 重载只能添加 BranchEntryItemInterface 类型的值
	 *
	 * @override
	 */
	add( value: BranchEntryItemInterface<any> ): this {
		/*
		* 类型检查
		* */
		this.checkBranchEntryItemType( value );
		
		/*
		* 引用父类
		* */
		return super.add( value );
	}
	
	/**
	 * 删除某个值
	 *
	 * 重载只能删除 BranchEntryItemInterface 类型的值
	 *
	 * @override
	 */
	delete( value: BranchEntryItemInterface<any> ): boolean {
		/*
		* 类型检查
		* */
		this.checkBranchEntryItemType( value );
		
		/*
		* 引用父类
		* */
		return super.delete( value );
	}
	
	/**
	 * 设置默认分支
	 */
	default( value: BranchEntryItemInterface<any>[1] ): this {
		/*
		* 类型检查
		* */
		this.checkBranchEntryItemType( [ true, value ] );
		
		/*
		* 设置默认分支选择器
		* */
		this.defaultBranchEntryItem = value;
		
		return this;
	}
	
	/**
	 * 运行分支选择器
	 */
	run(): ( ( value?: any ) => any ) | null {
		for ( let entryArray of this.entries() ) {
			const entry = entryArray[ 0 ] as BranchEntryItemInterface<any>;
			// 数组第一项是布尔值
			if (
				typeOf( entry[ 0 ] ) === 'Boolean'
				&& entry[ 0 ]
			) {
				return entry[ 1 ];
			}
			
			// 数组第一项是函数
			if (
				typeOf( entry[ 0 ] ) === 'Function'
				&& ( <Function> entry[ 0 ] )( this.compareValue )
			) {
				return entry[ 1 ];
			}
		}
		
		// 遍历不到值, 返回默认分支选择器
		return this.defaultBranchEntryItem;
	}
	
	/**
	 * 类型检查,
	 * 检查输入的值是否为 BranchEntryItemInterface 类型
	 */
	private checkBranchEntryItemType( value: any ) {
		/*
		* 错误输入映射
		* */
		const errorInputMapper = [
			// 值必须是数组
			typeOf( value ) !== 'Array',
			// 数组的长度必须是2
			value.length === 2,
			// 数组第一项必须是一个布尔值或者一个函数
			typeOf( value[ 0 ] ) === 'Boolean'
			|| ( typeOf( value[ 0 ] ) === 'Function' ),
			// 数组的第二项必须是一个函数
			typeOf( value[ 1 ] ) === 'Function',
		];
		
		const isError = errorInputMapper.find( item => item );
		if ( !isError ) {
			throw new TypeError(
				'value must be BranchEntryItemInterface Type, ' +
				'like [ boolean | ( () => boolean ), ( () => void ) ]',
			);
		}
		
	}
}

