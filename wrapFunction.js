var foo = function () {
    var rnd = Math.random();
    if (rnd < .5) {
        return "something";
    } else {
        throw "else";
    }
    
};

function mod(fn) {
    return function () {
        try {
            return fn();
        } catch (error) {
            fn = function () { return null; };
            return null;
        }
    }
}

var myFoo = mod(foo);
console.log(myFoo());
console.log(myFoo());
console.log(myFoo());
console.log(myFoo());
console.log(myFoo());
console.log(myFoo());
console.log(myFoo());
console.log(myFoo());
console.log(myFoo());