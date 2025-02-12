# 🐉 Dragon Ball App 🚀🔥  

### 📌 Explora a todos los personajes de Dragon Ball y guarda tus favoritos en tu cuenta.  

---

## ⭐ **Características Principales**  

✅ **Lista de Personajes** – Obtén información detallada de todos los personajes de Dragon Ball.  
✅ **Favoritos** – Guarda tus personajes favoritos y accede a ellos en cualquier momento.  
✅ **Búsqueda en Tiempo Real** – Encuentra personajes escribiendo su nombre.  
✅ **Detalles Completos** – Cada personaje muestra:
   - Imagen  
   - Raza  
   - Género  
   - Nivel de Ki  
   - Transformaciones  
   - Afiliación  
   - Planeta de origen  
✅ **Autenticación Segura** – Regístrate e inicia sesión para guardar tus favoritos.  
✅ **Interfaz Moderna** – Diseño atractivo con efecto *glassmorphism*.  

---

## 🛠 **Tecnologías Utilizadas**  

### 🖥️ **Frontend**  
- ⚛️ React.js con Redux para manejo de estado  
- 💅 Bootstrap para una UI moderna  
- 🔍 React Router para navegación  

### 🖥️ **Backend**  
- 🐍 Django con Django REST Framework  
- 🔐 Django JWT para autenticación segura  
- 🗄️ Base de datos PostgreSQL  

### 🌍 **API Externa**  
- 🔥 **[Dragon Ball API](https://dragonball-api.com/api-docs#/)**
- Se consume para obtener los personajes, sus transformaciones y planetas.  

---

## 🔧 **Cómo Instalar y Ejecutar el Proyecto**  

### 🚀 **1️⃣ Clonar el Repositorio**  
```sh
git clone https://github.com/tu-usuario/dragonball-app.git
cd dragonball-app

🖥️ 2️⃣ Configurar el Backend (Django)
sh
Copy
Edit
cd backend
python -m venv venv
source venv/bin/activate  # En Mac/Linux
venv\Scripts\activate  # En Windows
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
✅ Servidor corriendo en: http://127.0.0.1:8000/

💻 3️⃣ Configurar el Frontend (React)
sh
Copy
Edit
cd frontend
npm install
npm start
✅ La aplicación se ejecutará en: http://localhost:3000/
```
📚 Estructura del Proyecto
graphql
Copy
Edit
📦 dragonball-app  
 ┣ 📂 backend
 ┃ ┣ 📂 api
 ┃ ┃ ┣ 📜 models.py  # Modelos de Django
 ┃ ┃ ┣ 📜 views.py   # Vistas del API REST
 ┃ ┃ ┣ 📜 urls.py    # Endpoints
 ┃ ┣ 📜 settings.py  # Configuración de Django
 ┃ ┗ 📜 manage.py
 ┣ 📂 frontend
 ┃ ┣ 📂 src
 ┃ ┃ ┣ 📂 components
 ┃ ┃ ┣ 📂 pages
 ┃ ┃ ┣ 📂 redux
 ┃ ┃ ┣ 📜 App.jsx
 ┃ ┃ ┣ 📜 index.js
 ┃ ┗ 📜 package.json
 ┣ 📜 README.md
🐛 Errores Comunes y Soluciones
🚨 Error: No carga personajes
✔️ Verifica que el backend está corriendo en http://127.0.0.1:8000/.

🔥 Error: No se guardan los favoritos
✔️ Asegúrate de haber iniciado sesión antes de marcar favoritos.

⚠️ Error: JWT Expirado
✔️ Usa refresh_token para obtener un nuevo token de acceso.
