const obj = {
    x: 1,
    y: {z: 2},
    k: {s: 5}
}

// This is shallow-copy for everything.
// const obj1 = obj

// This is shallow-copy for inside-objects, NOT values.
const obj1 = {...obj, y:{z: 3}}

// This doesn't reflect on obj, because it's deep-copy.
obj1.x = 2
// This doesn't reflect on obj, because it's specified above.
obj1.y.z = 4
// This *reflects* on obj, because it's shallow-copy.
obj.k.s = 10

console.log("obj: ", obj)
console.log("obj1: ",obj1)
// obj:  { x: 1, y: { z: 2 }, k: { s: 10 } }
// obj1: { x: 2, y: { z: 4 }, k: { s: 10 } }