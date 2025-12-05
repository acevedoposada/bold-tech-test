# 🧪 Prueba Técnica – Bold.co

![Bold Logo](./public/bold.svg)

## 🚀 Descripción General

Esta prueba técnica fue desarrollada para la compañía **Bold.co** aplicando al cargo de **Frontend Engineer**. El objetivo principal fue demostrar experiencia en construcción de interfaces modernas utilizando **Next.js**, buenas prácticas de desarrollo, performance rendering y animaciones fluidas que aportan dinamismo a la experiencia de usuario.

Incluye:

* Componentes reutilizables y accesibles
* Manejo eficiente del estado local
* **Animaciones fluidas** con un enfoque en **mejorar el rendimiento visual**
* Diseño con CSS optimizado
* Pruebas unitarias con Jest
* Eslint + Prettier para mantener calidad de código

---

## 🎨 ¿Por qué usar CSS puro?

En este proyecto utilizo **Tailwind CSS v4**, el cual **no es 100% compatible con preprocesadores** como SASS/SCSS.

Sin embargo, para mantener la granularidad y control visual en componentes particulares, opté también por **CSS puro** ya que:

✔️ Permite aislar estilos complejos sin afectar la generación automática de Tailwind
✔️ Asegura compatibilidad total con el entorno de build
✔️ Facilita la implementación de animaciones personalizadas sin restricciones
✔️ Garantiza mayor estabilidad frente a actualizaciones de Tailwind

El resultado es una **combinación flexible**: diseño rápido con utilidades y estilos refinados con CSS modular.

---

## 💻 Comandos del Proyecto

| Comando                | Descripción                                          |
| ---------------------- | ---------------------------------------------------- |
| `npm run dev`          | Ejecuta el entorno de desarrollo de Next.js          |
| `npm run build`        | Genera el build de producción                        |
| `npm run start`        | Inicia el servidor en producción                     |
| `npm run lint`         | Corre ESLint para validar la calidad del código      |
| `npm run test`         | Ejecuta los tests unitarios con Jest                 |
| `npm run format`       | Formatea el código usando Prettier                   |
| `npm run format:check` | Verifica que el código esté formateado correctamente |

---

## ✨ Enfoque en rendimiento y experiencia

Durante el desarrollo se aplicaron optimizaciones de **renderizado**, minimizando re-renders en componentes que manejan grandes listados e interacciones.

Estas mejoras incluyeron:

* `useMemo` y `useCallback` en puntos críticos
* Lazy loading de recursos
* Animaciones con costos reducidos evitando layout thrashing
* Paginación de contenidos extensos

Todo esto para garantizar una **UI dinámica y rápida** incluso en dispositivos con capacidades limitadas.

---

## 🧠 Stack Técnico

* **Next.js** (App Router)
* **React** + Hooks
* **Tailwind CSS v4** + CSS
* **Jest** para pruebas unitarias
* **ESLint + Prettier** para estilo y calidad de código

