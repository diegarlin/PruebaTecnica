
# Proyecto Fullstack - Backend en Express y Frontend en Angular

Este proyecto consiste en un backend desarrollado con Express y un frontend con Angular. Sigue las instrucciones a continuación para instalar y ejecutar el proyecto.

## Requisitos previos

1. **Node.js (versión 20.18.0)**: Se recomienda utilizar `nvm` (Node Version Manager) para gestionar diferentes versiones de Node.js. Para instalar `nvm`, sigue las instrucciones de [nvm](https://github.com/coreybutler/nvm-windows).

   Una vez instalado `nvm`, ejecuta el siguiente comando para instalar la versión 20.18.0 de Node.js:

   ```bash
   nvm install 20.18.0
   nvm use 20.18.0
   ```

2. **Angular CLI**: Instalar globalmente Angular CLI con el siguiente comando:

   ```bash
   npm install -g @angular/cli
   ```

## Configuración del Backend

1. **Variables de entorno**: Crea un archivo `.env` dentro de la carpeta `backend/` con la siguiente variable:

   ```
   JWT_TOKEN=tu-cadena-secreta
   ```

2. **Instalación y ejecución del backend**:

   - Abre una terminal, navega a la carpeta `backend/`:

     ```bash
     cd backend
     ```

   - Instala las dependencias del proyecto:

     ```bash
     npm install
     ```

   - Inicia el servidor de desarrollo:

     ```bash
     npm run dev
     ```

   - Para hacer ejecutar las pruebas:

     ```bash
     npm run test
     ```
    
   El backend se iniciará en `http://localhost:3000`.

## Configuración del Frontend

1. **Instalación y ejecución del frontend**:

   - Abre una nueva terminal, navega a la carpeta `frontend/`:

     ```bash
     cd frontend
     ```

   - Instala las dependencias del proyecto:

     ```bash
     npm install
     ```
  - Finalmente, inicia el servidor de desarrollo de Angular:

     ```bash
     ng serve
     ```

   - Si encuentras un error de permisos durante la ejecución del frontend, cierra Visual Studio Code, abre una PowerShell con permisos de administrador y ejecuta el siguiente comando y pulsa `s`:

     ```bash
     Set-ExecutionPolicy RemoteSigned
     ```
    
   El frontend se iniciará en `http://localhost:4200`.

   - Para la ejecucion de pruebas debes tener el backend y frontend ejecutandose y utilizar el siguiente comando en la ruta `/frontend`:

   ```bash
     npm run cypress:open
   ```

   Esto abrirá una consola y pestaña en la cual podrás correr las pruebas que se encuentran en la carpeta `/cypress/e2e`.

## Arquitectura del Proyecto

El proyecto está dividido en dos partes principales, el backend y el frontend.

### Backend

 El backend está construido con **Node.js** y **Express** y tiene las siguientes responsabilidades principales:

  - **Autenticación** y **autorización** de usuarios.
  - Gestión y conexión con la **base de datos**.
  - Exposición de una **API RESTful** para que el frontend pueda consumir los datos.

  **Base de datos**: Utilizamos **SQLite** en el entorno de desarrollo para simplificar la configuración, aunque está diseñado para poder cambiarse fácilmente en producción. La migración a otras bases de datos se puede realizar creando un archivo de configuración adicional en la carpeta `/config`.

#### Tecnologías utilizadas:
- **Express**: Framework minimalista para la creación del servidor.
- **Sequelize**: ORM para la gestión y manipulación de bases de datos relacionales.
- **bcrypt**: Para el **hashing** de contraseñas.
- **jsonwebtoken (JWT)**: Para el manejo de **tokens** en la autenticación de usuarios.
- **Jest** y **Supertest**: Para las pruebas unitarias y de rutas.

### Frontend

 El frontend está construido con **Angular**, el cual ofrece:

- Creación de una **SPA (Single Page Application)**.
- Modularización del código, facilitando el mantenimiento y escalabilidad del proyecto.
- Comunicación eficiente con el backend mediante servicios HTTP.

#### Tecnologías utilizadas:
- **Angular**: Framework frontend basado en componentes.
- **Cypress**: Para la realización de pruebas **End-to-End (e2e)**.

## Decisiones de Diseño

### 1. **Uso de SQLite en Desarrollo**
   - Se eligió **SQLite** como base de datos por su simplicidad en la configuración y manejo durante el desarrollo, pero el diseño está pensado para que en producción se pueda migrar fácilmente a una base de datos más robusta como **PostgreSQL** o **MySQL**.
  
### 2. **Sequelize como ORM**
   - La elección de **Sequelize** se basa en su capacidad de abstraer las interacciones con la base de datos, simplificando el manejo de modelos y queries, y su soporte para múltiples bases de datos.

### 4. **bcrypt para Hashing de Contraseñas**
   - **bcrypt** es una librería robusta para la encriptación de contraseñas además de la sencillez de implementación gracias al conocimiento del desarrollador por su uso previo en otros proyectos.

### 5. **Jest y Supertest para Testing**
   - **Jest** y **Supertest** se eligieron porque facilitan la creación de tests de endpoints (integración), simulando llamadas HTTP a la API, así probando tanto las rutas, controllers y middlewares en un mismo test.
   
### 6. **Cypress para Pruebas End-to-End**
   - Se decidió usar **Cypress** para pruebas e2e debido a su sencillez y rendimiento. En lugar de usar **Protractor**, que dejó de recibir actualizaciones en 2020, **Cypress** es más moderno y ofrece una mejor experiencia de pruebas end-to-end para aplicaciones Angular.
