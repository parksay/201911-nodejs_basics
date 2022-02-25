//list has items in order.
var members = ['Carry','Cruize', 'Smith', 'Clark'];
console.log(members[1]);
var i = 0;
while(i < members.length){
  console.log('array loop', members[i]);
  i = i + 1;
};

//object has items with a label
var roles = {
    "programmer" : "Carry",
    "designer" : "Cruize",
    "manager" : "Smith",
    "architect" : "Clark"
};
//you can get value using one of below
console.log(roles.designer);
console.log(roles["manager"]);
//what comes first is the name of label
for(var h in roles){
  console.log("object => ", h, "/ value=>", roles[h]);
};




var f3 = function(){
  console.log("hey hi");
  console.log(1+1);
};
var a = [f3];
a[0]();

var o = {
  func : f3
};
o.func();




var v1 = "hh1";
var v2 = "kk2";
var v3 = "......";
//like files, like we found folder
var o1 = {
    v1 : "hh1",
    v2 : "kk2",
    v3 : "....",
};

function f1(){
  console.log(o.v1);
}

function f2(){
  console.log(o.v2);
}

//if variables and functions are determined in different code that is seperated away, it is hard to find.
//And it is easy to happen determining the same variable again. and it becomes an error. so, use like below.

var o2 = {
    v1 : "hh1",
    v2 : "kk2",
    v3 : "....",
    f1 : function(){
            //console.log(o2.v1); if you write a code like this, it will not work when you change the object's name. so, code like below.
            console.log(this.v1);
        },
    f2 : function(){
            console.log(this.v2);
        }
};

o2.f1();
o2.f2();


var template = {
    html : function(title,list,body){
              return `
                  <!doctype html>
                  <html>
                  <head>
                      <title>${title}</title>
                      <meta charset="utf8">
                  </head>
                  <body>
                      <h1><a href="/">WEB</a></h1>
                      ${list}
                      <h2>${title}</h2>
                      ${body}
                  </body>
                  </html>
                  `;
              } ,
    list : function templateList(filelist){
              var list = '<ul>';
              var i = 0;
              while(i < filelist.length){
                  list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
                  i = i + 1;
              }
              list = list + '</ul>';
              return list;
            }
}
