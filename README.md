# Finanzas Personales

**Finanzas Personales** es una aplicación web desarrollada con **Create React App**, **TypeScript** y **Firebase**. Su objetivo es ayudar a los usuarios a registrar, gestionar y visualizar sus ingresos y gastos de forma simple y clara. El proyecto está pensado como una herramienta educativa y práctica para el control de finanzas personales.

## Características

- Registro de ingresos y gastos con detalles como monto, categoría y fecha.
- Visualización de transacciones en una interfaz amigable.
- Integración con Firebase para autenticación y almacenamiento en la nube.
- Arquitectura modular con TypeScript para un código más mantenible y escalable.

## Tecnologías Utilizadas

- [Create React App](https://create-react-app.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Firebase](https://firebase.google.com/) (Authentication, Firestore, Hosting)
- [React](https://reactjs.org/)

## Requisitos Previos

- Node.js v14 o superior
- Cuenta en Firebase con un proyecto configurado

## Instalación y Configuración

1. Clona el repositorio:

   ```bash
   git clone https://github.com/estebangf/finanzas-personales.git
   cd finanzas-personales

2. Instala las dependencias:

    ```bash
    npm install
    Configura Firebase:

3. Crea un nuevo proyecto en Firebase Console.
  - Habilita Firestore y Authentication (por ejemplo, con correo electrónico y contraseña).
  - Copia el archivo .env.example a .env y reemplaza los valores con tu configuración de Firebase.

4. Inicia la aplicación en modo desarrollo:
    ```bash
    npm run dev
La aplicación estará disponible en http://localhost:5173/.

5. Despliegue
Para desplegar la aplicación en Firebase Hosting:

  1. Inicia sesión en Firebase CLI:

      ```bash
      firebase login
  2. Inicializa Firebase en el proyecto (si no se ha hecho previamente):
  
      ```bash
      firebase init
  3. Construye la aplicación para producción:

      ```bash
      npm run build
  4. Despliega a Firebase Hosting:

      ```bash
      firebase deploy
