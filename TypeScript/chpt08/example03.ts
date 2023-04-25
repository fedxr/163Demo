/*
    泛型 generics
*/

// 接口
interface Runnable {
    run(): number
}
interface Repairabel {
    repaire(): void
}

class Car implements Runnable, Repairabel {
    run(): number {
        return 1;
    }
    repaire(): void {
        return;
    }
}

// 继承


// 泛型是对共性的提取
class Wood implements Material {
    getHardness(): number {
        return 2.11;
    }
}

interface Material {
    getHardness(): number; //硬度
}

class DeskMaker<T extends Material> {
    material: T
    make() {
        const hardness = this.material.getHardness()
    }
}

const maker = new DeskMaker<Wood>()

// 返回自身类型
function identity<T>(arg: T): T {
    return arg
}
let n = identity(123)
let s = identity('string')


// keyof操作符
type Point = { x: number; y: number };
type P = keyof Point; //P = x | y