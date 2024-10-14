/// <reference types="cypress" />

describe('Página principal', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200');
  });

  it('debería mostrar los enlaces de navegación correctos cuando no está autenticado', () => {
    cy.get('a').contains('Registro').should('be.visible');
    cy.get('a').contains('Login').should('be.visible');
    cy.get('a').contains('Logout').should('not.exist');
  });

  it('debería mostrar los enlaces de navegación correctos cuando está autenticado', () => {
    cy.window().then((win) => {
      win.localStorage.setItem('token', 'fake-jwt-token');
    });
    cy.reload();

    cy.get('a').contains('Registro').should('not.exist');
    cy.get('a').contains('Login').should('not.exist');
    cy.get('a').contains('Logout').should('be.visible');
  });

  it('debería cerrar sesión correctamente', () => {
    cy.window().then((win) => {
      win.localStorage.setItem('token', 'fake-jwt-token');
    });
    cy.reload();

    cy.get('a').contains('Logout').click();
    cy.get('a').contains('Registro').should('be.visible');
    cy.get('a').contains('Login').should('be.visible');
    cy.get('a').contains('Logout').should('not.exist');
  });
});