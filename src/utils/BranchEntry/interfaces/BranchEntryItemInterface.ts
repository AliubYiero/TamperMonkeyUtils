/**
 * 分支实体类型
 *
 * [选择判断器, 回调函数]
 */
export type BranchEntryItemInterface<T> = [
	( boolean | ( ( value: T ) => boolean ) ),
	( ( value?: any ) => any )
];