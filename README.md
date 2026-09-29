# 🛒 Nexora.

E-commerce Full Stack desarrollado con **React, TypeScript, Node.js, Express y MongoDB**.

La aplicación permite explorar productos, crear cuentas, iniciar sesión, administrar un carrito de compras y gestionar productos mediante un panel de administración.

## ✨ Funcionalidades

### 👤 Autenticación

* Registro de usuarios.
* Inicio de sesión.
* Cierre de sesión.
* Autenticación mediante JWT.
* Cookies HTTP.
* Rutas protegidas.
* Roles de usuario y administrador.

### 🛍️ Productos

* Listado de productos.
* Vista individual de cada producto.
* Búsqueda de productos.
* Paginación.
* Categorías.
* Control de stock.
* Productos destacados.

### 🛒 Carrito

* Agregar productos al carrito.
* Actualizar cantidades.
* Eliminar productos.
* Vaciar carrito.
* Control de stock disponible.
* Resumen del carrito.

### 🔐 Panel de administración

Los administradores pueden:

* Crear productos.
* Editar productos.
* Eliminar productos.
* Administrar stock.
* Subir imágenes de productos.

### ☁️ Imágenes

Las imágenes de los productos se almacenan mediante **Cloudinary**.

### 🎨 Interfaz

* Diseño responsive.
* Tailwind CSS.
* React Router DOM.
* React Toastify.
* Estados de carga.
* Página de error personalizada.
* Diseño adaptado a dispositivos móviles.

---

## 🛠️ Tecnologías

### Frontend

* React
* **TypeScript**
* Vite
* React Router DOM
* Tailwind CSS
* Axios
* React Hook Form
* React Toastify
* React Helmet Async
* Cloudinary

### Backend

* Node.js
* **TypeScript**
* Express
* MongoDB
* Mongoose
* JWT
* bcryptjs
* Zod
* Cookie Parser
* CORS
* Morgan
* dotenv

---

## 📁 Estructura del proyecto

```text
Nexora/
│
├── client/
│   ├── public/
│   └── src/
│       ├── api/
│       ├── assets/
│       ├── components/
│       ├── context/
│       ├── pages/
│       ├── services/
│       ├── types/
│       ├── App.tsx
│       └── main.tsx
│
├── server/
│   └── src/
│       ├── controllers/
│       ├── libs/
│       ├── middlewares/
│       ├── models/
│       ├── routes/
│       ├── schemas/
│       ├── types/
│       ├── utils/
│       ├── app.ts
│       ├── db.ts
│       └── index.ts
│
├── .gitignore
└── README.md
```

---

## ⚙️ Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/TU-USUARIO/TU-REPOSITORIO.git
```

Entrar al proyecto:

```bash
cd Nexora
```

### 2. Instalar dependencias del backend

```bash
cd server
npm install
```

### 3. Configurar las variables de entorno del backend

Crear un archivo `.env` dentro de `server/` tomando como referencia:

```text
server/.env.example
```

Ejemplo:

```env
PORT=3000
MONGODB_URI=tu_mongodb_connection_string
JWT_SECRET=tu_jwt_secret
```

No subir el archivo `.env` a GitHub.

### 4. Iniciar el backend

Desde la carpeta `server/`:

```bash
npm run dev
```

El servidor estará disponible en:

```text
http://localhost:3000
```

### 5. Instalar dependencias del frontend

Abrir una nueva terminal y ejecutar:

```bash
cd client
npm install
```

### 6. Configurar las variables de entorno del frontend

Crear un archivo `.env` dentro de `client/` tomando como referencia:

```text
client/.env.example
```

Ejemplo:

```env
VITE_API_URL=http://localhost:3000/api

VITE_CLOUDINARY_UPLOAD_PRESET=tu_upload_preset
VITE_CLOUDINARY_CLOUD_NAME=tu_cloud_name
```

### 7. Iniciar el frontend

Desde la carpeta `client/`:

```bash
npm run dev
```

La aplicación estará disponible en:

```text
http://localhost:5173
```

---

## 🚀 Ejecución

Para ejecutar el proyecto en desarrollo se necesitan dos terminales.

### Backend

```bash
cd server
npm run dev
```

### Frontend

```bash
cd client
npm run dev
```

---

## 🔑 Roles de usuario

### Usuario

Puede:

* Navegar por los productos.
* Ver los detalles de los productos.
* Agregar productos al carrito.
* Modificar cantidades.
* Eliminar productos del carrito.
* Vaciar el carrito.

### Administrador

Además de las funciones anteriores, puede:

* Acceder al panel de administración.
* Crear productos.
* Editar productos.
* Eliminar productos.
* Administrar el stock.
* Subir imágenes de productos.

---

## 🔒 Seguridad

El proyecto implementa:

* JWT para autenticación.
* Cookies HTTP.
* Contraseñas protegidas con bcryptjs.
* Rutas prote
