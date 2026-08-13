# Nexora

Aplicación de comercio electrónico full-stack desarrollada con el stack MERN.

Nexora es una plataforma de e-commerce donde los usuarios pueden explorar productos, registrarse, iniciar sesión, consultar detalles de productos y administrar su carrito de compras. Los administradores cuentan con un panel protegido para gestionar el catálogo de productos.

---

## ✨ Características

### 🛍️ Tienda

- Visualización de todos los productos disponibles
- Página de detalle de cada producto
- Productos destacados en la página de inicio
- Búsqueda de productos
- Paginación
- Categorías de productos
- Información de stock
- Diseño responsive
- Tarjetas de productos

### 🔐 Autenticación

- Registro de usuarios
- Inicio de sesión
- Cierre de sesión
- Autenticación mediante JWT
- Cookies HTTP-only
- Rutas protegidas
- Persistencia de sesión
- Manejo de roles de usuario

### 🛒 Carrito de compras

- Agregar productos al carrito
- Modificar cantidades
- Eliminar productos
- Vaciar el carrito
- Validación del stock disponible
- Carrito asociado al usuario autenticado

### 👑 Panel de administración

Los usuarios con rol de administrador pueden:

- Acceder a un panel protegido
- Crear productos
- Editar productos
- Eliminar productos
- Administrar precios
- Administrar stock
- Administrar categorías
- Subir imágenes de productos

### ☁️ Cloudinary

- Integración con Cloudinary
- Subida de imágenes
- Almacenamiento de imágenes de productos
- URLs de imágenes almacenadas en MongoDB

### 🎨 Interfaz

- Diseño moderno y responsive
- Interfaz con modo oscuro
- Tailwind CSS
- Estados de carga
- Estados vacíos
- Mensajes de éxito y error
- Notificaciones Toast
- Manejo de errores
- Navegación responsive

---

## 🛠️ Tecnologías utilizadas

### Frontend

- React
- Vite
- React Router DOM
- Tailwind CSS
- Axios
- React Hook Form
- React Toastify
- React Helmet Async

### Backend

- Node.js
- Express
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Zod
- Cookie Parser
- CORS
- Morgan
- dotenv

### Servicios

- MongoDB Atlas
- Cloudinary

---

## 📁 Estructura del proyecto

```text
nexora/
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   │   ├── auth/
│   │   │   ├── cart/
│   │   │   └── products/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── .env.example
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── schemas/
│   │   ├── libs/
│   │   ├── utils/
│   │   ├── app.js
│   │   ├── db.js
│   │   └── index.js
│   │
│   ├── .env.example
│   └── package.json
│
├── .gitignore
└── README.md
