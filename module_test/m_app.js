// var M = {
//       v: "value of M",
//       f: function(){
//           console.log("function of M\nthe value is: ");
//           console.log(this.v);
//       }
// };

//you don't need to define M in here. you can define M outside, and import it

var p = require('./parts/m_parts.js'); //the path of file, module
console.log(p); //you can see what the module becomes when you import it

p.f();
