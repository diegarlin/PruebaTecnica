describe('Página de Inicio de Sesión', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/login');
  });
  
  it('debería mostrar el formulario de inicio de sesión', () => {
    cy.get('h1').contains('Login').should('be.visible');
    cy.get('input[formControlName="username"]').should('be.visible');
    cy.get('input[formControlName="password"]').should('be.visible');
    cy.get('button[type="submit"]').contains('Login').should('be.visible');
  });
  
  it('debería mostrar errores de validación', () => {
    cy.get('button[type="submit"]').click();
    cy.get('mat-error').contains('Username is required').should('be.visible');
    cy.get('mat-error').contains('Password is required').should('be.visible');
  });
  
  it('debería iniciar sesión exitosamente', () => {
    cy.get('input[formControlName="username"]').type('newuser');
    cy.get('input[formControlName="password"]').type('password123');
    cy.get('button[type="submit"]').click();
  
    cy.url().should('include', '/successful');
  });
  });