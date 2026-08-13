# 🛒 Products - Full Stack E-Commerce

Aplicación web Full Stack de comercio electrónico desarrollada con **MERN Stack**.

El proyecto permite gestionar usuarios, productos y carritos de compra mediante una arquitectura separada de **frontend y backend**, utilizando una API REST para la comunicación entre ambas partes.

Cuenta con autenticación mediante JWT y cookies, autorización por roles, validación de datos, gestión de productos, carrito de compras y subida de imágenes mediante Cloudinary.

---

## 📌 Características principales

- Registro de usuarios
- Inicio y cierre de sesión
- Autenticación mediante JWT
- Cookies HTTP para mantener la sesión
- Roles de usuario y administrador
- Rutas protegidas
- Panel de administración
- CRUD completo de productos
- Búsqueda de productos
- Paginación
- Detalle individual de productos
- Carrito de compras
- Actualización de cantidades
- Eliminación de productos del carrito
- Vaciar carrito
- Validación de datos con Zod
- Hash de contraseñas con bcrypt
- Subida de imágenes mediante Cloudinary
- Notificaciones con React Toastify
- Diseño responsive
- API REST
- MongoDB como base de datos

---

# 🛠️ Tecnologías utilizadas

## Frontend

- React
- Vite
- React Router DOM
- Tailwind CSS
- Axios
- React Hook Form
- React Toastify
- React Helmet Async
- JavaScript

## Backend

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

## Servicios

- MongoDB Atlas
- Cloudinary
- Git
- GitHub

---

# 📂 Estructura del proyecto

```text
products/
│
├── client/
│   │
│   ├── public/
│   │   ├── favicon.svg
│   │   └── icons.svg
│   │
│   ├── src/
│   │   │
│   │   ├── api/
│   │   │   ├── auth.js
│   │   │   ├── axios.js
│   │   │   ├── cart.js
│   │   │   └── products.js
│   │   │
│   │   ├── assets/
│   │   │   ├── hero.png
│   │   │   ├── react.svg
│   │   │   └── vite.svg
│   │   │
│   │   ├── components/
│   │   │   ├── AdminProductCard.jsx
│   │   │   ├── CartSummary.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Pagination.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   ├── ProductCartCard.jsx
│   │   │   ├── SearchProduct.jsx
│   │   │   └── Spinner.jsx
│   │   │
│   │   ├── context/
│   │   │   ├── auth/
│   │   │   │   ├── AuthContext.js
│   │   │   │   └── AuthProvider.jsx
│   │   │   │
│   │   │   ├── cart/
│   │   │   │   ├── CartContext.js
│   │   │   │   └── CartProvider.jsx
│   │   │   │
│   │   │   └── products/
│   │   │       ├── ProductsContext.js
│   │   │       └── ProductsProvider.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── AdminProductsPage.jsx
│   │   │   ├── CartPage.jsx
│   │   │   ├── ErrorPage.jsx
│   │   │   ├── HomePage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── ProductFormPage.jsx
│   │   │   ├── ProductPage.jsx
│   │   │   ├── ProductsPage.jsx
│   │   │   └── RegisterPage.jsx
│   │   │
│   │   ├── services/
│   │   │   └── cloudinary.js
│   │   │
│   │   ├── AdminProtectedRoute.jsx
│   │   ├── ProtectedRoute.jsx
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── .env.example
│   ├── .gitignore
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   │
│   ├── src/
│   │   │
│   │   ├── controllers/
│   │   │   ├── auth.controller.js
│   │   │   ├── cart.controller.js
│   │   │   └── product.controller.js
│   │   │
│   │   ├── middlewares/
│   │   │   ├── authRequired.js
│   │   │   ├── isAdmin.js
│   │   │   └── validateSchema.js
│   │   │
│   │   ├── models/
│   │   │   ├── cart.model.js
│   │   │   ├── product.model.js
│   │   │   └── user.model.js
│   │   │
│   │   ├── routes/
│   │   │   ├── auth.routes.js
│   │   │   ├── cart.routes.js
│   │   │   └── product.routes.js
│   │   │
│   │   ├── schemas/
│   │   │   ├── auth.schema.js
│   │   │   ├── cart.schema.js
│   │   │   └── product.schema.js
│   │   │
│   │   ├── libs/
│   │   │   └── jwt.js
│   │   │
│   │   ├── utils/
│   │   │   └── cookieConfig.js
│   │   │
│   │   ├── app.js
│   │   ├── db.js
│   │   └── index.js
│   │
│   ├── .env.example
│   ├── package.json
│   └── package-lock.json
│
├── .gitignore
└── README.md
```

---

# ⚙️ Requisitos

