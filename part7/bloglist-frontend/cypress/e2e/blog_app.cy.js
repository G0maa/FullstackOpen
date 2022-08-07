import { Menu } from "semantic-ui-react"

describe('Blog app', function () {
  beforeEach(function () {
    cy.resetDB()
    cy.registerUser({
      username: 'admin',
      name: 'Gomaa',
      password: 'sekret',
    })

    cy.registerUser({
      username: 'root',
      name: 'Noriel',
      password: 'secure',
    })
    cy.visit('http://localhost:3000/login')
  })

  it('Login form is shown', function () {
    cy.contains('Login to Bloglist App')
    cy.get('form')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('admin')
      cy.get('#password').type('sekret')
      cy.get('#login-button').click()

      cy.contains('Welcome "Gomaa"!')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('admin')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy
        .get('#notification-message')
        .contains('invalid username or password')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.loginUser({
        username: 'admin',
        password: 'sekret',
      })
    })

    it('A blog can be created', function () {
      cy.contains('Submit Blog').click()

      cy.get('#blogTitle').type('cypress title')
      cy.get('#blogAuthor').type('cypress author')
      cy.get('#blogUrl').type('https://docs.cypress.io/')

      cy.get('#create-blog-button').click()

      cy
        .get('#blogList-Menu')
        .contains('cypress title')

      cy
      .get('#notification-message')
      .contains('Blog "cypress title" was added successfully')
    })

    describe('After addition of a blog', function () {
      beforeEach(function () {
        cy.postDummyBlog()
      })

      it('A blog can be liked', function () {
        cy.contains('dummy cypress title')
          .click()

        cy
          .get('#like-btn')
          .contains('Like')
          .click()

        cy
          .get('#likes-count-label')
          .should('have.class', 'ui label')
          .contains('1')
      })

      it('A blog can be deleted', function () {
        cy.contains('dummy cypress title')
          .click()

        cy.contains('Delete').click()
        
        cy.get('#blogList-Menu').should('not.contain', 'dummy cypress title')
      })

      it('A blog can only be deleted by its creator', function () {
        cy.contains('Logout').click()
        cy.loginUser({
          username: 'root',
          password: 'secure',
        })

        cy.contains('dummy cypress title')
          .click()

        // This begs a question in mind, what if the user has the button shown (i.e. advanced user?)
        // Should E2E test only visible functions to the normal user or go in-depth?
        // My answer:
        // No, these type of tasks should be tested in other tests (e.g. integration tests in backend),
        // but if you have (for whatever reason) a functionality in the front-end that tests if the request is
        // actually correct or not (i.e. if the user somehow makes a bad request like deleting a blog that isn't his),
        // then you should test it.
        // Also I think testing is OCD people heaven, you have to balance things out, not too deep, not too shallow.
        cy.get('#delete-btn').should('have.css', 'Display', 'none')
      })
    })

    describe('Making sure blogs are sorted', function () {
      beforeEach(function () {
        cy.postBlog({
          title: 'Most liked',
          author: 'author1',
          url: 'url1',
          likes: 4,
        })

        cy.postBlog({
          title: 'nomral liked',
          author: 'author2',
          url: 'url2',
          likes: 2,
        })

        cy.postBlog({
          title: 'least liked',
          author: 'author3',
          url: 'url3',
          likes: 1,
        })
        cy.visit('http://localhost:3000')
      })

      it('are blogs sorted?', function () {
        cy.get('.link.item').eq(0).should('contain', 'Most liked')
        cy.get('.link.item').eq(1).should('contain', 'nomral liked')
        cy.get('.link.item').eq(2).should('contain', 'least liked')
      })

      it.only('If we liked a blog, will order change?', function () {
        cy
        .contains('least liked')
        .click()

        cy
          .contains('Like')
          .click()

        cy.wait(1000)

        cy
        .contains('Like')
        .click()

        cy.visit('http://localhost:3000')

        cy.get('.link.item').eq(1).should('contain', 'least liked')

        cy
        .contains('least liked')
        .click()

        cy
          .contains('Like')
          .click()

        cy.wait(1000)

        cy
        .contains('Like')
        .click()

        cy.visit('http://localhost:3000')

        cy.get('.link.item').eq(0).should('contain', 'least liked')
      })
    })
  })
})
