describe('Blog app', function() {
  beforeEach(function() {
    cy.resetDB()
    cy.registerUser({
      'username': 'admin',
      'name': 'Gomaa',
      'password': 'sekret'
    })

    cy.registerUser({
      'username': 'root',
      'name': 'Noriel',
      'password': 'secure'
    })
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Login to Bloglist App')
    cy.get('form')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('admin')
      cy.get('#password').type('sekret')
      cy.get('#login-button').click()

      cy.contains('Gomaa is logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('admin')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.contains('invalid username or password')
        .should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.loginUser({
        'username': 'admin',
        'password': 'sekret'
      })
    })

    it('A blog can be created', function() {
      cy.contains('show form').click()

      cy.get('#blogTitle').type('cypress title')
      cy.get('#blogAuthor').type('cypress author')
      cy.get('#blogUrl').type('https://docs.cypress.io/')

      cy.get('#create-blog-button').click()

      cy.contains('cypress title cypress author')
      cy.contains('Blog "cypress title" was added successfully')
    })

    describe('After addition of a blog', function() {
      beforeEach(function() {
        cy.postDummyBlog()
      })

      it('A blog can be liked', function() {
        cy
          .contains('dummy cypress title dummy cypress author')
          .contains('Show')
          .click()

        cy.contains('like').click()

        cy.contains('Likes: 1')
      })

      it('A blog can be deleted', function() {
        cy
          .contains('dummy cypress title dummy cypress author')
          .contains('Show')
          .click()

        cy.contains('Delete').click()

        cy.should('not.contain', 'dummy cypress title dummy cypress author')
      })

      it('A blog can only be deleted by its creator', function() {
        cy.contains('Logout').click()
        cy.loginUser({
          username: 'root',
          password: 'secure'
        })

        cy
          .contains('dummy cypress title dummy cypress author')
          .contains('Show')
          .click()

        // This begs a question in mind, what if the user has the button shown (i.e. advanced user?)
        // Should E2E test only visible functions to the normal user or go in-depth?
        // My answer:
        // No, these type of tasks should be tested in other tests (e.g. integration tests in backend),
        // but if you have (for whatever reason) a functionality in the front-end that tests if the request is
        // actually correct or not (i.e. if the user somehow makes a bad request like deleting a blog that isn't his),
        // then you should test it.
        // Also I think testing is OCD people heaven, you have to balance things out, not too deep, not too shallow.
        cy.contains('Delete').should('have.css', 'Display', 'none')
      })
    })

    describe('Making sure blogs are sorted', function() {
      beforeEach(function() {
        cy.postBlog({
          title: 'Most liked',
          author: 'author1',
          url: 'url1',
          likes: 4
        })

        cy.postBlog({
          title: 'nomral liked',
          author: 'author2',
          url: 'url2',
          likes: 2
        })

        cy.postBlog({
          title: 'least liked',
          author: 'author3',
          url: 'url3',
          likes: 1
        })
        cy.visit('http://localhost:3000')
      })

      it('are blogs sorted?', function() {
        cy.get('.blogs').eq(0).should('contain', 'Most liked author1')
        cy.get('.blogs').eq(1).should('contain', 'nomral liked author2')
        cy.get('.blogs').eq(2).should('contain', 'least liked author3')
      })

      it('If we liked a blog, will order change?', function() {
        cy.get('.blogs').eq(2).contains('Show').click()

        cy.get('.blogs').eq(2).get('.like-button').click()
        cy.wait(1000)
        cy.get('.blogs').eq(2).get('.like-button').click()
        cy.wait(1000)
        cy.get('.blogs').eq(1).should('contain', 'Title: least liked')

        cy.get('.blogs').eq(1).get('.like-button').click()
        cy.wait(1000)
        cy.get('.blogs').eq(1).get('.like-button').click()
        cy.wait(1000)
        cy.get('.blogs').eq(0).should('contain', 'Title: least liked')
      })
    })
  })
})
