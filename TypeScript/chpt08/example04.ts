/* 
    函数
*/

// 构造函数
type SomeConstructor = {
    new(s: string): String
}
function fn(ctor: SomeConstructor) {
    return new ctor('hello')
}

const str = fn(String)
console.log(str);

// 泛型函数
function firstElement<Type>(arr: Type[]): Type {
    return arr[0]
}

// 可选参数
function myForEach(arr: any[], callback: (arg: any, index?: number) => void) {
    for (let i = 0; i < arr.length; i++) {
        callback(arr[i], i);
    }
}

// 函数重载
function isSet<T>(x: any): x is Set<T> {
    return x instanceof Set
}

function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add<T>(a: Set<T>, b: Set<T>): Set<T>;

function add<T>(a: T, b: T): T {
    if (isSet<T>(a) && isSet<T>(b)) {
        return new Set([...a, ...b]) as any
    }
    return (a as any) + (b as any)
}

const a = new Set<string>(['apple', 'redhat'])
const b = new Set<string>(['google', 'ms'])
console.log(add(a, b));
console.log(add(1, 2));
console.log(add('a', 'b'));


// void
type voidFunc = ()=> void;
const fn1:voidFunc = () => {
    return true;
}
const x = fn1()
console.log(x); //true


//unknown
// 不明类型的情况下返回unknown，下一步引用需人工赋值
function safeParse(s:string):unknown{
    return JSON.parse(s)
}