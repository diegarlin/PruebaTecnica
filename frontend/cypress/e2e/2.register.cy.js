describe('Página de Registro', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/register');
  });
  
  it('debería mostrar el formulario de registro', () => {
    cy.get('h1').contains('Registro').should('be.visible');
    cy.get('input[formControlName="username"]').should('be.visible');
    cy.get('input[formControlName="password"]').should('be.visible');
    cy.get('input[formControlName="email"]').should('be.visible');
    cy.get('button[type="submit"]').contains('Register').should('be.visible');
  });
  
  it('debería mostrar errores de validación', () => {
    cy.get('button[type="submit"]').click();
    cy.get('mat-error').contains('Username is required').should('be.visible');
    cy.get('mat-error').contains('Password is required').should('be.visible');
    cy.get('mat-error').contains('Email is required').should('be.visible');
  });
  
  it('debería registrarse exitosamente', () => {
    cy.get('input[formControlName="username"]').type('newuser');
    cy.get('input[formControlName="password"]').type('password123');
    cy.get('input[formControlName="email"]').type('newuser@example.com');
    cy.get('button[type="submit"]').click();
  
    cy.url().should('include', '/login');
  });
  });