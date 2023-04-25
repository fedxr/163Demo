/*
    类型标注
*/
const a = new Array<string>()
a.push('1')
//a.push(1)  error


const c: { [key: string]: number } = { x: 1 }
c.y = 2
c.z = 3
//o.m = '123' error

let b: unknown = { x: 1 }
b = 'string'
b = 1
// let c:string = b  error


const names = ['apple', 'banana']
names.map(value => {
    // const y : number = value
    // error  类型的上下文推导 contextual mapping
})


// 类型可选
const pt: {
    x: number,
    y: number,
    z?: { o: string }
} = {
    x: 1,
    y: 2
}

const o = pt.z?.o  //z未定义则返回undefined

// 联合类型
function printID(id: number | string) {
    // id不能单独作为number或string使用，只能使用两者共有的属性或方法
    // id.toFixed()  error
    // id.trim()     error
    if (typeof id === 'number') {
        id.toFixed()  //类型窄化后，可用
    }
}

// 类型的别名
type Point = {
    x: number,
    y: number
}
const pt1: Point = {
    x: 100,
    y: 200
}

// 类型断言 Type Assertion
// 用户设计类型 HTMLCanvasElement 优于ts自带类型HTMLElement
// 断言必须ts可以理解
const ele = document.getElementById('canvas') as HTMLCanvasElement
ele.getContext('2d')

// 枚举类型
//  type Dir = 'UP' | 'DOWN'  功能相同
enum Direction {
    UP,
    DOWN
}

function foo(s: Direction) {
    switch(s) {
        case Direction.DOWN:
            break
        case Direction.UP:
    }
}