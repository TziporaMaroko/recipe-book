let counter = Math.floor(Math.random() * 100000); // random to avoid collisions
const email = `test${counter}@example.com`;

describe('Login', () => {
  it('Form button should be disabled if form is not valid', () => {
    cy.visit('/');
    cy.url().should('include', 'auth');

    cy.get('input[name="email"]').type('email@gmail.com');
    cy.get('button[type="submit"]').should('be.disabled');
  });

  it('Should not login and redirect to recipes if user isnt signed up', () => {
    cy.visit('/');
    cy.url().should('include', 'auth');

    cy.contains('Switch too Log in').click();

    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type('123456');
    cy.get('button[type="submit"]').click();

    cy.url().should('not.include', 'recipes');
  });

  it('Should sign up and redirect to recipes if form is valid', () => {
    cy.visit('/');
    cy.url().should('include', 'auth');

    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type('123456');
    cy.get('button[type="submit"]').click();

    cy.url().should('include', 'recipes');
  });

  it('Should log in and redirect to recipes if form is valid', () => {
    cy.visit('/');
    cy.url().should('include', 'auth');

    cy.contains('Switch too Log in').click();

    cy.get('input[name="email"]').type('test1@example.com');
    cy.get('input[name="password"]').type('123456');
    cy.get('button[type="submit"]').click();

    cy.url().should('include', 'recipes');
  });
});
