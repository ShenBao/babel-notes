'use strict';

/**
 * 简单封装了一个类
 */
 class Greeting {

   constructor(name) {
     this.name = name || 'Guest';
   }

   hello() {

     let str = 'hello';

     alert(`${this.name} say ${str} to you`);
   }

 }

let Guest = new Greeting();

Guest.hello();