Antes de instalar el proyecto necesitás tener instalado:

- Node.js
- npm
- Git
- MongoDB o una cuenta de MongoDB Atlas
- Una cuenta de Cloudinary

Podés comprobar Node y npm con:

```bash
node -v
npm -v
```

---

# 🚀 Instalación

## 1. Clonar el repositorio

```bash
git clone https://github.com/TU-USUARIO/TU-REPOSITORIO.git
```

Entrar al proyecto:

```bash
cd products
```

---

# 🖥️ Configuración del Backend

Entrar a la carpeta del servidor:

```bash
cd server
```

Instalar las dependencias:

```bash
npm install
```

Crear un archivo:

```text
.env
```

dentro de `server/`.

El proyecto incluye un archivo:

```text
server/.env.example
```

que podés utilizar como referencia.

El archivo `.env` debe contener:

```env
PORT=3000

MONGODB_URI=TU_MONGODB_CONNECTION_STRING

JWT_SECRET=TU_JWT_SECRET
```

### Ejemplo

```env
PORT=3000

MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/products

JWT_SECRET=una_clave_secreta_segura
```

No utilices exactamente esos valores. Reemplazalos por tus propias credenciales.

---

# 🗄️ Configuración de MongoDB

El proyecto utiliza MongoDB mediante Mongoose.

Podés utilizar MongoDB local o MongoDB Atlas.

Si utilizás MongoDB Atlas, obtené tu connection string y agregalo al archivo:

```text
server/.env
```

Por ejemplo:

```env
MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/products
```

---

# ☁️ Configuración de Cloudinary

Las imágenes de los productos se almacenan en Cloudinary.

Necesitás crear una cuenta en Cloudinary y obtener:

- Cloud Name
- Upload Preset

En el frontend:

```text
client/.env
```

agregá:

```env
VITE_CLOUDINARY_UPLOAD_PRESET=my_products
VITE_CLOUDINARY_CLOUD_NAME=TU_CLOUD_NAME
```

Por ejemplo:

```env
VITE_CLOUDINARY_UPLOAD_PRESET=my_products
VITE_CLOUDINARY_CLOUD_NAME=dlzgpc6cg
```

El `VITE_CLOUDINARY_CLOUD_NAME` corresponde al nombre de tu Cloudinary.

---

# 🌐 Configuración del Frontend

Abrir otra terminal.

Desde la raíz del proyecto:

```bash
cd client
```

Instalar las dependencias:

```bash
npm install
```

Crear:

```text
client/.env
```

El proyecto incluye:

```text
client/.env.example
```

como referencia.

El archivo `.env` debe contener:

```env
VITE_API_URL=http://localhost:3000/api

VITE_CLOUDINARY_UPLOAD_PRESET=my_products
VITE_CLOUDINARY_CLOUD_NAME=TU_CLOUD_NAME
```

---

# ▶️ Ejecutar el proyecto

El frontend y el backend deben ejecutarse al mismo tiempo.

---

## Ejecutar Backend

Abrir una terminal:

```bash
cd server
```

Ejecutar:

```bash
npm run dev
```

El servidor estará disponible en:

```text
http://localhost:3000
```

La API estará disponible en:

```text
http://localhost:3000/api
```

---

## Ejecutar Frontend

Abrir otra terminal:

```bash
cd client
```

Ejecutar:

```bash
npm run dev
```

El frontend estará disponible en:

```text
http://localhost:5173
```

---

# 🔗 Comunicación entre Frontend y Backend

Axios utiliza una instancia configurada para comunicarse con la API:

```js
import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export default instance;
```

La variable:

```env
VITE_API_URL=http://localhost:3000/api
```

hace que las peticiones se envíen al backend.

Por ejemplo:

```text
GET /api/products
```

corresponde a:

```text
http://localhost:3000/api/products
```

---

# 🔐 CORS

El backend permite peticiones desde el frontend:

```js
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
```

Esto permite utilizar cookies entre el frontend y el backend.

Axios también está configurado con:

```js
withCredentials: true
```

para enviar las cookies en las peticiones.

---

# 👤 Autenticación

La aplicación utiliza JWT para autenticar a los usuarios.

El flujo es:

```text
Usuario
   ↓
Register / Login
   ↓
Backend
   ↓
Validación
   ↓
bcrypt
   ↓
JWT
   ↓
Cookie
   ↓
Frontend
```

Las contraseñas no se almacenan directamente.

Antes de guardarlas se utiliza `bcryptjs`.

---

# 🔑 Roles

La aplicación cuenta con dos roles:

```text
user
admin
```

## Usuario

Un usuario normal puede:

