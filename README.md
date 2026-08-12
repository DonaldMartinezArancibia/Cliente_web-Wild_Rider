# Cliente Web - Wild Rider

Sitio web multiidioma y plataforma de cotización/reserva para **Wild Rider** (servicio de alquiler de vehículos 4x4 y organizador de viajes en Costa Rica). Construido sobre **Gatsby**, **Hygraph (GraphCMS)** y **Tailwind CSS**.

---

## 🏗️ Arquitectura del Proyecto

El proyecto sigue un enfoque JAMstack de alto rendimiento con renderizado híbrido:

- **Generador de Sitio Estático (SSG)**: Gatsby compila las páginas principales y la estructura del sitio a HTML estático en tiempo de compilación.
- **Dynamic & Server-Side Rendering**: Ciertas vistas específicas emplean Deferred Static Generation (DSG) o Server-Side Rendering (SSR) a través de [src/pages/ssr.jsx](./src/pages/ssr.jsx).
- **Headless CMS**: El contenido, vehículos y textos dinámicos son gestionados en **Hygraph (GraphCMS)** y consultados mediante GraphQL.
- **Consultas Dinámicas**: **Apollo Client** interactúa con las APIs en tiempo de ejecución (ej. formularios de cotización/contacto).
- **Internacionalización (i18n)**: Enrutamiento localizado gestionado por `gatsby-plugin-i18n` para dar soporte a: Inglés (`en`, idioma por defecto sin prefijo), Español (`es`), Alemán (`de`), Francés (`fr`) y otros (`other`).

---

## 📁 Estructura del Proyecto

A continuación se detalla la organización de los directorios clave:

```text
├── .vscode/                 # Configuración del entorno en VSCode
├── public/                  # Directorio de salida compilado (generado por Gatsby)
├── static/                  # Recursos estáticos servidos directamente
├── src/                     # Código fuente de la aplicación
│   ├── components/          # Componentes de la interfaz de usuario (formularios, modales, etc.)
│   ├── context/             # Proveedores de estado global / Context API
│   ├── gql/                 # Consultas y fragmentos de GraphQL para el CMS
│   ├── images/              # Recursos visuales locales optimizados
│   ├── pages/               # Vistas directas (páginas independientes, 404 y SSR)
│   ├── styles/              # Archivos CSS y configuración de estilos globales
│   ├── templates/           # Plantillas dinámicas utilizadas en la generación de rutas
│   └── utils/               # Funciones y helpers de utilidad global
├── Dockerfile               # Configuración del contenedor de desarrollo
├── docker-compose.yml       # Orquestación de servicios en Docker
├── gatsby-config.js         # Configuración centralizada de Gatsby y sus plugins
├── gatsby-node.js           # Orquestación de rutas dinámicas a partir del CMS
├── gatsby-browser.js        # Integraciones con APIs del navegador
├── gatsby-ssr.js            # Personalización de la cabecera e inyección en SSR
├── package.json             # Manifiesto del proyecto y scripts
└── tailwind.config.js       # Configuración de Tailwind CSS
```

---

## 🛠️ Requisitos y Configuración de Entorno

### Requisitos Previos
* **Node.js**: `>=24.0.0` (definido en `.nvmrc` y `engines`)
* **NPM**: versión correspondiente a Node.js

### Variables de Entorno
Crea un archivo `.env` en la raíz del proyecto con las siguientes claves:

```env
GATSBY_GRAPHCMS_ENDPOINT= # Endpoint de Hygraph
GATSBY_GRAPHCMS_TOKEN= # Token de acceso a la API
```

---

## 🚀 Comandos de Desarrollo

| Comando | Descripción |
| :--- | :--- |
| `npm install --legacy-peer-deps` | Instala las dependencias del proyecto. |
| `npm run develop` o `npm start` | Inicia el servidor de desarrollo en `http://localhost:8000`. |
| `npm run build` | Compila el sitio optimizado para producción en `/public`. |
| `npm run serve` | Sirve localmente la versión compilada de producción en `http://localhost:9000`. |
| `npm run clean` | Limpia la caché interna y el directorio de build de Gatsby. |
| `npm run format` | Da formato a todo el código utilizando Prettier. |

### Ejecución con Docker

También puedes levantar el entorno de desarrollo usando **Docker Compose**:

```bash
# Construir y levantar el contenedor
docker-compose up --build
```
La aplicación estará disponible en `http://localhost:8000`.

---

## 📦 Dependencias Clave

### Núcleo y Datos
- **`gatsby`**: Framework para React con soporte SSG/SSR.
- **`react` & `react-dom`**: Motor de la interfaz (`^19.2.7`).
- **`@apollo/client` & `graphql`**: Cliente GraphQL para peticiones en runtime.
- **`gatsby-source-graphcms`**: Origen de datos para la ingesta de Hygraph en build-time.

### Experiencia de Usuario y Plugins
- **`gatsby-plugin-i18n`**: Enrutamiento localizado para multiidioma.
- **`gatsby-plugin-google-gtag`**: Integración con Google Analytics.
- **`gatsby-plugin-gdpr-cookies`**: Control y consentimiento de cookies.
- **`gatsby-source-google-places`**: Sincronización de opiniones y ubicaciones de Google.
- **`tailwindcss` & `postcss`**: Estilizado utility-first con Tailwind CSS.