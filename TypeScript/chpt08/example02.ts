/*
    类型窄化(收缩) narrowing
*/

// 真值窄化
function multiplyAll(
    values: number[] | undefined,
    factor: number
): number[] | undefined {
    if (!values) {
        return undefined
    } else {
        return values.map((x) => x * factor)
    }
}

// 相等性窄化
function example(x: string | number, y: string | boolean) {
    if (x === y) {
        // x is string
    } else {
        // x is string | number
        // y is string | boolean
    }
}

// in操作符窄化
type Fish = { swim: () => void };
type Bird = { fly: () => void };

function move(animal: Fish | Bird) {
    if ('swim' in animal) {
        return animal.swim();
    }

    return animal.fly();
}

// instanceof 窄化
function logValue(x: Date | string) {
    if (x instanceof Date) {
        // x is Date
    } else {
        // x is string
    }
}

/*
    类型断言(type assertion & type predicate)
*/
class Fishes {
    swim() { }
}

class Birds {
    fly() { }
}

// 断言以实现窄化
function isFish(pet: Fishes | Birds): pet is Fishes {
    return pet instanceof Fishes
}

function foo(pet: Fishes | Birds) {
    if (isFish(pet)) {
        pet.swim()
    }
}

// never 类型, 抛出错误
interface Circle {
    kind: 'circle';
    radius: number;
}
interface Square {
    kind: 'square';
    sideLength: number;
}

type Shape = Circle | Square;

function getArea(shape: Shape) {
    switch (shape.kind) {
        case "circle":
            return Math.PI * shape.radius ** 2;
        case "square":
            return shape.sideLength ** 2;
        default:
            assertNever(shape);
    }
}

function assertNever(x: never) {
    throw new Error("Unexpected object: " + x)
}