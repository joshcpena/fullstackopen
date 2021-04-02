/* eslint-disable prefer-arrow-callback */
describe('Blog app', function blogApp() {
  beforeEach(function beforeEach() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    const user = {
      name: 'Matti Luukkainen',
      username: 'root',
      password: 'salainen',
    };
    cy.request('POST', 'http://localhost:3001/api/users/', user);
    cy.visit('http://localhost:3000');
  });

  it('front page can be opened', function frontPageCanBeOpned() {
    cy.contains('login');
  });

  it('login form is visible', function loginFormCanBeOpened() {
    cy.contains('login');
    cy.contains('username');
    cy.contains('password');
  });

  describe('Login', function login() {
    it('fails with wrong credentials', function failLogin() {
      cy.contains('log in').click();
      cy.get('#username').type('root');
      cy.get('#password').type('sAlAinen');
      cy.get('#login-button').click();
      cy.get('.error')
        .contains('Wrong username or password')
        .should('have.css', 'border-style', 'solid')
        .should('have.css', 'color', 'rgb(255, 0, 0)');
      cy.get('html').should('not.contain', 'Matti Luukkainen logged in');
    });

    it('success with correct credentials', function userCanLogin() {
      cy.contains('log in').click();
      cy.get('#username').type('root');
      cy.get('#password').type('salainen');
      cy.get('#login-button').click();
      cy.contains('Matti Luukkainen (root) logged in');
    });
  });

  describe('when logged in', function whenLoggedIn() {
    beforeEach(function logIn() {
      cy.login({ username: 'root', password: 'salainen' });
    });

    it('a blog can be created', function createABlog() {
      cy.contains('new blog').click();
      cy.get('#title').type('another blog cypress');
      cy.get('#author').type('Navalny');
      cy.get('#url').type('russia.com');
      cy.contains('save').click();
      cy.get('#view-button').click();
      cy.contains('another blog cypress');
      cy.contains('Navalny');
      cy.contains('likes 0');
      cy.contains('russia.com');
      cy.contains('root');
    });
    describe('and a blog exists', function andBlogExists() {
      beforeEach(function beforeEach() {
        cy.createBlog({ title: 'another blog cypress', author: 'Navalny', url: 'russia.com' });
      });

      it('blog exists', function blogexists() {
        cy.contains('another blog cypress');
        cy.contains('Navalny');
      });

      it('blog details can be viewed', function viewBlogDetails() {
        cy.get('#view-button').click();
        cy.contains('russia.com');
        cy.contains('likes 0');
        cy.contains('root');
      });

      it('blog can be liked', function likeBlog() {
        cy.get('#view-button').click();
        cy.get('#like-button').click();
        cy.contains('likes 1');
      });

      it('blog can be deleted', function deleteBlog() {
        cy.createBlog({ title: 'blog_1', author: 'Navalny', url: 'russia.com' });
        cy.createBlog({ title: 'blog_2', author: 'Valdimir', url: 'vald.com' });
        cy.createBlog({ title: 'blog_3', author: 'Victor', url: 'vic.com' });

        cy.contains('blog_2')
          .contains('view')
          .click();
        cy.contains('blog_2')
          .contains('remove')
          .click();

        cy.get('html')
          .should('not.contain', 'blog_2')
          .should('not.contain', 'Valdimir');
      });

      it('new blogs are sorted by likes', function deleteBlog() {
        cy.createBlog({ title: 'blog_1', author: 'Navalny', url: 'russia.com' });
        cy.createBlog({ title: 'blog_2', author: 'Valdimir', url: 'vald.com' });
        cy.createBlog({ title: 'blog_3', author: 'Victor', url: 'vic.com' });

        cy.contains('another blog cypress').contains('view').click();
        cy.contains('blog_1').contains('view').click();
        cy.contains('blog_2').contains('view').click();
        cy.contains('blog_3').contains('view').click();

        cy.contains('another blog cypress').contains('like').click();
        cy.contains('blog_2').contains('like').click().click();
        cy.contains('blog_3').contains('like').click().click()
          .click()
          .click();

        cy.get('[id$=visible-blog]')
          .eq(0)
          .should('contain.text', 'blog_3');
        cy.get('[id$=visible-blog]')
          .eq(1)
          .should('contain.text', 'blog_2');
        cy.get('[id$=visible-blog]')
          .eq(2)
          .should('contain.text', 'another blog');
        cy.get('[id$=visible-blog]')
          .eq(3)
          .should('contain.text', 'blog_1');
      });
    });
  });
});
