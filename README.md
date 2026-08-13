# Cliente Web - Wild Rider

Sitio web multiidioma y plataforma de cotización/reserva para **Wild Rider** (servicio de alquiler de vehículos 4x4 y organizador de viajes en Costa Rica). Construido sobre **Gatsby**, **Hygraph (GraphCMS)** y **Tailwind CSS**.

---

## 🏗️ Arquitectura del Proyecto

El proyecto sigue un enfoque JAMstack de alto rendimiento:

- **Generador de Sitio Estático (SSG)**: Gatsby compila cada tipo de contenido de Hygraph a una plantilla en `src/templates/`, orquestado por `gatsby-node.js` a partir de `src/config/routes.js` (`CONTENT_ROUTES`).
- **Headless CMS**: El contenido, vehículos y textos dinámicos son gestionados en **Hygraph (GraphCMS)** y consultados mediante GraphQL.
- **Consultas Dinámicas**: **Apollo Client** (`gatsby-browser.js`) interactúa con las APIs en tiempo de ejecución. Su `InMemoryCache` usa `typePolicies` con clave por idioma (`localizedTypenames` / `localizedKeyFields`) para que Hygraph, que reutiliza el mismo `id` entre localizaciones de una misma entrada, no mezcle contenido de distintos idiomas en caché.
- **Capa de datos reutilizable**: el hook `useLocalizedQuery` (`src/hooks/`) centraliza el patrón `useQuery` + `locale: [langKey]` + estados de carga/error (`src/components/ui/QueryState.jsx`) que antes se repetía en cada template.
- **Internacionalización (i18n)**: enrutamiento localizado vía `gatsby-plugin-i18n` y helpers propios en `src/lib/i18n.js` / `src/config/languages.js` / `src/config/locales.js`, con soporte para Inglés (`en`, sin prefijo), Español (`es`), Alemán (`de`), Francés (`fr`) y otros (`other`).

---

## 📁 Estructura del Proyecto

A continuación se detalla la organización de los directorios clave:

```text
├── .vscode/                 # Configuración del entorno en VSCode
├── public/                  # Directorio de salida compilado (generado por Gatsby)
├── static/                  # Recursos estáticos servidos directamente
├── src/                     # Código fuente de la aplicación
│   ├── components/          # Componentes de la interfaz (header, footer, carrusel de reseñas, etc.)
│   │   ├── forms/           # Formularios de contacto/cotización y sus campos
│   │   ├── pages/           # Wrappers de página compartidos (ToggleContentPage.jsx)
│   │   └── ui/              # Piezas de UI reutilizables (ContentToggle, AddressBlock, QueryState, ...)
│   ├── config/              # Rutas por content type, idiomas y locales (config estática)
│   ├── context/             # Context API (datos de sitio compartidos entre páginas)
│   ├── gql/                 # Consultas y fragmentos de GraphQL para el CMS
│   ├── hooks/               # Hooks compartidos (useLocalizedQuery, useEmailSuggestion, useDocumentSeo, ...)
│   ├── images/              # Recursos visuales locales optimizados
│   ├── lib/                 # Helpers puros (i18n, armado de rutas, lógica de formularios)
│   ├── pages/               # Vistas directas (solo 404.jsx; el resto nace de gatsby-node.js)
│   ├── styles/              # Archivos CSS y configuración de estilos globales
│   ├── templates/           # Plantillas dinámicas utilizadas en la generación de rutas
│   └── utils/               # Funciones sueltas de utilidad global
├── Dockerfile               # Configuración del contenedor de desarrollo
├── docker-compose.yml       # Orquestación de servicios en Docker
├── gatsby-config.js         # Configuración centralizada de Gatsby y sus plugins
├── gatsby-node.js           # Orquestación de rutas dinámicas a partir del CMS
├── gatsby-browser.js        # Cliente Apollo, typePolicies por idioma, wrapPageElement/wrapRootElement
├── gatsby-ssr.js            # Personalización de la cabecera e inyección en SSR
├── package.json             # Manifiesto del proyecto y scripts
├── .eslintrc.js             # Configuración de ESLint
├── jsconfig.json            # Alias de rutas para el editor
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
| `npm run lint` | Corre ESLint sobre `src/` y los archivos `gatsby-*.js`. |

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
- **`gatsby-plugin-google-gtag`**: Integración con Google Tag Manager / Analytics.
- **`gatsby-plugin-gdpr-cookies`**: Control y consentimiento de cookies.
- **`react-slick` & `slick-carousel`**: Carrusel de reseñas (Google/TripAdvisor/Facebook).
- **`react-international-phone`, `react-flatpickr`, `react-google-recaptcha`**: Campos de los formularios de contacto/cotización.
- **`tailwindcss` & `postcss`**: Estilizado utility-first con Tailwind CSS v4.

### Calidad de Código
- **`eslint`, `eslint-plugin-react`, `eslint-plugin-react-hooks`**: Linting (`npm run lint`).
- **`prettier`**: Formateo automático (`npm run format`).