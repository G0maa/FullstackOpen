// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
Cypress.Commands.add('resetDB', () => {
  cy.request('POST', 'http://localhost:3003/api/testing/reset')
})

Cypress.Commands.add('registerUser', ({ username, name, password }) => {
  cy.request('POST', 'http://localhost:3003/api/users', {
    username,
    name,
    password,
  })
})

// Mhm... probably because it's the same URL they have the same localStorage
Cypress.Commands.add('loginUser', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3003/api/login', {
    username,
    password,
  }).then(({ body }) => {
    localStorage.setItem('loggedInUser', JSON.stringify(body))
    cy.visit('http://localhost:3000')
  })
})

Cypress.Commands.add('postDummyBlog', () => {
  cy.request({
    method: 'POST',
    url: 'http://localhost:3003/api/blogs',
    body: {
      title: 'dummy cypress title',
      author: 'dummy cypress author',
      url: 'https://www.freecodecamp.org',
    },
    auth: { bearer: JSON.parse(localStorage.getItem('loggedInUser')).token },
  }).then(() => cy.visit('http://localhost:3000'))
})

Cypress.Commands.add('postBlog', ({ title, author, url, likes }) => {
  cy.request({
    method: 'POST',
    url: 'http://localhost:3003/api/blogs',
    body: {
      title,
      author,
      url,
      likes,
    },
    auth: { bearer: JSON.parse(localStorage.getItem('loggedInUser')).token },
  })
})
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
