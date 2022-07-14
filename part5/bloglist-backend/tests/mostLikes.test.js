const { mostLikes } = require('../utils/list_helper')

describe(('Return author with most likes {authorName, likes}: '), () => {
    const listWithOneBlog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0,
        },
    ]

    const listWithTwoBlogs = [
        {
            _id: '5a422a851b54a676234d17f7',
            title: 'React patterns',
            author: 'Michael Chan',
            url: 'https://reactpatterns.com/',
            likes: 7,
            __v: 0,
        },
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0,
        },
    ]

    const listWithThreeBlogs = [
        {
            _id: '5a422a851b54a676234d17f7',
            title: 'React patterns',
            author: 'Michael Chan',
            url: 'https://reactpatterns.com/',
            likes: 7,
            __v: 0,
        },
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0,
        },
        {
            _id: '5a422b3a1b54a676234d17f9',
            title: 'Canonical string reduction',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
            likes: 12,
            __v: 0,
        },
    ]

    test('When zero blogs', () => {
        expect(mostLikes([])).toEqual({
            name: 'N/A',
            likes: 0,
        })
    })

    test('When one blog', () => {
        expect(mostLikes(listWithOneBlog)).toEqual({
            name: 'Edsger W. Dijkstra',
            likes: 5,
        })
    })

    test('When two blogs', () => {
        expect(mostLikes(listWithTwoBlogs)).toEqual({
            name: 'Michael Chan',
            likes: 7,
        })
    })

    test('When three blogs', () => {
        expect(mostLikes(listWithThreeBlogs)).toEqual({
            name: 'Edsger W. Dijkstra',
            likes: 17,
        })
    })
})
