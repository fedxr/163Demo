/* 
    class
*/
class aPoint {
    x: number
    y: number
    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }

    public add(p: aPoint): aPoint {
        return new aPoint(p.x + this.x, p.y + this.y)
    }
}

const p = new aPoint(0, 1)
const newP = p.add(new aPoint(3, 2))
console.log(newP); //aPoint{x:1,y:}

// 索引器
class Arr<T> {
    [i: number]: T
}
const arr = new Arr<number>()
arr[10] = 100
console.log(arr[10]); //100


// 类的继承
class Animal {
    move() {
        console.log('moving!!');
    }
}

class Dog extends Animal {
    woof(times:number){
        for (let i = 0; i < times; i++) {
            console.log('woof');
        }       
    }
}
const d = new Dog()
d.woof(3)


// 类的成员可见域
// public
// private
// protected
class bPoint {
    // x: number          //x可以被任意程序访问
    private y: number  
    constructor(n:number) {
        this.y = n     //成立
    }
    getY() {
        return this.y
    }
}
const bp = new bPoint(3)
// console.log(bp.y);        //Error;属性“y”为私有属性，只能在类“bPoint”中访问
console.log(bp.getY());     //成立; 3

class aAnimal {
    private _name1;
    protected _name2;
}
class wolf extends aAnimal {
    getName1() {
        // return this._name1   //Error;属性“_name1”为私有属性，只能在类“aAnimal”中访问
    }
    getName2() {
        return this._name2   //成立;protected属性，继承类可访问
    }
}