- Registrarse.
- Iniciar sesión.
- Ver productos.
- Ver detalles.
- Agregar productos al carrito.
- Modificar el carrito.
- Eliminar productos.
- Vaciar el carrito.

## Administrador

Un administrador puede:

- Ver productos.
- Crear productos.
- Editar productos.
- Eliminar productos.
- Acceder al panel administrativo.

---

# 🛡️ Rutas protegidas

El frontend utiliza dos tipos de protección.

## ProtectedRoute

Protege páginas que requieren autenticación.

Por ejemplo:

```text
/cart
```

## AdminProtectedRoute

Protege páginas exclusivas para administradores.

Por ejemplo:

```text
/admin/products
```

En el backend también existen middlewares:

```text
authRequired
isAdmin
```

---

# 📦 Productos

Cada producto contiene:

```text
name
description
price
stock
category
image
user
createdAt
updatedAt
```

Ejemplo:

```json
{
  "name": "Logitech G502 HERO",
  "description": "High-performance gaming mouse",
  "price": 59.99,
  "stock": 40,
  "category": "Gaming",
  "image": "https://example.com/image.jpg"
}
```

---

# 🛒 Carrito

Cada usuario posee su propio carrito.

Las funcionalidades incluyen:

- Agregar productos.
- Actualizar cantidades.
- Eliminar productos.
- Vaciar carrito.
- Comprobar stock disponible.

El carrito se encuentra asociado al usuario autenticado.

---

# 🔌 API REST

## Authentication

### Registrar usuario

```http
POST /api/auth/register
```

### Iniciar sesión

```http
POST /api/auth/login
```

### Cerrar sesión

```http
POST /api/auth/logout
```

### Obtener perfil

```http
GET /api/auth/profile
```

---

# 📦 Products API

### Obtener todos los productos

```http
GET /api/products
```

### Obtener un producto

```http
GET /api/products/:id
```

### Crear producto

```http
POST /api/products
```

Requiere autenticación y rol `admin`.

### Actualizar producto

```http
PUT /api/products/:id
```

Requiere autenticación y rol `admin`.

### Eliminar producto

```http
DELETE /api/products/:id
```

Requiere autenticación y rol `admin`.

---

# 🛒 Cart API

### Obtener carrito

```http
GET /api/cart
```

### Agregar producto

```http
POST /api/cart
```

### Actualizar carrito

```http
PUT /api/cart
```

### Eliminar producto

```http
DELETE /api/cart/:productId
```

### Vaciar carrito

```http
DELETE /api/cart
```

Las operaciones del carrito requieren autenticación.

---

# 🧪 Validación

El backend utiliza **Zod** para validar los datos recibidos.

Los productos validan campos como:

```text
name
description
price
stock
category
image
```

La autenticación también utiliza esquemas de validación para:

```text
username
email
password
```

Los errores de validación son procesados mediante el middleware:

```text
validateSchema
```

---

# 🧩 Arquitectura Backend

El backend está organizado siguiendo una separación de responsabilidades:

```text
Routes
   ↓
Middlewares
   ↓
Controllers
   ↓
Models
   ↓
MongoDB
```

### Routes

Definen los endpoints disponibles.

### Middlewares

Se encargan de:

- Autenticación.
- Autorización.
- Validación.
- CORS.

### Controllers

Contienen la lógica de negocio.

### Models

Definen los esquemas de MongoDB mediante Mongoose.

### Schemas

Contienen las validaciones realizadas con Zod.

---

# ⚛️ Arquitectura Frontend

El frontend está organizado utilizando:

```text
Pages
   ↓
Components
   ↓
Contexts
   ↓
API
   ↓
Backend
```

---

# 🌎 Context API

La aplicación utiliza React Context para manejar estados globales.

## AuthContext

Gestiona:

- Usuario actual.
- Login.
- Logout.
- Estado de autenticación.

## ProductsContext

Gestiona:

- Lista de productos.
- Obtener productos.
- Obtener producto individual.
- Crear productos.
- Editar productos.
- Eliminar productos.
- Estado de carga.

## CartContext

Gestiona:

- Carrito.
- Agregar productos.
- Actualizar cantidades.
- Eliminar productos.
- Vaciar carrito.

---

# 🎨 Interfaz

La interfaz está desarrollada utilizando React y Tailwind CSS.

Incluye:

- Diseño responsive.
- Navbar.
- Footer.
- Product Cards.
- Product Detail.
- Formularios.
- Panel administrativo.
- Carrito.
- Paginación.
- Búsqueda.
- Estados de carga.
- Mensajes de error.
- Notificaciones.

---

# 📱 Responsive Design

La aplicación está adaptada para:

- 📱 Mobile
- 📱 Tablet
- 💻 Desktop

