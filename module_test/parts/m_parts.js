var M = {
      v: "value of M",
      f: function(){
          console.log("function of M\nthe value is: ");
          console.log(this.v);
      }
};


module.exports = M;
