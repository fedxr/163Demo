/* 
    模块
*/

// @filename:hello.ts
export default function hellow(){
    console.log('hw');
}

// default 暴漏名不需要 {} 引用
// import hello from '.hello.ts'



// @filename:maths.ts
export var pi = 3.14
export let squareTwo = 1.41
export const phi = 1.61
export class Random {}

// 无 defalut 需用{}以此引用
// import {pi, squareTwo, phi} from '.math.ts'
// import {squareTwo as st} from 'math.ts'   //as别名


// type export ,ts独有
// @filename:animal.ts
export type Cat = {breed:string; yearOfBirth:number}
export interface Dog {}

// import {Cat} from '.animal.ts'
// import type {Cat} from '.animal.ts'