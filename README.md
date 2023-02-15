# **👑 Kings League**

Proyecto de uso didactivo siguiendo la iniciativa de **[Midudev](https://twitter.com/midudev)** en su canal de Twich de **[Midudev](https://www.twitch.tv/midudev)**

Puedes seguir a **midudev** en **[Twitter](https://twitter.com/midudev)** También puedes ver sus directos en **[Twitch](https://www.twitch.tv/midudev)** *(L-J a las 20h horarios habituales, pueden cambiar)* o en su canal de **[YouTube](https://www.youtube.com/c/midudev)**
Además te puedes unir a su comunidad en **[Discord](https://t.co/XruHkD62j3).**

## **🗼Lighthouse**

Este proyecto tiene como objetivo crear una API y página web de la Kings League con fines educativos.

## **⚡️ Tecnologías**

Tecnologías usadas
Para recuperar los datos de la API, usamos Web Scraping, Node.js, Hono y el servicio de hosting de APIs Cloudflare Workers para la construcción y el despliegue.

La página web está desarrollada con el framework Astro y utilizamos el framework CSS Tailwind para estilizar la interfaz de usuario. Además, hemos utilizado la librería Cherrio para realizar Web Scraping y obtener datos de la Kings League Infojobs.

Para probar y validar el funcionamiento de la aplicación, hemos utilizado la librería de pruebas Vitest.

Si quieres ayudarnos, por favor toma un momento para leer el archivo CONTRIBUTING.md. Allí encontrarás información útil sobre cómo contribuír de manera efectiva y cómo seguir nuestras guías de estilo. ¡Esperamos que disfrutes colaborando con nosotros!

- 📦 Node
- 📜 Cheerio for scraping
- ☁︎ Cloudflare Workers
- 🔥 Hono
- 🐱 GitHub actions Cronjob
- 🚀 Astro

# **🚀 Deploy**
## **Deploy dev**
```js
pnpm run dev:api
```

## **Deploy publish**
```js
pnpm run publish:api
```

# **🧪 Test**
```js
pnpm run vitest
```

# **📃 API**

Dirección: https://kingsleague.jonanv.workers.dev/

Los endpoints disponibles son:

- GET `/leaderboard`: Devuelve la clasificación de la Kings League.
- GET `/leaderboard/:teamId`: Devuelve la información de un equipo de leaderboard de la Kings League.
- GET `/teams`: Devuelve todos los equipos de la Kings League.
- GET `/teams/:id`: Devuelve un equipo de la Kings League.
- GET `/teams/:id/players-twelve`: Devuelve un jugador 12 de un equipo de la Kings League.
- GET `/mvp`: Devuelve los MVPs de la Kings League.
- GET `/presidents`: Devuelve todos los presidentes de la Kings League.
- GET `/presidents/:id`: Devuelve un presidente de un equipo de la Kings League.
- GET `/coaches`: Devuelve todos los entrenadores de la Kings League.
- GET `/coaches/:teamId`: Devuelve el entrenador de un equipo de la Kings League.
- GET `/top-scorers`: Devuelve los goleadores más destacados de la Kings League.
- GET `/top-scorers/:rank`: Devuelve el goleador más destacado de acuerdo a su posición en el ranking de la Kings League.
- GET `/top-assists`: Devuelve los asistentes más destacados de la Kings League.
- GET `/top-assists/:rank`: Devuelve el asistente más destacado de acuerdo a su posición en el ranking de la Kings League.
- GET `/schedule`: Devuelve el calendario de partidos de la Kings League y el resultado de los partidos jugados.
- GET `/players-twelve`: Devuelve los jugadores 12 de la Kings League.
