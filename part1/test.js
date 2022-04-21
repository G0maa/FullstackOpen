const t = [1, 2, 3, 4, 5]
const obj = {
    func: (element) => console.log(element)
}

t.forEach(obj.func)