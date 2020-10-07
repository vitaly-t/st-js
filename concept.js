/*
function strong(target, types) {
    return new Proxy(target, {
        set: (obj, prop, value) => {
            if (types[value]) {
                if(typeof value !== )
            }
            obj[prop] = value;
        }
    });
}*/

class Test {
    constructor(value) {
        this.value = value;
    }

    here(val) {
        return this.value + val;
    }

    toJSON() {
        return 123;
    }
}

const obj = new Test(1);

const a = new Proxy(obj, {
    get: (obj, prop) => {
        console.log(prop);
        const val = obj[prop];
        return typeof val === 'function' ? val.bind(obj) : val;
    }
});

console.log(a.here(22));

const types = {
    // for properties:
    here: 'number',
    some: ['number', 'boolean'],
    some: Test,
    bla: [Test, Here],

    // for methods:
    callMe1: 'number',
    callMe2: Test,
    longCall1: ['number', '?string'],
    longCall2: ['number', '?string']
};