Se utilizan las clases responsive de Tailwind CSS para adaptar el diseño a diferentes tamaños de pantalla.

---

# 🔎 Búsqueda y paginación

La página de productos incluye funcionalidades para:

- Buscar productos.
- Mostrar resultados.
- Paginar productos.
- Navegar entre páginas.

También existe paginación en el panel administrativo.

---

# 🖼️ Imágenes

Las imágenes de los productos se suben a Cloudinary.

El flujo es:

```text
Seleccionar imagen
       ↓
Cloudinary
       ↓
URL de imagen
       ↓
Crear producto
       ↓
MongoDB
```

MongoDB almacena la URL de la imagen y no el archivo directamente.

---

# 🔒 Seguridad

El proyecto implementa diferentes mecanismos de seguridad.

### Contraseñas

Se utiliza:

```text
bcryptjs
```

para realizar el hash de las contraseñas.

### JWT

Se utilizan JSON Web Tokens para la autenticación.

### Cookies

El token se maneja mediante cookies.

### CORS

El backend restringe las solicitudes al frontend configurado.

### Validación

Los datos enviados al servidor son validados utilizando Zod.

### Autorización

Las operaciones administrativas requieren el rol:

```text
admin
```

---

# 📜 Scripts

## Frontend

Instalar dependencias:

```bash
npm install
```

Ejecutar servidor de desarrollo:

```bash
npm run dev
```

Crear build de producción:

```bash
npm run build
```

Previsualizar build:

```bash
npm run preview
```

---

## Backend

Instalar dependencias:

```bash
npm install
```

Ejecutar servidor:

```bash
npm run dev
```

---

# 🌱 Variables de entorno

## Frontend

Archivo:

```text
client/.env
```

Contenido:

```env
VITE_API_URL=http://localhost:3000/api

VITE_CLOUDINARY_UPLOAD_PRESET=my_products
VITE_CLOUDINARY_CLOUD_NAME=TU_CLOUD_NAME
```

---

## Backend

Archivo:

```text
server/.env
```

Contenido:

```env
PORT=3000

MONGODB_URI=TU_MONGODB_CONNECTION_STRING

JWT_SECRET=TU_JWT_SECRET
```

---

# ⚠️ Variables de entorno y Git

Los archivos `.env` no deben subirse a GitHub.

El proyecto utiliza:

```text
.env
.env.*
!.env.example
```

en el `.gitignore`.

Los archivos:

```text
client/.env.example
server/.env.example
```

sí se incluyen en el repositorio para mostrar qué variables necesita configurar otro desarrollador.

---

# 🧑‍💻 Desarrollo local completo

Una vez configuradas las variables de entorno:

### Terminal 1

```bash
cd server
npm install
npm run dev
```

### Terminal 2

```bash
cd client
npm install
npm run dev
```

Después abrir:

```text
http://localhost:5173
```

El frontend se comunicará automáticamente con:

```text
http://localhost:3000/api
```

---

# 🔄 Flujo general de la aplicación

```text
                    ┌──────────────┐
                    │    Usuario   │
                    └──────┬───────┘
                           │
                           ▼
                    ┌──────────────┐
                    │   React      │
                    │  Frontend    │
                    └──────┬───────┘
                           │
                         Axios
                           │
                           ▼
                    ┌──────────────┐
                    │   Express    │
                    │     API      │
                    └──────┬───────┘
                           │
                  ┌────────┴────────┐
                  │                 │
                  ▼                 ▼
             Middlewares       Controllers
                                    │
                                    ▼
                               Mongoose
                                    │
                                    ▼
                             ┌────────────┐
                             │  MongoDB   │
                             └────────────┘
```

---

# 🛍️ Flujo del carrito

```text
Usuario
   ↓
Productos
   ↓
Ver producto
   ↓
Agregar al carrito
   ↓
CartContext
   ↓
API
   ↓
Express
   ↓
MongoDB
```

---

# 🔐 Flujo de autenticación

```text
Register / Login
       ↓
    Express
       ↓
     Zod
       ↓
    bcrypt
       ↓
      JWT
       ↓
     Cookie
       ↓
Authenticated User
```

---

# 👨‍💻 Autor

Proyecto desarrollado como práctica y proyecto de portfolio de desarrollo Full Stack.

El objetivo principal fue aplicar conocimientos de:

- React
- Node.js
- Express
- MongoDB
- Mongoose
- REST API
- JWT
- Cookies
- Autenticación
- Autorización
- React Context
- Tailwind CSS
- Zod
- Cloudinary
- Git
- GitHub

---

# 📄 Licencia

Este proyecto fue desarrollado con fines educativos y de portfolio.
