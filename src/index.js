// see: https://stackoverflow.com/questions/29093396/how-do-you-check-the-difference-between-an-ecmascript-6-class-and-function
function isNativeClass(thing) {
    return typeof thing === 'function'
        && /^class\s/.test(Function.prototype.toString.call(thing));
}

class StronglyTyped {

    static get enabled() {

    }

    static set enabled(value) {
        // must be able to reactivate without restarting the process
    }

    static create(target, types) {
        if (typeof target === 'function') {
            // TODO: Will check to avoid repeated registrations???
            if (isNativeClass()) {
                console.log('es6 class;', c.name);
                return this.registerEs6Class(target, types);
            }
            console.log('es5 class');
            return this.registerEs5Class(target, types);
        }
        if (typeof target !== 'object') {
            console.log('object');
            throw new Error('Must be a class or an object.');
        }
        return StronglyTyped.registerObj(target, types);
    }

    static registerEs5Class(target, types) {
        return function () {
            console.log('es5 constructor handled');
            // we would validate the constructor arguments here;
            return new Proxy(new target(...arguments), {
                get: (obj, prop) => {
                    console.log('es5 value handled');
                    return typeof obj[prop] === 'function' ? obj[prop].bind(obj) : obj[prop];
                }
            });
        }
    }

    static registerEs6Class(target, types) {
        return class extends target {
            constructor(...args) {
                console.log('es6 constructor handled');
                super(...args);
            }
        }
    }

    static registerObj(target, types) {
        return new Proxy(target, {});
    }

    validateTypes() {

    }
}

class Test {
    constructor(value) {
        this.value = value;
        console.log('here');
    }

    getValue() {
        return this.value;
    }
}

const obj = {
    getValue() {
        return 123;
    }
};

function Main(value) {
    this.value = value;
    this.getValue = function () {
        return this.value;
    }

}

const T = StronglyTyped.create(Main);

// const Bla = a.register(Test);

console.log('Test:', new T(777).getValue());

module.exports = {StronglyTyped};
