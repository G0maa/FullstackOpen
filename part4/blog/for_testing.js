const map1 = new Map()

map1.set('test', 0)

map1['test'] += 1 // this doesn't work.
map1['test'] = 5 // this works

// Stopped here, trying to solved ex 4.5, 
// stoped at trying to set keys of map to a different value.
console.log(map1['test'])
